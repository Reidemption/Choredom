import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilValue } from 'recoil'
import { auth } from '../firebase/clientApp'
import { Button, Text } from '@chakra-ui/react'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import { authStateAtom } from '../atoms/authStateAtom'

type MyAccountProps = {}

const MyAccount: React.FC<MyAccountProps> = () => {
	const gUser = useRecoilValue(authStateAtom)
	console.log('user', gUser)
	const [user] = useAuthState(auth)

	useEffect(() => {
		if (user) {
			console.log('User is logged in', user)
		} else {
			console.log('User is not logged in')
		}
	}, [user])

	const router = useRouter()

	const logout = () => {
		console.log('logout')
		signOut(auth)

		router.push('/')
	}

	return (
		<div>
			<Text>{user?.email}</Text>
			<Button colorScheme={'purple'} onClick={logout}>
				Log out
			</Button>
		</div>
	)
}

export default MyAccount
