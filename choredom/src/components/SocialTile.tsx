import React, { useEffect, useState } from "react";

import {
  Box,
  Center,
  Flex,
  Image,
  Spacer,
  Text,
  VStack,
  Stack,
} from "@chakra-ui/react";
import SocialTileProps from "../interfaces/SocialTileInterface";
import { useMediaQuery } from '@chakra-ui/media-query'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { Timestamp } from "firebase/firestore";


const SocialTile: React.FC<any> = (props) => {
  const storage = getStorage()
  const [imageURL, setImageURL] = useState('')

  const timestamp = new Timestamp(
		props.props.finishedDate.seconds,
		props.props.finishedDate.nanoseconds
	)
	const date = timestamp.toDate()
  const formattedDate = date.toLocaleString()
  const goodDate = formattedDate.split(',')[0]
  
  useEffect(() => {
		const gsReference = ref(storage, props.props.image)

		getDownloadURL(gsReference).then((url) => {
			setImageURL(url)
		})
	}, [])


  const [isSmallScreen] = useMediaQuery('(max-width: 768px)')

  if (!imageURL) {
    return (
      <Flex
        m={5}
        align="center"
        justify="center"
        border={"1px"}
        borderColor={"blackAlpha.400"}
        maxWidth={600}
      >
        <Stack direction="column" align='center' >
          <Flex my='4'>
            <Text textAlign={'center'} fontSize={'xs'} w={125}>
              {props.props.caption}
            </Text>
          </Flex>
        </Stack>
      </Flex>
    )
  }

  if (isSmallScreen) {
    return (
			<Flex
				m={5}
				align='center'
				justify='center'
				border={'1px'}
				borderColor={'blackAlpha.400'}
				maxWidth={600}
				minH={300}
			>
				<Stack direction='column' align='center'>
					{imageURL && (
						<Image
							src={imageURL}
							alt={props.props.imageAlt}
							p={5}
							w={400}
							h={300}
							objectFit='cover'
						/>
					)}
					<Flex pb='4'>
						<Text textAlign={'center'} fontSize={'xs'} w={125}>
							{props.props.caption}
						</Text>
					</Flex>
				</Stack>
			</Flex>
		)
  }

  return (
		<Flex
			m={5}
			align='center'
			justify='center'
			border={'1px'}
			borderColor={'blackAlpha.400'}
			maxWidth={600}
			minH={300}
		>
			<Center>
				{imageURL && (
					<Image
						src={imageURL}
						alt={props.props.imageAlt}
						p={10}
						w={400}
						h={300}
						objectFit='cover'
					/>
				)}
			</Center>
			<Spacer />
			<VStack align='center' justify='center' spacing={1} pr={5} maxW={200}>
				<Text textAlign={'center'}>{props.props.title}</Text>
				<Box
					color='gray.500'
					fontWeight='semibold'
					letterSpacing='wide'
					fontSize='xs'
					ml='2'
				>
					{goodDate}
				</Box>
				<Text textAlign={'center'} fontSize={'xs'} w={125}>
					{props.props.caption}
				</Text>
			</VStack>
		</Flex>
	)
};

export default SocialTile;
