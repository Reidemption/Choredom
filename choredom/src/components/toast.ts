import { useToast } from '@chakra-ui/react'

type setStatus = 'success' | 'info' | 'warning' | 'error'

interface Itoast {
	message: string
	type: setStatus
}

export const CustomToast = () => {
	const toast = useToast()

	const addToast = (newRes : Itoast) => {
		toast({
			description: newRes.message,
			status: newRes.type,
			position: 'bottom',
			isClosable: true,
			duration: 5000,
		})
	}

	return { addToast }
}
