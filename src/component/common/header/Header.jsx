import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../landing/logo/Logo';
import ColorModeSwitcher from '../button/ColorModeSwitcher';
import SignInModal from '../modal/SignInModal';

const Header = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const navBar = (
    <>
      {/* <Spacer /> */}
      <Flex marginLeft={5} gap={5}>
        <NavLink to={'/home'}>
          {({ isActive }) => (
            <Button
              size={'md'}
              fontSize={'lg'}
              variant={'ghost'}
              isActive={isActive}
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
            >
              Trending
            </Button>
          )}
        </NavLink>
        <NavLink to={'/discover'}>
          {({ isActive }) => (
            <Button
              size={'md'}
              fontSize={'lg'}
              variant={'ghost'}
              isActive={isActive}
            >
              Discover
            </Button>
          )}
        </NavLink>
      </Flex>
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
        navigate('..');
        onClose();
      }}
    >
      Sign Out
    </Button>
  );
  return (
    <>
      <Flex minWidth={'max-content'} alignItems={'center'} gap={2}>
        <Box>
          <Logo />
        </Box>
        {pathname !== '/' && navBar}
        <Spacer />
        <ButtonGroup gap={2} alignItems={'center'}>
          <ColorModeSwitcher />
          {pathname === '/' ? btnSignIn : btnSignOut}
        </ButtonGroup>
      </Flex>
      {isOpen && <SignInModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default Header;
