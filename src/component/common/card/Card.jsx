import { StarIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Image,
  Spacer,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useReducer, useState } from 'react';
import { BiLike } from 'react-icons/bi';

import CustomizeTooltip from '../tooltip/CustomizeTooltip';

const Card = ({
  poster_path,
  date,
  title,
  vote_average,
  vote_count,
  popularity,
  origin_country,
}) => {
  const [statusLike, setStatusLike] = useState(false);
  const [statusFavorite, setStatusFavorite] = useState(false);

  const bgLikeColor = useColorModeValue(
    statusLike ? 'teal.200' : 'gray.200',
    statusLike ? 'teal.700' : 'gray.700'
  );
  const bgFavoriteColor = useColorModeValue(
    statusFavorite ? 'orange.200' : 'gray.200',
    statusFavorite ? 'orange.700' : 'gray.700'
  );

  const backgroundColor = useColorModeValue('gray.200', 'gray.700');

  const voteCountColor = findVoteCountColor(vote_count);
  const voteAvgColor = findVoteAvgColor(vote_average);
  const popularityColor = findPopularityColor(popularity);

  const gradient = `linear(to-br, ${bgFavoriteColor} 0%, ${backgroundColor} 40%, ${backgroundColor} 60%, ${bgLikeColor} 90%)`;

  const handleLike = e => {
    setStatusLike(!statusLike);
  };
  const handleFavorite = () => {
    setStatusFavorite(!statusFavorite);
  };
  return (
    <Flex
      bgGradient={gradient}
      borderRadius={'md'}
      boxShadow={'md'}
      padding={4}
      gap={2}
      flexDirection="column"
      height={'full'}
      justifyContent={'space-between'}
    >
      <Text fontSize={'lg'} fontWeight={'bold'}>
        {title}
      </Text>
      <Flex gap={2} alignContent={'stretch'} height={'full'}>
        <Flex
          flexDirection={'column'}
          flex={1}
          justifyContent={'space-between'}
          gap={2}
        >
          <Image
            fallback={<Box textAlign={'center'}>No image available</Box>}
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            alt={'poster'}
            borderRadius={'base'}
            boxShadow={'md'}
            htmlWidth={'full'}
          />
          <Badge
            padding={2}
            colorScheme={'gray'}
            textAlign={'center'}
            fontSize={'md'}
            fontWeight={'bold'}
          >
            {new Date(date).toLocaleDateString()}
          </Badge>
        </Flex>
        <Flex flexDirection={'column'} gap={2}>
          <CustomizeTooltip message={'Number of votes'}>
            <Badge
              textAlign={'center'}
              fontSize={'lg'}
              variant={'subtle'}
              padding={2}
              borderRadius={'lg'}
              boxShadow={'md'}
              textTransform={'none'}
              colorScheme={voteCountColor}
            >
              {vote_count}
            </Badge>
          </CustomizeTooltip>

          <CustomizeTooltip message={'Rating'}>
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
          </CustomizeTooltip>

          <CustomizeTooltip message={'Popularity'}>
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
          </CustomizeTooltip>

          {origin_country.length !== 0 && (
            <CustomizeTooltip message={'Origin Country'}>
              <Badge
                textAlign={'center'}
                fontSize={'lg'}
                variant={'subtle'}
                colorScheme={'gray'}
                padding={2}
                borderRadius={'lg'}
                boxShadow={'md'}
              >
                {origin_country.toString()}
              </Badge>
            </CustomizeTooltip>
          )}

          <Spacer />

          <ButtonGroup display={{ lg: 'block', base: 'none' }}>
            <CustomizeTooltip message={'Like if you love it'}>
              <IconButton
                icon={<BiLike />}
                colorScheme={'teal'}
                boxShadow={'md'}
                variant={statusLike ? 'solid' : 'outline'}
                onClick={handleLike}
              />
            </CustomizeTooltip>
            <CustomizeTooltip message={'Add to favorite list'}>
              <IconButton
                icon={<StarIcon />}
                colorScheme={'orange'}
                boxShadow={'md'}
                variant={statusFavorite ? 'solid' : 'outline'}
                onClick={handleFavorite}
              />
            </CustomizeTooltip>
          </ButtonGroup>

          <CustomizeTooltip message={'Like if you love it'}>
            <Button
              leftIcon={<BiLike />}
              colorScheme={'teal'}
              display={{
                lg: 'none',
                md: 'initial',
                sm: 'initial',
                base: 'none',
              }}
              boxShadow={'md'}
              variant={statusLike ? 'solid' : 'outline'}
              onClick={handleLike}
            >
              Like
            </Button>
          </CustomizeTooltip>

          <CustomizeTooltip message={'Add to favorite list'}>
            <Button
              leftIcon={<StarIcon />}
              colorScheme={'orange'}
              display={{
                lg: 'none',
                md: 'initial',
                sm: 'initial',
                base: 'none',
              }}
              boxShadow={'md'}
              variant={statusFavorite ? 'solid' : 'outline'}
              onClick={handleFavorite}
            >
              Favorite
            </Button>
          </CustomizeTooltip>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Card;

const findVoteCountColor = value =>
  value < 100
    ? 'red'
    : value < 200
    ? 'yellow'
    : value < 300
    ? 'green'
    : 'purple';

const findVoteAvgColor = value =>
  value < 5 ? 'red' : value < 8 ? 'green' : 'purple';

const findPopularityColor = value =>
  value < 500 ? 'red' : value < 1000 ? 'green' : 'purple';
