import { StarIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Image,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BiLike } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  removeFavorites,
  removeLikes,
  updateFavorites,
  updateLikes,
} from '../../../redux/slices/filmSlice';

import CustomizeTooltip from '../tooltip/CustomizeTooltip';

const Card = ({
  id,
  poster_path,
  date,
  title,
  vote_average,
  vote_count,
  popularity,
  country,
  countryDesc,
  variant,
  currentStatusLike,
  currentStatusFavorite,
}) => {
  const [statusLike, setStatusLike] = useState(false);
  const [statusFavorite, setStatusFavorite] = useState(false);
  const [shadowStatus, setShadowStatus] = useState(false);
  const dispatch = useDispatch();

  const shadow1 = useColorModeValue(
    'md',
    '0 4px 6px -1px rgba(44, 82, 130, 0.1),0 2px 4px -1px rgba(44, 82, 130, 0.06)'
  );
  const shadow2 = useColorModeValue(
    'dark-lg',
    'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(43, 108, 176, 0.2) 0px 5px 10px,rgba(43, 108, 176, 0.4) 0px 15px 40px;'
  );

  useEffect(() => {
    setStatusLike(currentStatusLike);
    setStatusFavorite(currentStatusFavorite);
  }, [currentStatusFavorite, currentStatusLike]);

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
    if (!statusLike === true) {
      dispatch(updateLikes({ id, variant }));
    } else {
      dispatch(removeLikes({ id, variant }));
    }
  };
  const handleFavorite = () => {
    setStatusFavorite(!statusFavorite);
    if (!statusFavorite === true) {
      dispatch(updateFavorites({ id, variant }));
    } else {
      dispatch(removeFavorites({ id, variant }));
    }
  };
  return (
    <LinkBox>
      <Flex
        bgGradient={gradient}
        borderRadius={'md'}
        boxShadow={shadowStatus ? shadow2 : shadow1}
        padding={4}
        gap={2}
        flexDirection="column"
        height={'full'}
        justifyContent={'space-between'}
        onMouseEnter={() => {
          setShadowStatus(true);
        }}
        onMouseLeave={() => {
          setShadowStatus(false);
        }}
        transition={'0.4s linear'}
      >
        <LinkOverlay
          as={Link}
          to={{
            pathname: '/details',
            search: `?id=${id}`,
          }}
        >
          <Text fontSize={'lg'} fontWeight={'bold'}>
            {title}
          </Text>
        </LinkOverlay>
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

            {country && country.length !== 0 && (
              <CustomizeTooltip message={countryDesc}>
                <Badge
                  textAlign={'center'}
                  fontSize={'lg'}
                  variant={'subtle'}
                  colorScheme={'gray'}
                  padding={2}
                  borderRadius={'lg'}
                  boxShadow={'md'}
                >
                  {country.toString()}
                </Badge>
              </CustomizeTooltip>
            )}

            <Spacer />

            <ButtonGroup
              display={{ lg: 'block', md: 'none', sm: 'none', base: 'block' }}
            >
              <CustomizeTooltip message={statusLike ? 'Unlike it' : 'Like it'}>
                <IconButton
                  icon={<BiLike />}
                  colorScheme={'teal'}
                  boxShadow={'md'}
                  onClick={handleLike}
                  variant={statusLike ? 'solid' : 'outline'}
                  borderWidth={1}
                  borderColor={statusLike ? 'transparent' : 'auto'}
                />
              </CustomizeTooltip>
              <CustomizeTooltip
                message={statusFavorite ? 'Unfavorite it' : 'Favorite it'}
              >
                <IconButton
                  icon={<StarIcon />}
                  colorScheme={'orange'}
                  boxShadow={'md'}
                  onClick={handleFavorite}
                  variant={statusFavorite ? 'solid' : 'outline'}
                  borderWidth={1}
                  borderColor={statusFavorite ? 'transparent' : 'auto'}
                />
              </CustomizeTooltip>
            </ButtonGroup>

            <CustomizeTooltip message={statusLike ? 'Unlike it' : 'Like it'}>
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
                onClick={handleLike}
                variant={statusLike ? 'solid' : 'outline'}
                borderWidth={1}
                borderColor={statusLike ? 'transparent' : 'auto'}
              >
                Like
              </Button>
            </CustomizeTooltip>

            <CustomizeTooltip
              message={statusFavorite ? 'Unfavorite it' : 'Favorite it'}
            >
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
                borderWidth={1}
                borderColor={statusFavorite ? 'transparent' : 'auto'}
              >
                Favorite
              </Button>
            </CustomizeTooltip>
          </Flex>
        </Flex>
      </Flex>
    </LinkBox>
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
