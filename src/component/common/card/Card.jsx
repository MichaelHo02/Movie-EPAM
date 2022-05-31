import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Center,
  Circle,
  Flex,
  Heading,
  IconButton,
  Image,
  Tag,
  TagLabel,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { BiLike } from 'react-icons/bi';

import React from 'react';

const Card = ({
  poster_path,
  date,
  title,
  vote_average,
  vote_count,
  popularity,
  origin_country,
}) => {
  const backgroundColor = useColorModeValue('gray.200', 'gray.600');
  const voteCountColor =
    vote_count < 100
      ? 'red'
      : vote_count < 200
      ? 'yellow'
      : vote_count < 300
      ? 'green'
      : 'purple';
  const voteAvgColor =
    vote_average < 5 ? 'red' : vote_average < 8 ? 'green' : 'purple';

  const popularityColor =
    popularity < 500 ? 'red' : popularity < 1000 ? 'green' : 'purple';
  return (
    <Box
      backgroundColor={backgroundColor}
      borderRadius={'md'}
      boxShadow={'md'}
      padding={4}
      gap={2}
    >
      <Text fontSize={'lg'} fontWeight={'bold'}>
        {title}
      </Text>
      <Flex gap={2}>
        <Flex flexDirection={'column'} gap={2} flex={1}>
          <Image
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            alt={'poster'}
            borderRadius={'base'}
            boxShadow={'md'}
            minWidth={'full'}
          />
          <Badge
            padding={2}
            colorScheme={'gray'}
            textAlign={'center'}
            fontSize={'md'}
            fontWeight={'bold'}
          >
            {new Date(date).toDateString()}
          </Badge>
        </Flex>
        <Flex flexDirection={'column'} gap={2}>
          <IconButton icon={<BiLike />} colorScheme={'teal'} />
          <IconButton
            icon={<StarIcon />}
            colorScheme={'orange'}
            display={{ lg: 'initial', md: 'none' }}
          />
          <Button
            leftIcon={<StarIcon />}
            colorScheme={'orange'}
            display={{ lg: 'none', md: 'initial', sm: 'none', base: 'none' }}
          >
            Favorite
          </Button>
          <Badge
            textAlign={'center'}
            fontSize={'lg'}
            variant={'subtle'}
            colorScheme={voteCountColor}
            padding={2}
            borderRadius={'lg'}
            boxShadow={'md'}
            textTransform={'none'}
          >
            {vote_count}
          </Badge>
          <Badge
            textAlign={'center'}
            fontSize={'lg'}
            variant={'subtle'}
            colorScheme={voteAvgColor}
            padding={2}
            borderRadius={'lg'}
            boxShadow={'md'}
            textTransform={'none'}
          >
            {vote_average} / 10
          </Badge>
          <Badge
            textAlign={'center'}
            fontSize={'lg'}
            variant={'subtle'}
            colorScheme={popularityColor}
            padding={2}
            borderRadius={'lg'}
            boxShadow={'md'}
          >
            {popularity.toFixed(2)}
          </Badge>
          {/* <Box>{origin_country.toString()}</Box> */}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Card;
