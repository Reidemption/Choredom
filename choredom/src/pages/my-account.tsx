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
type MyAccountProps = {}
import EditUserInfo from '../components/user/EditUserInfo'

const MyAccount: React.FC<MyAccountProps> = () => {
	const [loaded, setLoaded] = React.useState(true)
	const [gUser, setgUser] = useRecoilState(userState)
	const [currentUser, setCurrentUser] = React.useState<any>(null)
	const [edit, setEdit] = React.useState<boolean>(false)
	const router = useRouter()
	const auth = getAuth()
	const [error, setError] = React.useState<string>('')

	const getAccountInfo = async () => {
		onAuthStateChanged(auth, async (user) => {
			try {
				const { uid, email, displayName } = user!
				console.log(user)
				setgUser({ uid, email, displayName })
				setCurrentUser(user)
				console.log('currentUser', currentUser)

				setLoaded(false)
			} catch (error) {
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
		console.log('logout')
		signOut(auth)
		router.push('/')
	}

	const updateProfilePicture = () => {
		console.log('update profile picture')
	}

	const updateUser = (updated_user: any) => {
		// TODO: ensure there is a valid email??
		if (updated_user.email === '') {
			setError('Email is required')
			return
		}
		if (
			updated_user.displayName === currentUser.displayName ||
			updated_user.displayName === gUser?.displayName
		) {
			return
		}
		const auth = getAuth()
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
					})
					.catch((error) => {
						console.log(error)
					})
			}
			updateProfile(auth.currentUser, {
				displayName: updated_user.displayName,
			})
				.then(() => {
					setCurrentUser(auth.currentUser)
					const { uid, email, displayName } = auth.currentUser!
					setgUser({ uid, email, displayName })
					console.log('updated!')
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}

	return (
		<Center h={'100vh'}>
			<Flex border={'2px'} borderColor='black' p='2'>
				<Stack direction='row' mb='4' mt='2'>
					<Stack direction='column' alignItems={'center'}>
						<Avatar
							size='md'
							name='User Avatar'
							src='/avatar_placeholder.jpg'
							onClick={() => updateProfilePicture()}
						/>
						<Text
							align={'center'}
							as='i'
							style={{ cursor: 'pointer' }}
							color='blue.500'
							w='10vh'
						>
							Update Profile Picture
						</Text>
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
		</Center>
	)
}

export default MyAccount
