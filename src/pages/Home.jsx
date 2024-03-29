import { Box, Heading, Skeleton, Stack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaginationForList from '../component/common/cardController/pagination/PaginationForList';
import Holder from '../component/common/holder/Holder';
import {
  getFilmInfo,
  getFriendFavoriteInfo,
  getSignUpUsername,
  getUsersInfo,
} from '../redux/selectors';
import {
  decrementPage,
  fetchUsers,
  incrementPage,
} from '../redux/slices/friendSlice';

import {
  clearData,
  decrementPage as decPage,
  incrementPage as incPage,
} from '../redux/slices/friendFavoriteSlice';

import Card from '../component/common/card/Card';
import UserCard from '../component/common/card/UserCard';
import CardHolder from '../component/common/holder/CardHolder';
import UserHolder from '../component/common/holder/UserHolder';
import { fetchLikesAndFavorites } from '../redux/slices/filmSlice';
import { fetchFavoritesFriends } from '../redux/slices/friendFavoriteSlice';

const displayNumberUser = 4;
const displayNumberFilm = 12;

const Home = () => {
  const dispatch = useDispatch();
  const username = useSelector(getSignUpUsername);
  const userInfo = useSelector(getUsersInfo);
  const favoriteInfo = useSelector(getFriendFavoriteInfo);
  const filmInfo = useSelector(getFilmInfo);
  const [cards, setCards] = useState([]);
  const [films, setFilms] = useState([]);
  const [pageUser, setPageUser] = useState(1);
  const [pageFilm, setPageFilm] = useState(1);
  const [isClick, setisClick] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    dispatch(clearData());
    dispatch(fetchLikesAndFavorites());
    dispatch(fetchUsers(''));
  }, [dispatch]);

  useEffect(() => setCards(userInfo.data.friends), [userInfo]);
  useEffect(
    () => setFilms(favoriteInfo.data.favorites),
    [favoriteInfo.data.favorites]
  );
  useEffect(() => setPageUser(userInfo.data.page), [userInfo.data.page]);
  useEffect(
    () => setPageFilm(favoriteInfo.data.page),
    [favoriteInfo.data.page]
  );

  const startUser = (pageUser - 1) * displayNumberUser;
  const maxPageUser = Math.ceil(cards.length / displayNumberUser);
  const displayUsers = cards.slice(startUser, startUser + displayNumberUser);

  const startFilm = (pageFilm - 1) * displayNumberFilm;
  const maxPageFilm = Math.ceil(films.length / displayNumberFilm);
  const displayFilms = films.slice(startFilm, startFilm + displayNumberFilm);

  return (
    <Box>
      <Holder marginY={8}>
        <VStack padding={8} alignItems={'flex-start'}>
          <Heading fontSize={'3xl'}>{`Welcome back ${username}.`}</Heading>
          <Text fontSize={'2xl'}>Let's catch up with your friends!</Text>
        </VStack>
      </Holder>

      <Skeleton isLoaded={userInfo.status !== 'pending'}>
        <Holder>
          <Stack padding={8} gap={2}>
            <Text fontSize={'xl'} fontWeight={'bold'}>
              Click to see your friends favorites collection
            </Text>
            <Skeleton isLoaded={favoriteInfo.status !== 'pending'}>
              <PaginationForList
                currentPage={pageUser}
                currentMaxPage={maxPageUser}
                incrementPage={incrementPage}
                decrementPage={decrementPage}
                variant={'inner'}
              />
            </Skeleton>
            <Skeleton isLoaded={userInfo.status !== 'pending'}>
              <UserHolder>
                {displayUsers &&
                  displayUsers
                    .filter(user => user.username !== username)
                    .map(card => {
                      return (
                        <UserCard
                          key={card.username}
                          {...card}
                          variant={'display'}
                          currentStatusFriend={
                            userInfo.data.friendsName[card.username]
                          }
                          cursor={'pointer'}
                          onClick={() => {
                            console.log(card.username);
                            setSelectedUser(card.username);
                            dispatch(fetchFavoritesFriends(card.username));
                            setisClick(true);
                          }}
                        />
                      );
                    })}
              </UserHolder>
            </Skeleton>
          </Stack>
        </Holder>
      </Skeleton>
      {isClick && (
        <>
          <Holder>
            <Text
              paddingY={4}
              paddingX={8}
              fontSize={'xl'}
              fontWeight={'bold'}
            >{`You are looking at ${selectedUser} collection`}</Text>
          </Holder>
          <PaginationForList
            currentPage={pageFilm}
            currentMaxPage={maxPageFilm}
            incrementPage={incPage}
            decrementPage={decPage}
          />
          <CardHolder>
            {displayFilms &&
              displayFilms.map(film => {
                return (
                  <Card
                    key={film.id}
                    title={film.name}
                    {...film}
                    country={films.country}
                    countryDesc={
                      film.variant === 'tv'
                        ? 'Origin Country'
                        : 'Original language'
                    }
                    variant={film.variant}
                    currentStatusLike={filmInfo.data.likesId[`${film.id}`]}
                    currentStatusFavorite={
                      filmInfo.data.favoritesId[`${film.id}`]
                    }
                  />
                );
              })}
          </CardHolder>
          <PaginationForList
            currentPage={pageFilm}
            currentMaxPage={maxPageFilm}
            incrementPage={incPage}
            decrementPage={decPage}
          />
        </>
      )}
    </Box>
  );
};

export default Home;
