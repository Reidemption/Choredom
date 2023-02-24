import {
	Box,
	Center,
	Checkbox,
	Flex,
	Stack,
	Spacer,
	HStack,
	Text,
	VStack,
} from '@chakra-ui/react'
import React from 'react'
import ChoreTileProps from '../interfaces/ChoreTileInterface'

// TODO: Update the chore as done

const ChoreTile: React.FC<any> = (props) => {
	return (
		<Flex
			align='center'
			justify='center'
			border={'1px'}
			borderColor={'blackAlpha.400'}
			w={500} //Make this responsive
			bg={'white'}
		>
			<Flex w='100%' m={5}>
				<Checkbox colorScheme='purple' w='10%'></Checkbox>
				<Spacer />
				<HStack spacing={3} w='35%'>
					<VStack spacing={0}>
						<Text>{props.Date}</Text>
						<Text mt={0}>{props.Name}</Text>
						<Text textAlign={'center'} as='i'>
							{props.Frequency}
						</Text>
					</VStack>
				</HStack>
				<Spacer />
				<Box width={'50%'}>
					<Text fontSize={'sm'}>{props.Description}</Text>
				</Box>
			</Flex>
		</Flex>
	)
}

export default ChoreTile
