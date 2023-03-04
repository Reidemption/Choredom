import {
	Box,
	Center,
	Flex,
	Grid,
	Stack,
	Spinner,
	Text,
	Button,
} from '@chakra-ui/react'
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
	orderBy,
	deleteDoc,
} from 'firebase/firestore'
import { auth, firestore } from '../firebase/clientApp'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRecoilState } from 'recoil'
import { userState } from '../atom/atoms'
import Link from 'next/link'

const Chore: React.FC = () => {
	const [currentUser, setCurrentUser] = useRecoilState(userState)
	const [user_chores, setUserChores] = useState<any[]>([])
	const [loading, setLoading] = useState(false)
	const [oldChores, setOldChores] = useState<boolean>(false)

	const editChore = async (chore: any, id: any) => {
		if (id) {
			const choreRef = doc(firestore, 'chores', id)
			await updateDoc(choreRef, {
				...chore,
			})
			getChores()
		}
	}

	const deleteChore = async (id: any) => {
		if (id) {
			const choreRef = doc(firestore, 'chores', id)
			await deleteDoc(choreRef)
			getChores()
		}
	}

	const finishChore = async (chore: any, id: any) => {
		if (chore.shared) {
			// TODO: If the chore "shared" then open a dialog to allow the user to submit a photo of the chore being done.
		}
		if (chore.repeated) {
			// TODO: If the chore is reoccurring, update the date to the next date instead of deleting it.
		}
		if (!chore.repeated) {
			const choreRef = doc(firestore, 'chores', id)
			await updateDoc(choreRef, {
				isDone: !chore?.status,
			})
			console.log('chore finished')
		}
		getChores()
	}

	const getChoresWithGlobalUser = async () => {
		try {
			const choreQuery = query(
				collection(firestore, 'chores'),
				where('creatorId', '==', currentUser?.uid)
			)
			const choreDocs = await getDocs(choreQuery)
			console.log('choreDocs', choreDocs)
			const choreData = choreDocs.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}))
			console.log('choreData', choreData)
			setUserChores(choreData)
		} catch (error) {
			console.error('getChores error:', error)
		}
	}

	const getChoresAndSetUser = async () => {
		const auth = getAuth()
		onAuthStateChanged(auth, async (user) => {
			try {
				const { uid, displayName, email } = user!
				setCurrentUser({ uid, displayName, email })
				const choreQuery = query(
					collection(firestore, 'chores'),
					where('creatorId', '==', user?.uid)
				)
				const choreDocs = await getDocs(choreQuery)
				console.log('choreDocs', choreDocs)

				const choreData = choreDocs.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}))
				console.log(choreData)
				setUserChores(choreData)
			} catch (error) {
				console.error('getChores error:', error)
			}
			setLoading(false)
		})
	}

	const getChores = async () => {
		setLoading(true)
		console.log('currentUser', currentUser)

		if (!currentUser?.uid) {
			console.log('no user')

			await getChoresAndSetUser()
		} else {
			console.log('user')
			await getChoresWithGlobalUser()
		}
		setLoading(false)
	}

	const showOldChores = () => {
		setOldChores(!oldChores)
	}

	const filteredChores = user_chores.filter((chore) => {
		return !chore.isDone || oldChores
	})

	const allChoresAreDone = user_chores.filter((chore) => {
		return chore.isDone
	}).length

	useEffect(() => {
		async function fetchChores() {
			await getChores()
		}
		fetchChores()
	}, [])

	if (!currentUser?.uid) {
		return (
			<Center h='100vh'>
				<Text fontSize={'xl'} color={'blue.400'}>
					<Link href='register'>Create an account&nbsp;</Link>
				</Text>
				<Text fontSize='xl'> to keep track of chores!</Text>
			</Center>
		)
	}

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
	// If the user has no chores
	// TODO: Add a button to toggle showing completed chores.
	if (allChoresAreDone === 0) {
		return (
			<Center h='100vh'>
				<Stack>
					<Text fontSize='xl'>You are all caught up on your chores!</Text>
					<Button onClick={showOldChores} colorScheme='purple'>
						Show Completed Chores
					</Button>
				</Stack>
			</Center>
		)
	}
	// TODO: Filter the chores to show them in chronological order.
	return (
		<Box>
			<Stack direction={'column'} spacing='6' align={'center'} mt='3'>
				{user_chores &&
					filteredChores.map((chore) => (
						<ChoreTile
							key={chore.id}
							props={chore}
							checked={chore.isDone}
							finishChore={finishChore}
							editChore={editChore}
							deleteChore={deleteChore}
						></ChoreTile>
					))}
				<Button onClick={showOldChores} colorScheme='purple'>
					Toggle Completed Chores
				</Button>
			</Stack>
		</Box>
	)
}
export default Chore
