import React, { useEffect, useState } from 'react'
import SocialTile from '@/src/components/SocialTile'
import { Center, Grid, Text, useMediaQuery } from '@chakra-ui/react'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '@/src/firebase/clientApp'
import { useRecoilState } from 'recoil'
import { userState } from '../atom/atoms'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { CustomToast } from '../components/toast'


const Feed: React.FC<any> = () => {
	const [gUser, setgUser] = useRecoilState(userState)
	const [shared_chores, setSharedChores] = useState<any>([])
	const auth = getAuth()
  const [isSmallScreen] = useMediaQuery('(max-width: 768px)')
  const { addToast } = CustomToast()


	const checkUserInfo = async () => {
		onAuthStateChanged(auth, async (user) => {
			try {
				if (!user) {
					throw new Error('User not found. Please login.')
				}
				const friends = await getFriends(user.uid)
				await getSharedChores(user.uid, friends)
			} catch (error: any) {
				addToast({ message: error.message, type: 'error' })
				console.error(error)
			}
		})
	}

	const getFriends = async (id: string) => { 
		try {
			if (!id) {
				throw new Error('User error. Try again later.')
			}
			const friendsRef = doc(firestore, 'friends', id)
			const docSnap = await getDoc(friendsRef)
			if (!docSnap.exists()) {
				throw new Error('Possibility of no friends. No document was found.')
			}
			let requests = docSnap.data()?.friends
			return requests.filter((r: any) => r.status === 'accepted')
		} catch (error: any) {
			addToast({ message: error.message, type: 'error' })
			console.error('Error detected in getFriends:', error)
		}
	}
	
	const getSharedChores = async (id: string, friends: any) => {
		try {
			if (!id) {
				throw new Error('User error. Try again later.')
			}
			if (friends.length === 0) {
				throw new Error('No friends found. Please add friends.')
			}
			 const newSharedChores = []
			for (const friend of friends) {
				const sharedChoresRef = doc(
					firestore,
					'sharedChores',
					friend.friend_id
				)
				const docSnap = await getDoc(sharedChoresRef)
				if (!docSnap.exists()) {
					return
				}
				const sharedChores = docSnap.data().sharedChores // array of objects? (shared chores with the user)
				if (sharedChores) {
					newSharedChores.push(...sharedChores)
				}
			}

			const sortedChores = newSharedChores.sort(
				(a: any, b: any) => b.finishedDate - a.finishedDate
			)
			setSharedChores([...sortedChores])

		} catch (error: any) {
			addToast({ message: error.message, type: 'error' })
			console.error('Error detected in getSharedChores:', error)
		}
	}


	useEffect(() => {
		async function onLoad() {
			await checkUserInfo()
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
			{isSmallScreen && (
				<Grid templateColumns='repeat(, 1fr)' gap={6}>
					{shared_chores.map((tile: any) => {
						return <SocialTile key={tile.id} props={tile} />
					})}
				</Grid>
			)}
			{!isSmallScreen && (
				<Grid templateColumns='repeat(2, 1fr)' gap={6}>
					{shared_chores.map((tile: any) => {
						return <SocialTile key={tile.id} props={tile} />
					})}
				</Grid>
			)}
		</Center>
	)
}

export default Feed
