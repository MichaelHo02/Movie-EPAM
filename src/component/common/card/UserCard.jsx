import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Avvvatars from 'avvvatars-react';
import { AddIcon } from '@chakra-ui/icons';
import CustomizeTooltip from '../tooltip/CustomizeTooltip';

const UserCard = ({ username, currentStatusFriend }) => {
  const [statusFriend, setStatusFriend] = useState(false);
  useEffect(() => {
    setStatusFriend(currentStatusFriend);
  }, [currentStatusFriend]);
  const backgroundColor = useColorModeValue('gray.200', 'gray.700');
  const bgFriendColor = useColorModeValue(
    statusFriend ? 'orange.200' : 'gray.200',
    statusFriend ? 'orange.500' : 'gray.700'
  );
  const gradient = `linear(to-tl, ${bgFriendColor} 0%, ${backgroundColor} 30%, ${backgroundColor} 100%)`;

  const handleAddFriend = () => {
    setStatusFriend(!statusFriend);
    if (!statusFriend === true) {
    }
  };

  return (
    <Stack
      direction={['column', 'row']}
      bgGradient={gradient}
      borderRadius={'md'}
      boxShadow={'md'}
      padding={4}
      gap={2}
      alignItems={'center'}
      height={'full'}
    >
      <HStack>
        <Avvvatars value={username} />
        <Text fontSize={'lg'} fontWeight={'bold'}>
          {username}
        </Text>
      </HStack>
      <Spacer />
      <CustomizeTooltip message={'Add to favorite list'}>
        <IconButton
          icon={<AddIcon />}
          colorScheme={'orange'}
          boxShadow={'md'}
          onClick={handleAddFriend}
          variant={statusFriend ? 'solid' : 'outline'}
          borderWidth={'1px'}
          borderColor={statusFriend ? 'transparent' : 'auto'}
          display={{ lg: 'initial', md: 'initial', sm: 'none', base: 'none' }}
        />
      </CustomizeTooltip>
      <CustomizeTooltip message={'Add to favorite list'}>
        <Button
          leftIcon={<AddIcon />}
          colorScheme={'orange'}
          display={{
            lg: 'none',
            md: 'none',
            sm: 'initial',
            base: 'initial',
          }}
          width={{ sm: 'auto', base: 'full' }}
          boxShadow={'md'}
          variant={statusFriend ? 'solid' : 'outline'}
          onClick={handleAddFriend}
          borderWidth={'1px'}
          borderColor={statusFriend ? 'transparent' : 'auto'}
        >
          Add Friends
        </Button>
      </CustomizeTooltip>
    </Stack>
  );
};

export default UserCard;