import {
	Box,
	Center,
	Divider,
	Flex,
	Image,
	Stack,
	Text,
	Spacer,
	Input,
	InputGroup,
	Button,
	InputRightElement,
	HStack,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Link,
	ButtonGroup,
} from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { Router, useRouter } from 'next/router'
import { auth } from '../firebase/clientApp'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { FIREBASE_ERRORS } from '../firebase/errors'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState } from 'recoil'

export default function Home() {
	const router = useRouter()
	const [show, setShow] = React.useState(false)
	const handleClick = () => setShow(!show)

	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth)

	const [validUser, loadingUser, errorAuth] = useAuthState(auth)

	useEffect(() => {
		if (validUser) {
			console.log('validUser', typeof validUser, validUser)
			// setgUser((prev) => ({ ...prev, uid: validUser?.uid, email: validUser?.email }));
			router.push('/chores')
		}
	}, [])

	const [loginForm, setLoginForm] = React.useState({
		email: '',
		password: '',
	})

	// Firebase Logic next
	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		signInWithEmailAndPassword(loginForm.email, loginForm.password)
		// TODO: need to make sure a user is presented.
		if (!error) {
			router.push('/chores')
		}
	}

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLoginForm((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}))
	}

	return (
		<Flex align={'center'} justify={'center'}>
			<Center w={{ base: '50%', md: '100%' }}>
				<Stack align='center' justify='center'>
					<Text fontSize='5xl'>Choredom</Text>
					<Image
						w={{ base: '50%', md: '500px' }}
						h={{ base: '50%', md: '500px' }}
						src='/chore_list.svg'
						alt='Man showing off his chores list'
					/>
				</Stack>
			</Center>
			<Spacer />
			<Center w={{ base: '50%', md: '100%' }}>
				<Box rounded={'lg'} boxShadow={'lg'} p={8} bg={'white'}>
					<Stack spacing={4}>
						<form id='signIn' onSubmit={onSubmit}>
							<FormLabel>Email address</FormLabel>
							<Input
								required
								id='email'
								type='email'
								name='email'
								onChange={onChange}
							/>
							<FormErrorMessage>Email is required.</FormErrorMessage>
							<FormLabel mt='3'>Password</FormLabel>
							<InputGroup size='md'>
								<Input
									required
									id='password'
									name='password'
									onChange={onChange}
									pr='4.5rem'
									type={show ? 'text' : 'password'}
								/>
								<InputRightElement width='4.5rem'>
									<Button h='1.75rem' size='sm' onClick={handleClick}>
										{show ? 'Hide' : 'Show'}
									</Button>
								</InputRightElement>
							</InputGroup>
							<FormErrorMessage>Password is required.</FormErrorMessage>
							<Stack spacing={5}>
								<Link color={'blue.400'}>Forgot password?</Link>
								<Text textAlign={'center'} color='red.500'>
									{
										FIREBASE_ERRORS[
											error?.message as keyof typeof FIREBASE_ERRORS
										]
									}
								</Text>
								<Button
									isLoading={loading}
									type='submit'
									colorScheme='purple'
									variant='outline'
								>
									Sign in
								</Button>
								<Divider />
								<Button
									colorScheme='purple'
									onClick={() => router.push('/register')}
								>
									<Link href='/register'>Create Account</Link>
								</Button>
							</Stack>
						</form>
					</Stack>
				</Box>
			</Center>
		</Flex>
	)
}
