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
	Input,
	Spacer,
	useDisclosure,
	Flex,
	Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { firestore } from '@/src/firebase/clientApp'
import { doc, updateDoc, runTransaction } from 'firebase/firestore'
import { useRecoilState } from 'recoil'
import { userState } from '@/src/atom/atoms'

const AddPhotoModal: React.FC<any> = ({chore}) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [currentUser, setCurrentUser] = useRecoilState(userState)
	const storage = getStorage()
	const [caption, setCaption] = useState(chore.Description)

	const [selectedImage, setSelectedImage] = useState(null)

	const handleImageChange = (e: any) => {
		setSelectedImage(e.target.files[0])
	}

	const handleUploadImage = async () => {
		if (!currentUser) return
		let timestamp : number;

		await runTransaction(firestore, async (transaction) => { 

				if (selectedImage) {
					timestamp = Date.now()
		
					const imageRef = ref(storage, `${timestamp}.jpg`)
			
					uploadBytes(imageRef, selectedImage).then((snapshot) => {
					})
				}
				await handleShareChore(timestamp, transaction)
		 })

		onClose()
	}

	const handleShareChore = async (timestamp : number | undefined, transaction: any) => {
		if (!chore.shared) return

		// Update the existing chore as finished
		const choreRef = doc(firestore, 'chores', chore.id)

		// Create a "shared chore" document, similar to the friendships collection with the id of the collection being the user id
		const sharedChoreRef = doc(firestore, 'sharedChores', currentUser!.uid)
		const sharedChoreSearch = await transaction.get(sharedChoreRef)
		interface sc {
			id: string,
			finishedDate: Date,
			title: string,
			caption: string,
			image?: string,
			imageAlt?: string,
		}
		let sharedChore = {
			id: chore.id,
			finishedDate: new Date(),
			title: chore.Name,
			caption: caption, //check this over
			// imageAlt: chore.Name + " " + chore.Description, 
		} as sc
		if (timestamp) {
			sharedChore['image'] = `gs://choredom-fafe4.appspot.com/${timestamp}.jpg`
			sharedChore['imageAlt'] = chore.Name + " " + chore.Description
		}

		if (!sharedChoreSearch.exists() || !sharedChoreSearch.data()?.sharedChores) {
			// If the document doesn't exist, create it.
			transaction.set(sharedChoreRef, { sharedChores: [sharedChore] })
		} else {
			transaction.update(sharedChoreRef, {
				sharedChores: [...sharedChoreSearch.data()?.sharedChores, sharedChore],
			})
		}
		transaction.update(choreRef, {
			isDone: !chore.isDone,
		})
	}

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
		setCaption(event.target.value)
	 }

	return (
		<Flex>
			<Checkbox
				pr={'5'}
				w='10%'
				isChecked={chore.checked}
				onChange={() => onOpen()}
			></Checkbox>
			<Modal onClose={onClose} isOpen={isOpen}>
				<ModalOverlay />
				<ModalContent maxW='40rem'>
					<ModalHeader>Finalize Shared Chore Info</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>
							Chore Title: <span>{chore.Name}</span>
						</Text>
						<Text mb='-2' mt='1'>Caption:</Text>
						<Input
							my='2'
							id='caption'
							name='caption'
							onChange={onChange}
							placeholder={chore.Description}
							value={caption}
						/>
						<Input mb='2' pt='1' type='file' onChange={handleImageChange} variant='unstyled' />
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme={'purple'}
							type='submit'
							onClick={handleUploadImage}
						>
							Share Chore
						</Button>
						<Spacer />
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	)
}

export default AddPhotoModal
