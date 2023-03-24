import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Checkbox,
	FormControl,
	FormLabel,
	Input,
	Select,
	Spacer,
	Stack,
	Textarea,
	useDisclosure,
	Flex,
	Icon,
	IconButton,
} from '@chakra-ui/react'
import { useState } from 'react'
import { getStorage, ref } from 'firebase/storage'

const AddPhotoModal: React.FC<any> = ({}) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const storage = getStorage()
	const storageRef = ref(storage)

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<Flex>
			<Modal onClose={onClose} isOpen={isOpen}>
				<ModalOverlay />
				<form onSubmit={onSubmit}>
					<ModalContent maxW='40rem'>
						<ModalHeader>Add Photo to Shared Chore</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Stack direction={'column'} spacing={2}></Stack>
						</ModalBody>
						<ModalFooter>
							<Button colorScheme={'purple'} type='submit'>
								Update Chore
							</Button>
							<Button
								ml={3}
								variant={'outline'}
								colorScheme={'red'}
								type='submit'
							>
								Delete Chore
							</Button>
							<Spacer />
							<Button onClick={onClose}>Close</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</Flex>
	)
}

export default AddPhotoModal
