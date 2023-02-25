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
import { AiOutlineEdit } from 'react-icons/ai'

const EditChore: React.FC<any> = () => {
	return <Icon as={AiOutlineEdit} boxSize={4} />
}

const EditChoreModal: React.FC<any> = ({
	onSubmit,
	handleEditChore,
	handleDeleteChore,
	loading,
	props,
}) => {
	const id = props?.id
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [choreForm, setChoreForm] = useState({
		Name: props.Name,
		Date: props.Date,
		repeated: props.repeated,
		Location: props.Location,
		Frequency: props.Frequency,
		Description: props.Description,
		isDone: false,
	})

	const resetChoreForm = () => {
		setChoreForm({
			Name: props.Name,
			Date: props.Date,
			repeated: props.repeated,
			Location: props.Location,
			Frequency: props.Frequency,
			Description: props.Description,
			isDone: false,
		})
		onClose()
	}

	const onChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		setChoreForm({ ...choreForm, [e.target.name]: e.target.value })
	}

	return (
		<Flex>
			<IconButton
				aria-label='Edit chore'
				size='xs'
				icon={<EditChore />}
				onClick={onOpen}
			/>

			<Modal onClose={onClose} isOpen={isOpen}>
				<ModalOverlay />
				<form onSubmit={onSubmit}>
					<ModalContent maxW='40rem'>
						<ModalHeader>Edit Chore</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Stack direction={'column'} spacing={2}>
								<FormControl isRequired>
									<FormLabel mb={0}>Chore Name</FormLabel>
									<Input
										id='Name'
										name='Name'
										onChange={onChange}
										value={choreForm.Name}
									/>
								</FormControl>
								<Stack direction='row' alignItems={'center'}>
									<FormControl isRequired>
										<FormLabel mb={0}>Chore Date</FormLabel>
										<Input
											value={choreForm.Date}
											id='Date'
											name='Date'
											onChange={onChange}
											type='date'
										/>
									</FormControl>
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
										id='Location'
										name='Location'
										onChange={onChange}
										value={choreForm.Location}
									/>
								</FormControl>
								<FormControl>
									<FormLabel mb={0}>Chore Description</FormLabel>
									<Textarea
										value={choreForm.Description}
										id='Description'
										name='Description'
										onChange={onChange}
									/>
								</FormControl>
								{/* {formError && (
								<Text color='red.500' fontSize='sm'>
									{formError}
								</Text>
							)} */}
							</Stack>
						</ModalBody>
						<ModalFooter>
							<Button
								colorScheme={'purple'}
								type='submit'
								isLoading={loading}
								onClick={() => {
									handleEditChore()
									onClose
								}}
							>
								Create Chore
							</Button>
							<Button
								ml={3}
								variant={'outline'}
								colorScheme={'red'}
								type='submit'
								isLoading={loading}
								onClick={() => {
									handleDeleteChore()
									onClose
								}}
							>
								Delete Chore
							</Button>
							<Spacer />
							<Button onClick={resetChoreForm}>Close</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</Flex>
	)
}

export default EditChoreModal
