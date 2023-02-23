import React from 'react'
import SocialTile from '@/src/components/SocialTile'
import { Box, Center, Grid } from '@chakra-ui/react'
import SocialTileProps from '@/src/interfaces/SocialTileInterface'

const socialTiles: Array<SocialTileProps> = [
	{
		finishedDate: '9/30',
		choreTitle: 'Took over the entire world together :^)',
		// choreTitle: "Just got married :)",
		image: '../us.jpg',
		imageAlt: 'The happy couple',
		choreStory: 'We got married in the mountains. It was a beautiful day.',
	},
	{
		finishedDate: '9/30',
		choreTitle: 'Took over the entire world together :^)',
		// choreTitle: "Just got married :)",
		image: '../us.jpg',
		imageAlt: 'The happy couple',
		choreStory: 'We got married in the mountains. It was a beautiful day.',
	},
	{
		finishedDate: '9/30',
		choreTitle: 'Took over the entire world together :^)',
		// choreTitle: "Just got married :)",
		// image: "../us.jpg",
		// imageAlt: "The happy couple",
		choreStory: 'We got married in the mountains. It was a beautiful day.',
	},
]

interface FeedProps {}

const Feed: React.FC<FeedProps> = () => {
	return (
		<Center>
			<Box>
				<Grid templateColumns='repeat(2, 1fr)' gap={6} mx={10}>
					{socialTiles.map((tile) => (
						<SocialTile key={tile.choreTitle} {...tile} />
					))}
				</Grid>
			</Box>
		</Center>
	)
}

export default Feed
