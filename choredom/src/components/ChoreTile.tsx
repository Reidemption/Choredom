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
// TODO: Update portions of the chore. (i.e. change the date)

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
				<EditChoreModal props={props} />
			</Flex>
		</Flex>
	)
}

export default ChoreTile
