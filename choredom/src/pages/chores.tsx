import {
	Box,
	Center,
	Stack,
	Spinner,
	Text,
	Button,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ChoreTile from '../components/ChoreTile'
import {
	collection,
	query,
	where,
	getDocs,
	doc,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore'
import { firestore } from '../firebase/clientApp'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRecoilState } from 'recoil'
import { userState } from '../atom/atoms'
import Link from 'next/link'
import { CustomToast } from '../components/toast'


const Chore: React.FC = () => {
	const [currentUser, setCurrentUser] = useRecoilState(userState)
	const [user_chores, setUserChores] = useState<any[]>([])
	const [loading, setLoading] = useState(false)
	const [oldChores, setOldChores] = useState<boolean>(false)
  const { addToast } = CustomToast()


	const editChore = async (chore: any, id: any) => {
		if (id) {
			const choreRef = doc(firestore, 'chores', id)
			await updateDoc(choreRef, {
				...chore,
			})
			addToast({ message: 'Chore Updated', type: 'success' })
			getChores()
		}
		else {
			addToast({ message: 'Error updating chore', type: 'error' })
		}
	}

	const deleteChore = async (id: any) => {
		if (id) {
			const choreRef = doc(firestore, 'chores', id)
			await deleteDoc(choreRef)
			addToast({ message: 'Chore Deleted', type: 'success' })
			getChores()
		}
		else {
			addToast({ message: 'Error deleting chore', type: 'error' })
		}

	}

	const finishChore = async (chore: any, id: string) => {
		if (chore.repeated) {
			console.log('chore is marked as repeated \nThis is still a work in progress' );
			return;
			// TODO: If the chore is reoccurring, update the date to the next date instead of deleting it.
		}
		else if (!chore.shared && !chore.repeated) {
			const choreRef = doc(firestore, 'chores', id);
			await updateDoc(choreRef, {
				isDone: !chore.isDone,
			})
		}
		addToast({ message: 'Chore Completed', type: 'success' })
		getChores()
	}

	const getChoresWithGlobalUser = async () => {
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
		} catch (error: any) {
			addToast({ message: error.message, type: 'error' })
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

				const choreData = choreDocs.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}))
				setUserChores(
					choreData.sort((a : any, b : any) => {
						return new Date(b.Date).valueOf() - new Date(a.Date).valueOf()
					})
				)
			} catch (error: any) {
				addToast({ message: error.message, type: 'error' })
				console.error('getChores error:', error)
			}
			setLoading(false)
		})
	}

	const getChores = async () => {
		setLoading(true)

		if (!currentUser?.uid) {

			await getChoresAndSetUser()
		} else {
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
		return chore.isDone == true
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

	if (allChoresAreDone === user_chores.length && !oldChores) {
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
