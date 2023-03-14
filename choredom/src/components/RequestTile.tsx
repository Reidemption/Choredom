import { Flex, Stack, Spacer, Button, Text } from '@chakra-ui/react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { firestore } from '../firebase/clientApp'
import React, { useEffect } from 'react'

const RequestTile: React.FC<any> = ({
	request,
	acceptRequest,
	rejectRequest,
	loading,
}) => {
	const [senderInfo, setSenderInfo] = React.useState<any>(null)
	const getSenderInfo = async () => {
		const senderDoc = await getDoc(doc(firestore, 'users', request?.friend_id))
		if (senderDoc.data()) {
			setSenderInfo(senderDoc?.data()?.displayName || senderDoc?.data()?.email)
		}
	}

	useEffect(() => {
		async function sender() {
			await getSenderInfo()
		}
		sender()
	}, [])
	return (
		<Flex
			border={'1px'}
			borderColor={'gray'}
			borderRadius={'md'}
			p={4}
			mb={4}
			w={'full'}
			alignItems={'center'}
			justifyContent={'space-between'}
		>
			<Stack direction={'column'}>
				{senderInfo && <Text fontWeight={'bold'}>{senderInfo}</Text>}
				<Text>{request.status}</Text>
			</Stack>
			<Spacer />
			<Stack direction={'row'}>
				{request.status != 'accepted' && (
					<Button
						colorScheme={'green'}
						isLoading={loading}
						onClick={() => {
							acceptRequest(request)
						}}
					>
						Accept
					</Button>
				)}
				{request.status != 'rejected' && (
					<Button
						colorScheme={'red'}
						isLoading={loading}
						onClick={() => {
							rejectRequest(request)
						}}
					>
						Reject
					</Button>
				)}
			</Stack>
		</Flex>
	)
}

export default RequestTile
