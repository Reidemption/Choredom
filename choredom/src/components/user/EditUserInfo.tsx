import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	FormControl,
	FormLabel,
	Input,
	Spacer,
	Stack,
	Text,
	useDisclosure,
	Flex,
	Icon,
	IconButton,
} from '@chakra-ui/react'
import { useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

const EditUser: React.FC<any> = () => {
	return <Icon as={AiOutlineEdit} boxSize={4} />
}

interface ProfileTypes {
	email: string | undefined
	displayName: string | undefined
}

const EditUserModal: React.FC<any> = ({ handleEditUser, user }) => {
	const auth = getAuth()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [userForm, setUserForm] = useState<ProfileTypes>({
		email: user.email,
		displayName: user.displayName,
	})
	const [passwordChanged, setPasswordChanged] = useState(false)
	const [error, setError] = useState('')

	const resetChangeForm = () => {
		setUserForm({ ...user })
		onClose()
	}

	const onChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		setUserForm({ ...userForm, [e.target.name]: e.target.value })
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleEditUser(userForm)
	}

	const updatePasscode = () => {
		sendPasswordResetEmail(auth, user.email)
			.then(() => {
				// Password reset email sent!
				setPasswordChanged(true)
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
				setError(`${errorCode}, ${errorMessage}`)
			})
	}

	return (
		<Flex>
			<IconButton
				aria-label='Edit chore'
				size='xs'
				icon={<EditUser />}
				onClick={onOpen}
			/>

			<Modal onClose={onClose} isOpen={isOpen}>
				<ModalOverlay />
				<form onSubmit={onSubmit}>
					<ModalContent maxW='40rem'>
						<ModalHeader>Edit Profile Info</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Stack direction={'column'} spacing={2}>
								<FormControl isRequired>
									<FormLabel mb={0}>Email:</FormLabel>
									<Input
										value={userForm?.email}
										id='email'
										name='email'
										onChange={onChange}
									/>
								</FormControl>
								<FormControl>
									<FormLabel mb={0}>Username:</FormLabel>
									<Input
										id='displayName'
										name='displayName'
										onChange={onChange}
										value={userForm.displayName}
									/>
								</FormControl>
								{!passwordChanged && (
									<Text
										onClick={updatePasscode}
										as='i'
										style={{ cursor: 'pointer' }}
										color='blue.500'
									>
										Click Here to Update Password
									</Text>
								)}
								{passwordChanged && (
									<Text color='green.500'>Check your email!</Text>
								)}
								{passwordChanged && error != '' && (
									<Text color='green.500'>{error}</Text>
								)}
							</Stack>
						</ModalBody>
						<ModalFooter>
							<Button
								colorScheme={'purple'}
								type='submit'
								onClick={() => {
									handleEditUser(userForm)
									onClose()
								}}
							>
								Update User Info
							</Button>
							<Spacer />
							<Button onClick={resetChangeForm}>Close</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</Flex>
	)
}

export default EditUserModal
