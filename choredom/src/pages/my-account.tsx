import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/clientApp'
import { Button, Center, Flex, Skeleton, Stack, Text } from '@chakra-ui/react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userState } from '../atom/atoms'
type MyAccountProps = {}

const MyAccount: React.FC<MyAccountProps> = () => {
	const [loaded, setLoaded] = React.useState(false)
	const [gUser, setgUser] = useRecoilState(userState)
	const [currentUser, setCurrentUser] = React.useState<any>(null)
	const router = useRouter()

	const getAccountInfo = async () => {
		const auth = getAuth()
		onAuthStateChanged(auth, async (user) => {
			try {
				const { uid, email, displayName } = user!
				setgUser({ uid, email, displayName })
				setLoaded(false)
			} catch (error) {
				console.error('myAccount error:', error)
			}
		})
	}
	useEffect(() => {
		getAccountInfo()
	}, [])

	const logout = () => {
		console.log('logout')
		signOut(auth)
		router.push('/')
	}

	return (
		<Center border={'1px'} borderColor='white' w='70vh'>
			<Stack direction='row' my='4'>
				<Stack direction='column' alignItems={'center'}>
					<Avatar size='md' name='User Avatar' src='/avatar_placeholder.jpg' />
					<Text as='i'>Update Profile Picture</Text>
				</Stack>
				<Stack direction='column' px='3'>
					<Text fontSize='xl' fontWeight='bold'>
						Hardcoded Name
					</Text>
					<Text fontSize='xl' fontWeight='bold'>
						Hardcoded Username
					</Text>
					<Text fontSize='xl' fontWeight='bold'>
						{gUser?.email}
					</Text>
					<Button colorScheme={'purple'} onClick={logout}>
						Log out
					</Button>
				</Stack>
			</Stack>
		</Center>
	)
}

export default MyAccount
