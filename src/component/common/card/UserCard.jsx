import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Avvvatars from 'avvvatars-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFriends, removeFriends } from '../../../redux/slices/friendSlice';
import CustomizeTooltip from '../tooltip/CustomizeTooltip';

const UserCard = ({
  username,
  currentStatusFriend,
  variant,
  onClick,
  cursor = 'initial',
}) => {
  const dispatch = useDispatch();
  const [statusFriend, setStatusFriend] = useState(false);
  useEffect(() => {
    setStatusFriend(currentStatusFriend);
  }, [currentStatusFriend]);
  const backgroundColor = useColorModeValue('gray.200', 'gray.700');
  const bgFriendColor = useColorModeValue(
    statusFriend ? 'orange.200' : 'gray.200',
    statusFriend ? 'orange.700' : 'gray.700'
  );
  const gradient = `linear(to-tl, ${bgFriendColor} 0%, ${backgroundColor} 30%, ${backgroundColor} 100%)`;

  const handleAddFriend = () => {
    setStatusFriend(!statusFriend);
    if (!statusFriend === true) {
      dispatch(addFriends({ friend: username }));
    } else {
      dispatch(removeFriends({ friend: username }));
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
      onClick={() => {
        onClick();
      }}
      cursor={cursor}
    >
      <HStack>
        <Avvvatars value={username} />
        <Text fontSize={'lg'} fontWeight={'bold'}>
          {username}
        </Text>
      </HStack>
      <Spacer />
      {variant !== 'display' && (
        <>
          <CustomizeTooltip message={'Add friends'}>
            <IconButton
              icon={<AddIcon />}
              colorScheme={'orange'}
              boxShadow={'md'}
              onClick={handleAddFriend}
              variant={statusFriend ? 'solid' : 'outline'}
              borderWidth={'1px'}
              borderColor={statusFriend ? 'transparent' : 'auto'}
              display={{
                lg: 'initial',
                md: 'initial',
                sm: 'none',
                base: 'none',
              }}
            />
          </CustomizeTooltip>
          <CustomizeTooltip message={'Add friends'}>
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
        </>
      )}
    </Stack>
  );
};

export default UserCard;
