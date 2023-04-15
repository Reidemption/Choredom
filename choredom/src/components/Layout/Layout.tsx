import React, { ReactNode, ReactText } from 'react'
import {
	IconButton,
	Box,
	CloseButton,
	Flex,
	Icon,
	useColorModeValue,
	Link,
	Drawer,
	DrawerContent,
	Text,
	useDisclosure,
	BoxProps,
	Spacer,
	FlexProps,
} from '@chakra-ui/react'
import {
	FiTrendingUp,
	FiMenu,
	FiUser,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import VerticallyCenter from './ChoreModal'
import { BsFillPersonPlusFill } from 'react-icons/bs'
import { IoPerson } from 'react-icons/io5'
import { useMediaQuery } from '@chakra-ui/media-query'

interface LinkItemProps {
	name: string
	icon: IconType
	link?: string
}
const LinkItems: Array<LinkItemProps> = [
	{ name: 'Chores', icon: IoPerson, link: '/chores' },
	{ name: 'Social Feed', icon: FiTrendingUp, link: '/social' },
	{ name: 'Connect', icon: BsFillPersonPlusFill, link: '/connect' },
]

export default function SimpleSidebar({ children }: { children: ReactNode }) {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: 'none', md: 'block' }}
			/>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement='left'
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size='full'
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p='4'>
				{children}
			</Box>
		</Box>
	)
}

interface SidebarProps extends BoxProps {
	onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [isSmallScreen] = useMediaQuery('(max-width: 768px)')

	return (
		<Box
			bg={useColorModeValue('white', 'gray.900')}
			borderRight='1px'
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			w={{ base: 'full', md: 60 }}
			pos='fixed'
			h='full'
			{...rest}
		>
			<Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
				<Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
					Choredom
				</Text>
				<CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
			</Flex>
			{LinkItems.map((link) => (
				<NavItem key={link.name} icon={link.icon} link={link.link}>
					{link.name}
				</NavItem>
			))}
			<VerticallyCenter />
			<Spacer />
			<Link
				href='/my-account'
				style={{ textDecoration: 'none' }}
				_focus={{ boxShadow: 'none' }}
			>
				<Flex
					bottom={!isSmallScreen ? 4 : 20}
					left={0}
					position='absolute'
					width={'90%'}
					align='center'
					p='4'
					mx='3'
					borderRadius='lg'
					role='group'
					cursor='pointer'
					_hover={{
						bg: 'cyan.400',
						color: 'white',
					}}
				>
					<Icon
						mr='4'
						fontSize='16'
						_groupHover={{
							color: 'white',
						}}
						as={FiUser}
					/>
					My Account
				</Flex>
			</Link>
		</Box>
	)
}

interface NavItemProps extends FlexProps {
	icon: IconType
	children: ReactText
	link?: string
}
const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
	return (
		<Link
			href={link}
			style={{ textDecoration: 'none' }}
			_focus={{ boxShadow: 'none' }}
		>
			<Flex
				align='center'
				p='4'
				mx='4'
				borderRadius='lg'
				role='group'
				cursor='pointer'
				_hover={{
					bg: 'cyan.400',
					color: 'white',
				}}
				{...rest}
			>
				{icon && (
					<Icon
						mr='4'
						fontSize='16'
						_groupHover={{
							color: 'white',
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	)
}

interface MobileProps extends FlexProps {
	onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 24 }}
			height='20'
			alignItems='center'
			bg={useColorModeValue('white', 'gray.900')}
			borderBottomWidth='1px'
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
			justifyContent='flex-start'
			{...rest}
		>
			<IconButton
				variant='outline'
				onClick={onOpen}
				aria-label='open menu'
				icon={<FiMenu />}
			/>

			<Text fontSize='2xl' ml='8' fontFamily='monospace' fontWeight='bold'>
				Choredom
			</Text>
		</Flex>
	)
}
