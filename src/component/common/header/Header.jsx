import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearUser } from '../../../redux/slices/authSlice';
import Logo from '../../landing/logo/Logo';
import ColorModeSwitcher from '../button/ColorModeSwitcher';
import SignInModal from '../modal/SignInModal';
import NavigateButton from './NavigateButton';

const navBarList = [
  {
    path: '/home',
    title: 'Home',
  },
  {
    path: '/tv-shows',
    title: 'TV Shows',
  },
  {
    path: '/movies',
    title: 'Movies',
  },
  {
    path: '/favorite',
    title: 'Favorite',
  },
  {
    path: '/friends',
    title: 'Friends',
  },
];

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

  const navBar = navBarList.map((nav, idx) => (
    <NavigateButton key={idx} {...nav} hamOnClose={hamOnClose} />
  ));

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
