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
  Avatar,
} from '@chakra-ui/react'
import { useState } from 'react'

const EditProfilePicture: React.FC<any> = ({ handleUpdatePicture, avatar }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [file, setFile] = useState('')

  const resetChangeForm = () => {
    setFile('')
		onClose()
	}

	const onChange = (
		e: any
	) => {
		setFile(e.target.files[0])
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return
		handleUpdatePicture(file)
	}

	return (
		<Flex>
			<Stack direction='column' align={'center'}>
				<Avatar
					size='md'
					name='User Avatar'
					src={avatar ? avatar : '/avatar_placeholder.jpg'}
				/>
				<Text
					align={'center'}
					as='i'
					style={{ cursor: 'pointer' }}
					color='blue.500'
					w='10vh'
					onClick={onOpen}
				>
					Update Profile Picture
				</Text>
			</Stack>
			<Modal onClose={onClose} isOpen={isOpen}>
				<ModalOverlay />
				<form onSubmit={onSubmit}>
					<ModalContent maxW='40rem'>
						<ModalHeader>Edit Profile Info</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Stack direction={'column'} spacing={2}>
								<FormControl isRequired>
									<FormLabel mb={0}>Picture:</FormLabel>
									<Input
										id='email'
										mb='2'
										pt='1'
										name='email'
										type='file'
										onChange={onChange}
										accept='image/*'
									/>
								</FormControl>
							</Stack>
						</ModalBody>
						<ModalFooter>
							<Button
								colorScheme={'purple'}
								type='submit'
								onClick={() => {
									onClose()
								}}
							>
								Update Profile Picture
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

export default EditProfilePicture
