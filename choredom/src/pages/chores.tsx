import { Box, Center, Flex, Grid, Stack, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ChoreTile from '../components/ChoreTile'
import ChoreProps from '../interfaces/ChoreTileInterface'
import {
	collection,
	query,
	where,
	getDocs,
	doc,
	updateDoc,
} from 'firebase/firestore'
import { auth, firestore } from '../firebase/clientApp'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const Chore: React.FC = () => {
	const [currentUser, setCurrentUser] = useState<any>(null)
	const [user_chores, setUserChores] = useState<any[]>([])
	const [loading, setLoading] = useState(true)
	const [choreId, setChoreId] = useState(null)

	const editChore = (id: any) => {
		console.log('edit chore')
	}

	// TODO: If the chore is reoccurring, update the date to the next date instead of deleting it.
	// TODO: If the chore "shared" then open a dialog to allow the user to submit a photo of the chore being done.
	const finishChore = async (id: any) => {
		const choreRef = doc(firestore, 'chores', id)
		await updateDoc(choreRef, {
			isDone: true,
		})
		console.log('chore finished')
		getChoresWithUserAlreadySet()
	}

	const getChoresWithUserAlreadySet = async () => {
		setLoading(true)
		try {
			const choreQuery = query(
				collection(firestore, 'chores'),
				where('creatorId', '==', currentUser?.uid)
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
	}

	const getChores = async () => {
		const auth = getAuth()
		onAuthStateChanged(auth, async (user) => {
			try {
				const choreQuery = query(
					collection(firestore, 'chores'),
					where('creatorId', '==', user?.uid)
				)
				const choreDocs = await getDocs(choreQuery)
				setCurrentUser(user)
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
			<Center h='100vh'>
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color='blue.500'
					size='xl'
				/>
			</Center>
		)
	}

	// TODO: Filter the chores to show them in chronological order.
	return (
		<Box>
			<Stack direction={'column'} spacing='6' align={'center'} mt='3'>
				{user_chores &&
					user_chores
						.filter((chore) => {
							return !chore.isDone
						})
						.map((chore) => (
							<ChoreTile
								key={chore.id}
								props={chore}
								finishChore={finishChore}
								editChore={editChore}
							></ChoreTile>
						))}
				hello
			</Stack>
		</Box>
	)
}
export default Chore
