import { Box, Center, Flex, Grid, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ChoreTile from '../components/ChoreTile'
import ChoreProps from '../interfaces/ChoreTileInterface'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { auth, firestore } from '../firebase/clientApp'

const Chore: React.FC = () => {
	const [user_chores, setUserChores] = useState<any[]>([])
	// const [user, setUser] = useState<any>(null)

	// useEffect(() => {
	// 	const req = window.indexedDB.open('firebaseLocalStorageDb', 1)
	// 	req.onsuccess = function (event) {
	// 		const db = event.target.result
	// 	}
	// 	const user = Object.keys(window.indexedDB)
	// 	// const user = Object.keys(window.indexedDB).filter((item) =>
	// 	// 	item.startsWith('firebase:authUser')
	// 	// )[0]
	// 	console.log('user', user)
	// 	setUser(user)
	// }, [])
	const getChores = async () => {
		// console.log(user)

		try {
			const choreQuery = query(
				collection(firestore, 'chores'),
				where('creatorId', '==', 'mUeZerlVKbMuDZ9QvIve72LOqiS2')
				// TODO: Fix the fact that the user ID is hard-coded
			)
			const choreDocs = await getDocs(choreQuery)
			console.log(choreDocs)
			const choreData = choreDocs.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}))
			console.log('choreData:', choreData)
			setUserChores(choreData)
		} catch (error) {
			console.error('getChores error:', error)
		}
	}
	useEffect(() => {
		getChores()
	}, [])
	// asd
	// if (!user) {
	// 	return (
	// 		<Center>
	// 			<Text>Not logged in</Text>
	// 			<Text>Create an account to store chores!</Text>
	// 		</Center>
	// 	)
	// }

	return (
		<Box>
			<Stack direction={'column'} spacing='6' align={'center'} mt='3'>
				{user_chores &&
					user_chores.map((chore) => (
						<ChoreTile key={chore.id} {...chore}></ChoreTile>
					))}
				hello
			</Stack>
		</Box>
	)
}
export default Chore
