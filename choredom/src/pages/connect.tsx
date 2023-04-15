import {
	Button,
	Center,
	Flex,
	Input,
	Stack,
	Text,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import {
	collection,
	getDoc,
	query,
	where,
	doc,
	runTransaction,
	getDocs,
} from 'firebase/firestore'
import { firestore } from '../firebase/clientApp'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import RequestTile from '../components/RequestTile'
import { CustomToast } from '../components/toast'


const Connect: React.FC = () => {
	const [search, setSearch] = React.useState<string>('')
	const [loading, setLoading] = React.useState<boolean>(false)
	const [currentUser, setCurrentUser] = React.useState<any>(null)
	const [requests, setRequests] = React.useState<any[]>([])
	const [tileLoading, setTileLoading] = React.useState<boolean>(false)
  const { addToast } = CustomToast()


	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setLoading(true)
		e.preventDefault()
		const user = currentUser
		try {
			if (search === user?.email) {
				throw new Error('You cannot add yourself as a friend!')
			}

			await runTransaction(firestore, async (transaction) => {
				const q = query(
					collection(firestore, 'users'),
					where('email', '==', search)
				)
				let friendDoc
				const querySnapshot = await getDocs(q) //should only be one result
				querySnapshot.forEach((doc) => {
					friendDoc = doc.data() //friendDoc should contain all the information about the friend (uid, email, etc.)
				})

				if (!friendDoc) {
					throw new Error("error finding friend's document")
				}
				const friendDocRef = doc(firestore, 'friends', friendDoc!.uid)
				const friendDocSearch = await transaction.get(friendDocRef)
				const friendDocData = {
					friend_id: user.uid,
					status: 'pending',
					sender_id: user.uid,
				}

				const submitterDocRef = doc(firestore, 'friends', user?.uid)
				const submitterDoc = await transaction.get(submitterDocRef)
				const docData = {
					friend_id: friendDoc!.uid,
					status: 'pending',
					sender_id: user.uid,
				}
				if (!friendDocSearch.exists() || !friendDocSearch.data()?.friends) {
					// If the document doesn't exist, create it.
					transaction.set(friendDocRef, { friends: [friendDocData] })
				} else {
					transaction.update(friendDocRef, {
						friends: [...friendDocSearch.data()?.friends, friendDocData],
					})
				}

				if (!submitterDoc.exists() || !submitterDoc.data()?.friends) {
					// If the document doesn't exist, create it.
					transaction.set(submitterDocRef, { friends: [docData] })
				} else {
					transaction.update(submitterDocRef, {
						friends: [...submitterDoc.data()?.friends, docData],
					})
				}
			})
			addToast({ message: 'Friend request sent!', type: 'success' })
		} catch (error: any) {
			addToast({ message: error.message, type: 'error' })
		}
		setLoading(false)
	}

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	const acceptRequest = async (req: any) => {
		setTileLoading(true)
		await handleRequest(req, 'accepted')
		await getRequests()
		setTileLoading(false)
	}

	const rejectRequest = async (req: any) => {
		setTileLoading(true)
		await handleRequest(req, 'rejected')
		await getRequests()
		setTileLoading(false)
	}

	const handleRequest = async (req: any, rStatus: string) => {
		const user = currentUser
		try {
			await runTransaction(firestore, async (transaction) => {
				const myDocData = {
					friend_id: req.friend_id,
					status: rStatus,
					sender_id: req.sender_id,
				}
				const friendDocData = {
					friend_id: user.uid,
					status: rStatus,
					sender_id: req.sender_id,
				}
				const myDocRef = doc(firestore, 'friends', user.uid)
				const myDocSearch = await transaction.get(myDocRef)

				const submitterDocRef = doc(firestore, 'friends', req.sender_id)
				const submitterDoc = await transaction.get(submitterDocRef)

				if (!myDocSearch.exists() || !myDocSearch.data()?.friends) {
					// If the document doesn't exist, throw an error.
					throw new Error("error finding friend's document")
				}

				// find index in array where friend_id = req.friend_id and sender_id = req.sender_id and status = pending
				// then update that index with the new status
				// if no index is found, throw an error
				const index1 = myDocSearch
					.data()
					?.friends.findIndex(
						(friend: any) =>
							friend.friend_id === req.friend_id &&
							friend.sender_id === req.sender_id &&
							friend.status === req.status
					)
				if (index1 === -1) {
					throw new Error("error finding index of friend's document")
				}
				let arr1 = [...myDocSearch.data()?.friends]
				arr1[index1] = myDocData
				transaction.update(myDocRef, {
					friends: [...arr1],
				})
				if (!submitterDoc.exists() || !submitterDoc.data()?.friends) {
					// If the document doesn't exist, throw an error.
					throw new Error('error finding friend request')
				}
				// find index in array where friend_id = req.friend_id and sender_id = req.sender_id and status = pending
				// then update that index with the new status
				// if no index is found, throw an error
				const index2 = submitterDoc
					.data()
					?.friends.findIndex(
						(friend: any) =>
							user.uid === friend.friend_id &&
							friend.sender_id === req.sender_id &&
							friend.status === req.status
					)
				if (index2 === -1) {
					throw new Error('error finding friend request')
				}
				let arr2 = [...submitterDoc.data()?.friends]
				arr2[index2] = friendDocData
				transaction.update(submitterDocRef, {
					friends: [...arr2],
				})
			})
			addToast({ message: `Friend request ${rStatus}!`, type: 'success' })

		} catch (error: any) {
			addToast({ message: error.message, type: 'error' })
			console.error(error.message);
		}
	}

	const getRequests = async () => {
		setLoading(true)
		const auth = getAuth()
		onAuthStateChanged(auth, async (user) => {
			try {
				if (!user) {
					throw new Error('User error. Try again later.')
				}
				setCurrentUser(user)
				const friendsRef = doc(firestore, 'friends', user.uid)
				const docSnap = await getDoc(friendsRef)
				if (!docSnap.exists()) {
					throw new Error('Possibility of no friends.')
				}
				let requests = docSnap.data()?.friends
				setRequests(requests)
			} catch (error: any) {
				addToast({ message: error.message, type: 'error' })
				console.error('Error detected in getRequests', error)
			}
		})
		setLoading(false)
	}

	const exist_requests = requests?.length > 0

	useEffect(() => {
		async function onInitialization() {
			getRequests()
		}
		onInitialization()
	}, [])

	return (
		<Center h='100vh'>
			<Stack direction={'column'}>
				{/* Only show if the user has requests. */}
				{!loading &&
					exist_requests &&
					requests
						.filter((req) => {
							return req.sender_id != currentUser.uid
						})
						.filter((req) => {
							return req.status === 'pending'
						})
						.map((request, index) => (
							<RequestTile
								key={index}
								request={request}
								rejectRequest={rejectRequest}
								acceptRequest={acceptRequest}
								loading={tileLoading}
							/>
						))}
				<Flex border={'2px'} p='3' borderColor={'GrayText'}>
					<Stack direction='column' align={'center'} alignItems={'center'}>
						<h1>Enhance your Choredom experience by following your friends!</h1>
						<form onSubmit={onSubmit}>
							<Input
								placeholder="Enter friend's email"
								onChange={onChange}
								px='2'
							/>
							<Button
								mt='3'
								w='100%'
								type='submit'
								colorScheme='purple'
								isLoading={loading}
							>
								Search
							</Button>
						</form>
					</Stack>
				</Flex>
			</Stack>
		</Center>
	)
}

export default Connect
