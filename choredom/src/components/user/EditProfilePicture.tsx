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
  Avatar,
} from '@chakra-ui/react'
import { useState } from 'react'
import { getAuth } from 'firebase/auth'

const EditProfilePicture: React.FC<any> = ({ handleUpdatePicture, user }) => {
	const auth = getAuth()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [file, setFile] = useState('')
	const [passwordChanged, setPasswordChanged] = useState(false)
	const [error, setError] = useState('')

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
      <Stack direction='column' onClick={ onOpen } align={'center'}>
        <Avatar
          size='md'
          name='User Avatar'
          src='/avatar_placeholder.jpg'
          style={{ cursor: 'pointer' }}
        />
        <Text
          align={'center'}
          as='i'
          style={{ cursor: 'pointer' }}
          color='blue.500'
          w='10vh'
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
									handleUpdatePicture(file)
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
