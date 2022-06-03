import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import Holder from '../component/common/holder/Holder';
import CustomizeTooltip from '../component/common/tooltip/CustomizeTooltip';
import { getFilmInfo } from '../redux/selectors';
import { fetchMovie, fetchTV } from '../redux/slices/filmSlice';
import {
  findPopularityColor,
  findVoteAvgColor,
  findVoteCountColor,
} from '../utils/colorSelection';

const Film = () => {
  const [location] = useSearchParams();
  const dispatch = useDispatch();
  const film = useSelector(getFilmInfo).data.film;
  const [currentFilm, setCurrentFilm] = useState({});
  const id = location.get('id');
  const variant = location.get('variant');
  const bgFilm = useColorModeValue(
    'rgba(255,255,255,0.5)',
    'rgba(42, 67, 101,0.5)'
  );

  useEffect(() => {
    console.log(id);
    if (variant === 'tv') {
      dispatch(fetchTV(id));
    } else {
      dispatch(fetchMovie(id));
    }
  }, [dispatch, id, variant]);

  useEffect(() => {
    setCurrentFilm(film);
  }, [film]);

  const voteCountColor = findVoteCountColor(film.vote_count);
  const voteAvgColor = findVoteAvgColor(film.vote_average);
  const popularityColor = findPopularityColor(film.popularity);

  const name = variant === 'tv' ? film.name : film.title;
  const date = variant === 'tv' ? film.first_air_date : film.release_date;
  const dateDesc = variant === 'tv' ? 'First air date' : 'Release date';
  const country =
    variant === 'tv' ? film.origin_country : film.original_language;
  const countryDesc = variant === 'tv' ? 'Origin Country' : 'Original Language';
  console.log(currentFilm);
  return (
    <Holder
      padding={4}
      backgroundImage={
        currentFilm.backdrop_path &&
        `https://image.tmdb.org/t/p/original/${currentFilm.backdrop_path}`
      }
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
    >
      <Box>
        <Stack
          gap={2}
          borderRadius={'md'}
          alignContent={'stretch'}
          height={'full'}
          padding={6}
          direction={['column', 'column', 'row']}
          backdropFilter="blur(10px)"
          backgroundColor={bgFilm}
          boxShadow={'dark-lg'}
        >
          <Box flex={1} gap={2}>
            <Image
              fallback={<Box textAlign={'center'}>No image available</Box>}
              src={
                currentFilm.poster_path &&
                `https://image.tmdb.org/t/p/original${currentFilm.poster_path}`
              }
              alt={'poster'}
              borderRadius={'base'}
              boxShadow={'md'}
              htmlWidth={'full'}
            />
          </Box>
          <Flex
            flexDirection={'column'}
            gap={3}
            flex={2}
            alignItems={'stretch'}
          >
            <Flex alignItems={'center'} gap={2}>
              <Text fontSize={{ xl: '2xl', lg: 'xl' }} fontWeight={'bold'}>
                {name}
              </Text>
              <Badge padding={1} colorScheme={'teal'}>
                {currentFilm.status}
              </Badge>
            </Flex>
            <Stack direction={['column', 'row']} gap={2}>
              {date && (
                <CustomizeTooltip message={dateDesc}>
                  <Badge
                    padding={2}
                    colorScheme={'gray'}
                    textAlign={'center'}
                    fontSize={'md'}
                    fontWeight={'bold'}
                    borderRadius={'lg'}
                    flex={1}
                  >
                    {new Date(date).toLocaleDateString()}
                  </Badge>
                </CustomizeTooltip>
              )}
              {currentFilm.vote_count && (
                <CustomizeTooltip message={'Number of votes'}>
                  <Badge
                    textAlign={'center'}
                    fontSize={'lg'}
                    variant={'solid'}
                    padding={2}
                    borderRadius={'lg'}
                    boxShadow={'md'}
                    textTransform={'none'}
                    colorScheme={voteCountColor}
                    whiteSpace={'normal'}
                    wordBreak={'break-word'}
                    flex={1}
                  >
                    Voter: {currentFilm.vote_count}
                  </Badge>
                </CustomizeTooltip>
              )}
            </Stack>

            <Stack direction={['column', 'row']} gap={2}>
              {currentFilm.vote_average && (
                <CustomizeTooltip message={'Rating'}>
                  <Badge
                    textAlign={'center'}
                    fontSize={'lg'}
                    variant={'solid'}
                    colorScheme={voteAvgColor}
                    padding={2}
                    borderRadius={'lg'}
                    boxShadow={'md'}
                    textTransform={'none'}
                    whiteSpace={'normal'}
                    wordBreak={'break-word'}
                    flex={1}
                  >
                    Rate: {currentFilm.vote_average}
                  </Badge>
                </CustomizeTooltip>
              )}

              {currentFilm.popularity && (
                <CustomizeTooltip message={'Popularity'}>
                  <Badge
                    textAlign={'center'}
                    fontSize={'lg'}
                    variant={'solid'}
                    colorScheme={popularityColor}
                    padding={2}
                    borderRadius={'lg'}
                    boxShadow={'md'}
                    textTransform={'none'}
                    whiteSpace={'normal'}
                    wordBreak={'break-word'}
                    flex={1}
                  >
                    Popularity: {currentFilm.popularity.toFixed(2)}
                  </Badge>
                </CustomizeTooltip>
              )}
            </Stack>

            <Stack direction={['column', 'row']} gap={2}>
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
                    flex={1}
                  >
                    {country.toString()}
                  </Badge>
                </CustomizeTooltip>
              )}
              {console.log(currentFilm.homepage)}
              {currentFilm.homepage && (
                <Button
                  colorScheme={'orange'}
                  boxShadow={'md'}
                  padding={2}
                  flex={1}
                >
                  <Link href={currentFilm.homepage} isExternal>
                    Homepage
                  </Link>
                </Button>
              )}
            </Stack>
            {currentFilm.overview && (
              <Holder>
                <VStack alignItems={'flex-start'} padding={4}>
                  <Text fontSize={{ xl: 'xl', lg: 'lg', md: 'md', base: 'md' }}>
                    Overview
                  </Text>
                  <Text fontSize={{ xl: 'lg', lg: 'md', md: 'sm', base: 'sm' }}>
                    {currentFilm.overview}
                  </Text>
                </VStack>
              </Holder>
            )}
            {currentFilm.genres && (
              <Badge
                textAlign={'center'}
                fontSize={'lg'}
                variant={'subtle'}
                colorScheme={'gray'}
                padding={2}
                borderRadius={'lg'}
                boxShadow={'md'}
                textTransform={'none'}
                whiteSpace={'normal'}
                wordBreak={'break-word'}
              >
                Genres: {currentFilm.genres.toString()}
              </Badge>
            )}
          </Flex>
        </Stack>
      </Box>
    </Holder>
  );
};

export default Film;
