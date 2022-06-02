import { Box, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from '../component/common/card/UserCard';
import CardHolder from '../component/common/holder/CardHolder';
import Holder from '../component/common/holder/Holder';
import SearchUser from '../component/friends/SearchUser';
import { getSignUpUsername, getUsersInfo } from '../redux/selectors';
import { clearSearchResult } from '../redux/slices/friendSlice';

const Friends = () => {
  const info = useSelector(getUsersInfo);
  const username = useSelector(getSignUpUsername);
  const [cards, setCards] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearSearchResult());
  }, []);
  useEffect(() => setCards(info.data.users), [info]);
  return (
    <Box marginBottom={10}>
      <Holder marginY={8}>
        <Heading padding={4} fontSize={'3xl'}>
          Find & Add Friends
        </Heading>
      </Holder>
      <SearchUser />
      <CardHolder>
        {cards &&
          cards
            .filter(card => card.username !== username)
            .map(card => {
              return (
                <UserCard
                  key={card.username}
                  {...card}
                  currentStatusFriend={info.data.friendsName[card.username]}
                />
              );
            })}
      </CardHolder>
    </Box>
  );
};

export default Friends;
