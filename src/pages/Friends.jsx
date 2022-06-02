import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserCard from '../component/common/card/UserCard';
import CardHolder from '../component/common/cardHolder/CardHolder';
import SearchUser from '../component/friends/SearchUser';
import { getSignUpUsername, getUsersInfo } from '../redux/selectors';

const Friends = () => {
  const info = useSelector(getUsersInfo);
  const username = useSelector(getSignUpUsername);
  console.log(info);
  const [cards, setCards] = useState([]);
  useEffect(() => setCards(info.data.users), [info]);
  return (
    <Box marginBottom={10}>
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
