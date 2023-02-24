import { Box, Center, Flex, Grid, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ChoreTile from '../components/ChoreTile'
import ChoreProps from '../interfaces/ChoreTileInterface'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { auth, firestore } from '../firebase/clientApp'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const Chore: React.FC = () => {
	const [user_chores, setUserChores] = useState<any[]>([])
	const [loading, setLoading] = useState(true)

	const getChores = async () => {
		const auth = getAuth()
		onAuthStateChanged(auth, async (user) => {
			try {
				const choreQuery = query(
					collection(firestore, 'chores'),
					where('creatorId', '==', user?.uid)
				)
				const choreDocs = await getDocs(choreQuery)

				const choreData = choreDocs.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}))
				setUserChores(choreData)
				setLoading(false)
			} catch (error) {
				console.error('getChores error:', error)
			}
		})
	}
	useEffect(() => {
		getChores()
	}, [])

	if (loading) {
		return (
			<Center>
				<Text>Loading...</Text>
			</Center>
		)
	}

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
