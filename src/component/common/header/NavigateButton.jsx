import { Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const NavigateButton = ({ path, title, hamOnClose }) => {
  return (
    <NavLink to={path}>
      {({ isActive }) => (
        <Button
          size={'md'}
          fontSize={'lg'}
          variant={'ghost'}
          isActive={isActive}
          width={'100%'}
          onClick={() => hamOnClose()}
        >
          {title}
        </Button>
      )}
    </NavLink>
  );
};

export default NavigateButton;
