import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../landing/logo/Logo';
import ColorModeSwitcher from '../button/ColorModeSwitcher';
import SignInModal from '../modal/SignInModal';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../../redux/slices/authSlice';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';

const Header = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const {
    onOpen: hamOnOpen,
    isOpen: hamIsOpen,
    onClose: hamOnClose,
  } = useDisclosure();
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navBar = (
    <>
      <NavLink to={'/home'}>
        {({ isActive }) => (
          <Button
            size={'md'}
            fontSize={'lg'}
            variant={'ghost'}
            isActive={isActive}
            width={'100%'}
          >
            Home
          </Button>
        )}
      </NavLink>
      <NavLink to={'/favorite'}>
        {({ isActive }) => (
          <Button
            size={'md'}
            fontSize={'lg'}
            variant={'ghost'}
            isActive={isActive}
            width={'100%'}
          >
            Favorite
          </Button>
        )}
      </NavLink>
      <NavLink to={'/tv-shows'}>
        {({ isActive }) => (
          <Button
            size={'md'}
            fontSize={'lg'}
            variant={'ghost'}
            isActive={isActive}
            width={'100%'}
          >
            TV Shows
          </Button>
        )}
      </NavLink>
      <NavLink to={'/movies'}>
        {({ isActive }) => (
          <Button
            size={'md'}
            fontSize={'lg'}
            variant={'ghost'}
            isActive={isActive}
            width={'100%'}
          >
            Movies
          </Button>
        )}
      </NavLink>
      <NavLink to={'/trending'}>
        {({ isActive }) => (
          <Button
            size={'md'}
            fontSize={'lg'}
            variant={'ghost'}
            isActive={isActive}
            width={'100%'}
          >
            Trending
          </Button>
        )}
      </NavLink>
    </>
  );

  const btnSignIn = (
    <Button
      size={'lg'}
      fontSize={'lg'}
      colorScheme={'teal'}
      variant="outline"
      onClick={() => {
        onOpen();
      }}
    >
      Sign In
    </Button>
  );
  const btnSignOut = (
    <Button
      size={'lg'}
      fontSize={'lg'}
      colorScheme={'orange'}
      onClick={() => {
        dispatch(clearUser());
        localStorage.removeItem('auth_WeWatch');
        navigate('/');
      }}
    >
      Sign Out
    </Button>
  );
  return (
    <>
      <Flex
        minWidth={'max-content'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={2}
      >
        <HStack spacing={8} alignItems={'center'}>
          <Box>
            <Logo />
          </Box>
          <Flex
            as={'nav'}
            gap={4}
            display={{ lg: 'flex', sm: 'none', base: 'none' }}
          >
            {pathname !== '/' && navBar}
          </Flex>
        </HStack>
        <ButtonGroup gap={2} alignItems={'center'}>
          <ColorModeSwitcher />
          <Box display={{ lg: 'block', sm: 'none', base: 'none' }}>
            {pathname === '/' ? btnSignIn : btnSignOut}
          </Box>
          <IconButton
            size={'lg'}
            icon={hamIsOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ lg: 'none' }}
            onClick={hamIsOpen ? hamOnClose : hamOnOpen}
          />
        </ButtonGroup>
      </Flex>

      {hamIsOpen ? (
        <Box pb={4} display={{ lg: 'none' }}>
          <Stack as={'nav'} gap={4} paddingTop={5}>
            {pathname !== '/' && navBar}
            {pathname === '/' ? btnSignIn : btnSignOut}
          </Stack>
        </Box>
      ) : null}
      {isOpen && <SignInModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default Header;
