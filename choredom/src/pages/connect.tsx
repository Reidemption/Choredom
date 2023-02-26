import {
	Button,
	Center,
	Flex,
	Input,
	Spacer,
	Stack,
	Text,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import {
	collection,
	getDocs,
	query,
	updateDoc,
	where,
	doc,
	setDoc,
} from 'firebase/firestore'
import { firestore } from '../firebase/clientApp'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const RequestTile = ({ request }: any) => {
	const [loading, setLoading] = React.useState<boolean>(false)
	const [error, setError] = React.useState<string>('')
	const [success, setSuccess] = React.useState<string>('')
	// TODO: Get info about the "request.friend_id" so their collection document can be updated as well.

	const acceptRequest = async () => {
		setLoading(true)
		try {
			const friendRef = doc(firestore, 'friends', request.id)
			await updateDoc(friendRef, {
				status: 'accepted',
			})
			setSuccess('Friend request accepted!')
		} catch (error) {
			setError(error.message)
		}
		setLoading(false)
	}

	const rejectRequest = async () => {
		setLoading(true)
		try {
			const friendRef = doc(firestore, 'friends', request.id)
			await updateDoc(friendRef, {
				status: 'rejected',
			})
			setSuccess('Friend request rejected!')
		} catch (error) {
			setError(error.message)
		}
		setLoading(false)
	}

	return (
		<Flex
			border={'1px'}
			borderColor={'gray.200'}
			borderRadius={'md'}
			p={4}
			mb={4}
			w={'full'}
			alignItems={'center'}
			justifyContent={'space-between'}
		>
			<Stack direction={'column'}>
				<Text fontWeight={'bold'}>{request.friend_id}</Text>
				<Text>{request.status}</Text>
			</Stack>
			<Spacer />
			<Stack direction={'row'}>
				<Button
					colorScheme={'green'}
					isLoading={loading}
					onClick={acceptRequest}
				>
					Accept
				</Button>
				<Button colorScheme={'red'} isLoading={loading} onClick={rejectRequest}>
					Reject
				</Button>
			</Stack>
		</Flex>
	)
}

const Connect: React.FC = () => {
	const [search, setSearch] = React.useState<string>('')
	const [friendError, setFriendError] = React.useState<string>('')
	const [friendSuccess, setFriendSuccess] = React.useState<string>('')
	const [loading, setLoading] = React.useState<boolean>(false)
	const [currentUser, setCurrentUser] = React.useState<any>(null)
	const [requests, setRequests] = React.useState<any[]>([])

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setLoading(true)
		e.preventDefault()
		const user = currentUser
		try {
			if (search === user?.email) {
				throw new Error('You cannot add yourself as a friend!')
			}
			const friendsRef = collection(firestore, 'users')
			const q = query(friendsRef, where('email', '==', search))

			const querySnapshot = await getDocs(q)
			querySnapshot.forEach(async (document) => {
				// friend_id
				if (!user) {
					console.log('Firebase error getting current user.')
					throw new Error('Unable to process request. Please try again later.')
				}
				await setDoc(doc(firestore, 'friends', document.id), {
					friend_id: user.uid,
					status: 'pending',
				})
			})
			setFriendSuccess('Friend request sent!')
		} catch (error) {
			setFriendError(error.message)
		}
		setLoading(false)
	}

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	const getRequests = async () => {
		setLoading(true)
		const auth = getAuth()
		onAuthStateChanged(auth, async (user) => {
			try {
				const friendsRef = collection(firestore, 'friends')
				const q = query(friendsRef, where('friend_id', '==', user?.uid))

				const querySnapshot = await getDocs(q)
				setCurrentUser(user)
				const requests = querySnapshot.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}))
				setRequests(requests)
			} catch (error) {
				console.log(error)
			}
		})
		setLoading(false)
	}

	const exist_requests = requests.length > 0

	useEffect(() => {
		getRequests()
	}, [])

	return (
		<Center h='100vh'>
			<Stack direction={'column'}>
				{/* Only show if the user has requests. */}
				{!loading &&
					exist_requests &&
					requests
						.filter((request) => {
							return request.status === 'pending'
						})
						.map((request) => (
							<RequestTile key={request.idfire} request={request} />
						))}
				<Flex border={'2px'} p='3' borderColor={'GrayText'}>
					<Stack direction='column' align={'center'} alignItems={'center'}>
						<h1>Enhance your Choredom experience by adding your friends!</h1>
						<form onSubmit={onSubmit}>
							<Input
								placeholder="Enter friend's email"
								onChange={onChange}
								px='2'
							/>
							{friendError && (
								<Text textAlign={'center'} color={'red.500'}>
									{friendError}
								</Text>
							)}
							{friendSuccess && (
								<Text textAlign={'center'} color={'green'}>
									{friendSuccess}
								</Text>
							)}
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
