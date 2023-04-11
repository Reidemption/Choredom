import React, { useEffect, useState } from 'react'
import SocialTile from '@/src/components/SocialTile'
import { Box, Center, Grid } from '@chakra-ui/react'
import SocialTileProps from '@/src/interfaces/SocialTileInterface'
import { doc, getDoc } from 'firebase/firestore'
import {auth, firestore} from '@/src/firebase/clientApp'
import { useRecoilState } from 'recoil'
import { userState } from '../atom/atoms'
import { onAuthStateChanged } from 'firebase/auth'

const socialTiles: Array<SocialTileProps> = [
	{
		finishedDate: '9/30',
		choreTitle: 'Took over the entire world together :^)',
		// choreTitle: "Just got married :)",
		image: '../us.jpg',
		imageAlt: 'The happy couple',
		choreStory: 'We got married in the mountains. It was a beautiful day.',
	},
	{
		finishedDate: '9/30',
		choreTitle: 'Took over the entire world together :^)',
		// choreTitle: "Just got married :)",
		image: '../us.jpg',
		imageAlt: 'The happy couple',
		choreStory: 'We got married in the mountains. It was a beautiful day.',
	},
	{
		finishedDate: '9/30',
		choreTitle: 'Took over the entire world together :^)',
		// choreTitle: "Just got married :)",
		// image: "../us.jpg",
		// imageAlt: "The happy couple",
		choreStory: 'We got married in the mountains. It was a beautiful day.',
	},
]

interface FeedProps {}

const Feed: React.FC<FeedProps> = () => {
	const [gUser, setgUser] = useRecoilState(userState)
	const [currentUser, setCurrentUser] = React.useState<any>(null)
	const [friends, setFriends] = useState([])
	const [shared_chores, setSharedChores] = useState([])

	const getFriends = async () => { 
		console.log('Getting friends...')
		try {
			if (!gUser) {
				throw new Error('User error. Try again later.')
			}
			const friendsRef = doc(firestore, 'friends', gUser.uid)
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
	
	const getSharedChores = async () => {
		console.log('Getting friends...')
		try {
			if (!gUser) {
				throw new Error('User error. Try again later.')
			}
			console.log('friends:', friends)
			if (friends.length === 0) {
				throw new Error('No friends found. Please add friends.')
			}
			friends.forEach(async (friend: any) => {
				const sharedChoresRef = doc(firestore, 'shared', friend.friend_id)
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
			const friendsRef = doc(firestore, 'shared', gUser.uid)
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

	const checkUserInfo = async () => {
		 onAuthStateChanged(auth, async (user) => {
				try {
					if (!user) {
						throw new Error('User not found. Please login.')
					}
					const { uid, email, displayName } = user!
					setgUser({ uid, email, displayName })
					setCurrentUser(user)
				} catch (error) {
					console.error(error)
				}
			})
	 }


	useEffect(() => {
		async function onInitialization() {
			console.log('Feed mounted')
			checkUserInfo()
			getFriends()
			getSharedChores()
		}
		onInitialization()
	}, [])

	return (
		<Center>
			<Box>
				<Grid templateColumns='repeat(, 1fr)' gap={6}>
					{socialTiles.map((tile) => (
						<SocialTile key={tile.choreTitle} {...tile} />
					))}
				</Grid>
			</Box>
		</Center>
	)
}

export default Feed
