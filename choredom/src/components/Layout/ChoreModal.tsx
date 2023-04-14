import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	Text,
	Flex,
	Icon,
	Link,
	FormLabel,
	Input,
	Textarea,
	FormControl,
	Stack,
	Checkbox,
	Spacer,
	Select,
	FormHelperText,
	useToast,
} from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'
import { useState } from 'react'
import {
	doc,
	getDoc,
	serverTimestamp,
	setDoc,
	addDoc,
	collection,
} from 'firebase/firestore'
import { auth, firestore } from '@/src/firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'

export default function VerticallyCenter() {
	const toast = useToast()
	const router = useRouter()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [user] = useAuthState(auth)
	const [choreForm, setChoreForm] = useState({
		choreName: '',
		choreDate: '',
		repeated: false,
		choreLocation: '',
		choreFrequency: '',
		choreDescription: '',
		shared: false,
	})
	const [formError, setFormError] = useState('')
	const [loading, setLoading] = useState(false)

	const handleCreateChore = async () => {
		setLoading(true)
		try {
			if (formError) setFormError('')
			if (!choreForm.choreName || !choreForm.choreDate) {
				throw new Error('Please fill out all starred fields')
			}

			const today = () => {
				const date = new Date()
				const day = date.getDate()
				const month = date.getMonth() + 1
				const year = date.getFullYear()
				return `${year}-${month}-${day}`
			}

			// Make sure date is later than today
			if (new Date(choreForm.choreDate) < new Date(today())) {
				throw new Error('Please enter a date later than today')
			}

			const choreDocRef = await addDoc(collection(firestore, 'chores'), {
				creatorId: user?.uid,
				createdAt: serverTimestamp(),
				Name: choreForm.choreName,
				Date: choreForm.choreDate,
				repeated: choreForm.repeated,
				Location: choreForm.choreLocation,
				Frequency: choreForm.choreFrequency,
				Description: choreForm.choreDescription,
				shared: choreForm.shared,
				isDone: false,
			})
			// console.log('Document written with ID: ', choreDocRef.id)
			toast({
				title: `Created chore ${choreForm.choreName}`,
				status: 'success',
				isClosable: true,
				duration: 9000,
			})
			onClose()
			setLoading(false)
			if (router.pathname === '/chores') {
				router.reload()
			}
		} catch (error: any) {
			console.error('handleCreateChore error:', error)
			toast({
				title: `Error creating chore`,
				status: 'error',
				isClosable: true,
				duration: 9000,
			})
			setFormError(error.message)
		}
		setLoading(false)
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log('submit')
	}

	const onChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		setChoreForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.checked)
		setChoreForm({ ...choreForm, repeated: e.target.checked })
	}
	const onShareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.checked)
		setChoreForm({ ...choreForm, shared: e.target.checked })
	}

	if (!user) {
		return( 
				<><Flex
				onClick={onOpen}
				align='center'
				p='4'
				mx='4'
				borderRadius='lg'
				role='group'
				cursor='pointer'
				_hover={{
					bg: 'cyan.400',
					color: 'white',
				}}
			>
				<Icon
					mr='4'
					fontSize='16'
					_groupHover={{
						color: 'white',
					}}
					as={FiEdit}
				/>
				Add Chore
			</Flex>

			<Modal onClose={onClose} isOpen={isOpen}>
				<ModalOverlay />
					<ModalContent maxW='40rem'>
						<ModalHeader>Must Log In to Create a Chore</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Text>Please sign in to create a chore</Text>
						</ModalBody>
						<ModalFooter>
							<Button>
								<Link href='/'>Login</Link>
							</Button>
							<Spacer />
							<Button
								onClick={
									onClose
								}
							>
								Close
							</Button>
						</ModalFooter>
					</ModalContent>
					</Modal>
			</>
		)
}
	return (
		<>
			<Flex
				onClick={onOpen}
				align='center'
				p='4'
				mx='4'
				borderRadius='lg'
				role='group'
				cursor='pointer'
				_hover={{
					bg: 'cyan.400',
					color: 'white',
				}}
			>
				<Icon
					mr='4'
					fontSize='16'
					_groupHover={{
						color: 'white',
					}}
					as={FiEdit}
				/>
				Add Chore
			</Flex>

			<Modal onClose={onClose} isOpen={isOpen}>
				<ModalOverlay />
				<form onSubmit={onSubmit}>
					<ModalContent maxW='40rem'>
						<ModalHeader>Create New Chore</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Stack direction={'column'} spacing={2}>
								<FormControl isRequired>
									<FormLabel mb={0}>Chore Name</FormLabel>
									<Input id='choreName' name='choreName' onChange={onChange} />
								</FormControl>
								<Stack direction='row' alignItems={'center'}>
									<FormControl isRequired>
										<FormLabel mb={0}>Chore Date</FormLabel>
										<Input
											id='choreDate'
											name='choreDate'
											onChange={onChange}
											type='date'
										/>
									</FormControl>
									<Checkbox
										pt={4}
										id='repeated'
										name='repeated'
										onChange={onCheckboxChange}
										isChecked={choreForm.repeated}
									>
										Repeated?
									</Checkbox>
								</Stack>
								{choreForm.repeated && (
									<FormControl isRequired>
										<Select onChange={onChange}>
											<option value='day'>Daily</option>
											<option value='week'>Weekly</option>
											<option value='2week'>Bi-Weekly</option>
											<option value='month'>Monthly</option>
											<option value='quarter'>Quarterly</option>
											<option value='year'>Yearly</option>
										</Select>
									</FormControl>
								)}
								<FormControl>
									<FormLabel mb={0}>Chore Location</FormLabel>
									<Input
										id='choreLocation'
										name='choreLocation'
										onChange={onChange}
									/>
								</FormControl>
								<FormControl>
									<FormLabel mb={0}>Chore Description</FormLabel>
									<Textarea
										id='choreDescription'
										name='choreDescription'
										onChange={onChange}
									/>
								</FormControl>
								<Checkbox
									pt={1}
									id='shared'
									name='shared'
									onChange={onShareChange}
									isChecked={choreForm.shared}
								>
									Share Upon Completion?
								</Checkbox>
								{formError && (
									<Text color='red.500' fontSize='sm'>
										{formError}
									</Text>
								)}
							</Stack>
						</ModalBody>
						<ModalFooter>
							<Button
								colorScheme={'purple'}
								type='submit'
								isLoading={loading}
								onClick={() => {
									handleCreateChore()
									onClose
								}}
							>
								Create Chore
							</Button>
							<Spacer />
							<Button
								onClick={() => {
									setFormError('')
									onClose
								}}
							>
								Close
							</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</>
	)
}
