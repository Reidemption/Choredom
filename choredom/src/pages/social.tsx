import React, { useEffect, useState } from 'react'
import SocialTile from '@/src/components/SocialTile'
import { Box, Center, Grid, Text } from '@chakra-ui/react'
import SocialTileProps from '@/src/interfaces/SocialTileInterface'
import { doc, getDoc } from 'firebase/firestore'
import {auth, firestore} from '@/src/firebase/clientApp'
import { useRecoilState } from 'recoil'
import { userState } from '../atom/atoms'
import { getAuth, onAuthStateChanged } from 'firebase/auth'


const Feed: React.FC<any> = () => {
	const [gUser, setgUser] = useRecoilState(userState)
	const [friends, setFriends] = useState([])
	const [shared_chores, setSharedChores] = useState([])
	const auth = getAuth()
	const user = auth.currentUser

	const getFriends = async () => { 
		console.log('Getting friends...')
		try {
			if (!user) {
				throw new Error('User error. Try again later.')
			}
			const friendsRef = doc(firestore, 'friends', user.uid)
			const docSnap = await getDoc(friendsRef)
			if (!docSnap.exists()) {
				throw new Error('Possibility of no friends. No document was found.')
			}
			let requests = docSnap.data()?.friends
			setFriends(requests.filter((r: any) => r.status === 'accepted'))
			return requests.filter((r: any) => r.status === 'accepted')
		} catch (error) {
			console.log('Error detected in getFriends:', error)
		}
	}
	
	const getSharedChores = async () => {
		console.log('Getting shared chores...')
		try {
			if (!user) {
				throw new Error('User error. Try again later.')
			}
			console.log('friends:', friends)
			if (friends.length === 0) {
				throw new Error('No friends found. Please add friends.')
			}
			friends.forEach(async (friend: any) => {
				const sharedChoresRef = doc(firestore, 'sharedChores', friend.friend_id)
				const docSnap = await getDoc(sharedChoresRef)
				if (!docSnap.exists()) {
					throw new Error('Possibility of no shared chores. No document was found.')
				}
				let sharedChores = docSnap.data()
				console.log('sharedChores', sharedChores)
				return
				let temp_array;
				if (sharedChores) {
					temp_array = shared_chores.push(sharedChores)
				}
				else {
					temp_array = shared_chores
				}
				setSharedChores(temp_array)
			})
			const friendsRef = doc(firestore, 'shared', user.uid)
			const docSnap = await getDoc(friendsRef)
			if (!docSnap.exists()) {
				throw new Error('Possibility of no friends. No document was found.')
			}
			let requests = docSnap.data()?.friends
			setFriends(requests.filter((r: any) => r.status === 'accepted'))
		} catch (error) {
			console.log('Error detected in getFriends:', error)
		}
	}

	// const checkUserInfo = async () => {
	// 	 onAuthStateChanged(auth, async (user) => {
	// 			try {
	// 				if (!user) {
	// 					throw new Error('User not found. Please login.')
	// 				}
	// 				console.log(user);
	// 				const { uid, email, displayName } = user!
	// 				setgUser({ uid, email, displayName })
	// 				return uid
	// 			} catch (error) {
	// 				console.error(error)
	// 			}
	// 	 })
	//  }


	useEffect(() => {
		async function onLoad() {
			console.log('onLoad');
			console.log('user', user);
			await getFriends()
			await getSharedChores()
		}
		
		onLoad()
	}, [])

	if (shared_chores.length === 0) {
		return (
			<Center h='100vh'>
				<Text>
					No friends have shared a chore 😭
				</Text>
			</Center>
		)
	}
		return (
			<Center>
				<Box>
					<Grid templateColumns='repeat(, 1fr)' gap={6}>
						{shared_chores.map((tile) => (
							<SocialTile key={tile.choreTitle} {...tile} />
						))}
					</Grid>
				</Box>
			</Center>
		)
}

export default Feed
