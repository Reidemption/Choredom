import React, { useEffect } from 'react'
import { Button, Center, Flex, Skeleton, Stack, Text } from '@chakra-ui/react'
import {
	getAuth,
	onAuthStateChanged,
	signOut,
	updateEmail,
	updateProfile,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userState } from '../atom/atoms'
import Link from 'next/link'
import { CustomToast } from '../components/toast'


type MyAccountProps = {}
import EditUserInfo from '../components/user/EditUserInfo'
import RequestTile from '../components/RequestTile'
import { runTransaction, doc, getDoc } from 'firebase/firestore'
import { firestore } from '../firebase/clientApp'
import EditProfilePicture from '../components/user/EditProfilePicture'
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'

const MyAccount: React.FC<MyAccountProps> = () => {
	const [loaded, setLoaded] = React.useState(true)
	const [gUser, setgUser] = useRecoilState(userState)
	const [currentUser, setCurrentUser] = React.useState<any>(null)
	const router = useRouter()
	const auth = getAuth()
	const [error, setError] = React.useState<string>('')
	const [friendships, setFriendships] = React.useState<any[]>([])
	const [tileLoading, setTileLoading] = React.useState<boolean>(false)
	const [loading, setLoading] = React.useState<boolean>(false)
	const [showFriendships, setShowFriendships] = React.useState<boolean>(false)
  const { addToast } = CustomToast()


	const getAccountInfo = async () => {
		onAuthStateChanged(auth, async (user) => {
			try {
				if (!user) {
					throw new Error ('User not found. Please login.')
				}
				const { uid, email, displayName } = user!
				setgUser({ uid, email, displayName })
				setCurrentUser(user)

				setLoaded(false)
			} catch (error : any) {
				addToast({ message: error.message, type: 'error' })
				console.error('myAccount error:', error)
			}
		})
	}
	useEffect(() => {
		async function func() {
			await getAccountInfo()
		}
		func()
	}, [])

	const logout = () => {
		signOut(auth)
		addToast({ message: 'Sign Out Successful', type: 'success' })
		router.push('/')
	}

	const updateProfilePicture = (file: any) => {
		const storage = getStorage()
		
		
		const storageRef = ref(storage, `/files/${file.name}`)

		const uploadTask = uploadBytesResumable(storageRef, file)
	}

	const getFriendships = async () => {
		setLoading(true)
		try {
			if (!gUser) {
				throw new Error('User error. Try again later.')
			}
			setCurrentUser(gUser)
			const friendsRef = doc(firestore, 'friends', gUser.uid)
			const docSnap = await getDoc(friendsRef)
			if (!docSnap.exists()) {
				throw new Error('Possibility of no friends.')
			}
			let requests = docSnap.data()?.friends
			setFriendships(requests.filter((r: any) => r.status !== 'pending'))
		} catch (error: any) {
			addToast({ message: error.message, type: 'error' })
			console.error('Error detected in getFriendships', error)
		}
		setLoading(false)
	}

	const updateUser = (updated_user: any) => {
		// TODO: ensure there is a valid email??
		if (updated_user.email === '' || !updated_user.email.includes('@')) {
			setError('Valid email is required')
			return
		}
		if (
			updated_user.displayName === currentUser.displayName ||
			updated_user.displayName === gUser?.displayName
		) {
			return
		}
		if (auth.currentUser) {
			if (
				updated_user.email != gUser?.email ||
				updated_user.email != currentUser.email
			) {
				updateEmail(auth.currentUser, updated_user.email)
					.then(() => {
						setCurrentUser(auth.currentUser)
						const { uid, email, displayName } = auth.currentUser!
						setgUser({ uid, email, displayName })
						addToast({ message: 'Email updated', type: 'success' })
					})
					.catch((error) => {
						addToast({ message: error.message, type: 'error' })
						console.error(error)
					})
			}
			updateProfile(auth.currentUser, {
				displayName: updated_user.displayName,
			})
				.then(() => {
					setCurrentUser(auth.currentUser)
					const { uid, email, displayName } = auth.currentUser!
					setgUser({ uid, email, displayName })
					addToast({ message: 'Display name updated', type: 'success' })
				})
				.catch((error) => {
					addToast({ message: error.message, type: 'error' })
					console.error(error)
				})
		}
	}

	const acceptRequest = async (req: any) => {
		setTileLoading(true)
		await handleRequest(req, 'accepted')
		await getFriendships()
		setTileLoading(false)
	}

	const rejectRequest = async (req: any) => {
		setTileLoading(true)
		await handleRequest(req, 'rejected')
		await getFriendships()
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
					throw new Error('Error finding friend request')
				}
				let arr2 = [...submitterDoc.data()?.friends]
				arr2[index2] = friendDocData
				transaction.update(submitterDocRef, {
					friends: [...arr2],
				})
			})
		} catch (error: any) {
			addToast({ message: error.message, type: 'error' })
			console.error(error)
		}
	}

	const toggleFriendships = () => {
		setShowFriendships(!showFriendships)
	}

	if (!currentUser) {
		return (
			<Center h={'100vh'}>
				<Text fontSize={'xl'} color={'blue.400'}>
					<Link href='/'>Login&nbsp;</Link>
				</Text>
				<Text fontSize='xl'> to view account details.</Text>
			</Center>
		)
	}

	return (
		<Center h={'100vh'}>
			<Stack direction={'column'}>
				<Flex border={'2px'} borderColor='black' p='2'>
					<Stack direction='row' mb='4' mt='2'>
						<Stack direction='column' alignItems={'center'}>
							<EditProfilePicture handleUpdatePicture={ updateProfilePicture } />
						</Stack>
						<Stack direction='column' px='3'>
							{!currentUser?.displayName && (
								<Text fontSize='xl' fontWeight='bold'>
									No Username Set
								</Text>
							)}
							{currentUser?.displayName && (
								<Text fontSize='xl' fontWeight='bold'>
									{currentUser?.displayName}
								</Text>
							)}
							<Text fontSize='xl' fontWeight='bold'>
								{gUser?.email}
							</Text>
							{currentUser?.phoneNumber && (
								<Text fontSize='xl' fontWeight='bold'>
									{currentUser?.phoneNumber}
								</Text>
							)}
							<Button colorScheme={'purple'} onClick={logout}>
								Log out
							</Button>
						</Stack>
						{!loaded && (
							<EditUserInfo user={currentUser} handleEditUser={updateUser} />
						)}
					</Stack>
				</Flex>
				<Flex align='center' justify={'center'}>
					<Button
						colorScheme={'purple'}
						w='75%'
						isLoading={loading}
						onClick={() => {
							getFriendships()
							toggleFriendships()
						}}
					>
						{!showFriendships ? 'View All Relationships' : 'Hide Relationships'}
					</Button>
				</Flex>
				{showFriendships &&
					friendships.map((request, i) => (
						<RequestTile
							key={i}
							request={request}
							rejectRequest={rejectRequest}
							acceptRequest={acceptRequest}
							loading={tileLoading}
							uid={gUser?.uid}
						/>
					))}
			</Stack>
		</Center>
	)
}

export default MyAccount
