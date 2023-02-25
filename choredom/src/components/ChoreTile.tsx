import {
	Box,
	Center,
	Checkbox,
	Flex,
	Icon,
	IconButton,
	Stack,
	Spacer,
	HStack,
	Text,
	VStack,
	Button,
} from '@chakra-ui/react'
import React from 'react'
import ChoreTileProps from '../interfaces/ChoreTileInterface'
import { AiOutlineEdit } from 'react-icons/ai'
import { doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../firebase/clientApp'

// TODO: Update the chore as done after 2 seconds.
// TODO: Update portions of the chore. (i.e. change the date)
// TODO: Make location not required. Show location if it exists.

const EditChore: React.FC<any> = () => {
	return <Icon as={AiOutlineEdit} boxSize={4} />
}

const ChoreTile: React.FC<any> = ({ finishChore, editChore, props }) => {
	const id = props?.id

	return (
		<Flex
			align='center'
			justify='center'
			border={'2px'}
			borderColor={'blackAlpha.400'}
			w={'55vh'}
			bg={'white'}
		>
			<Flex w='100%' m={5}>
				<Checkbox w='10%' onChange={() => finishChore(id)}></Checkbox>
				{/* <Button onClick={finishChore(id)}></Button> */}
				<Spacer />
				<HStack spacing={3} w='35%'>
					<VStack spacing={0} align='start'>
						<Text mt={0}>{props.Name}</Text>
						<Text>
							Due:
							<span> {props.Date}</span>
						</Text>
						<Text textAlign={'center'} as='i'>
							{props.Frequency}
						</Text>
					</VStack>
				</HStack>
				<Spacer />
				<Box width={'50%'}>
					<Text fontSize={'sm'}>{props.Description}</Text>
				</Box>
				<IconButton
					aria-label='Edit chore'
					size='xs'
					icon={<EditChore />}
					onClick={() => editChore}
				/>
			</Flex>
		</Flex>
	)
}

export default ChoreTile
