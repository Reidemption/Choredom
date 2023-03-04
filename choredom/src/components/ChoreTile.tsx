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
import EditChoreModal from './chore/EditChore'

// TODO: Update the chore as done after 2 seconds?

const ChoreTile: React.FC<any> = ({
	finishChore,
	deleteChore,
	editChore,
	props,
	checked,
}) => {
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
				<Checkbox
					w='10%'
					isChecked={checked}
					onChange={() => finishChore(props.isDone, props.id)}
				></Checkbox>
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
					<Stack direction='column'>
						<Text fontSize={'sm'}>{props.Description}</Text>
						<Text fontSize={'xs'} fontWeight='bold'>
							{props.Location}
						</Text>
					</Stack>
				</Box>
				<EditChoreModal
					props={props}
					handleEditChore={editChore}
					handleDeleteChore={deleteChore}
				/>
			</Flex>
		</Flex>
	)
}

export default ChoreTile
