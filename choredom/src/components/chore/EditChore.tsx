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
	handleEditChore,
	handleDeleteChore,
	loading,
	props,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [choreForm, setChoreForm] = useState({
		Name: props.Name,
		Date: props.Date,
		repeated: props.repeated,
		Location: props.Location,
		Frequency: props.Frequency,
		Description: props.Description,
		isDone: false,
		shared: false,
	})

	const resetChoreForm = () => {
		setChoreForm({
			Name: props.Name,
			Date: props.Date,
			repeated: props.repeated,
			Location: props.Location,
			Frequency: props.Frequency,
			Description: props.Description,
			isDone: props.isDone,
			shared: props.shared,
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

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleEditChore(choreForm)
	}

	const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.checked)
		setChoreForm({ ...choreForm, repeated: e.target.checked })
	}

	const onShareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.checked)
		setChoreForm({ ...choreForm, shared: e.target.checked })
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
								<Checkbox
									pt={1}
									id='shared'
									name='shared'
									onChange={onShareChange}
									isChecked={choreForm.shared}
								>
									Share Upon Completion?
								</Checkbox>
							</Stack>
						</ModalBody>
						<ModalFooter>
							<Button
								colorScheme={'purple'}
								type='submit'
								isLoading={loading}
								onClick={() => {
									handleEditChore(choreForm, props.id)
									onClose()
								}}
							>
								Update Chore
							</Button>
							<Button
								ml={3}
								variant={'outline'}
								colorScheme={'red'}
								type='submit'
								isLoading={loading}
								onClick={() => {
									handleDeleteChore(props.id)
									onClose()
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
