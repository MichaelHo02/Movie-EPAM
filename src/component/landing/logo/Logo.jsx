import { Heading, HStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const Logo = () => {
  const backgroundColor = useColorModeValue('teal.500', 'teal.400');
  const textColor = useColorModeValue('white', 'black');
  const specialBg = useColorModeValue('white', 'gray.200');
  return (
    <HStack
      borderWidth={6}
      borderColor={backgroundColor}
      backgroundColor={backgroundColor}
      borderRadius={'base'}
    >
      <Heading
        color={'black'}
        backgroundColor={specialBg}
        padding={1}
        borderRadius={'base'}
        fontSize={{ lg: '2xl', md: '4xl', sm: '4xl', base: 'xl' }}
      >
        We
      </Heading>
      <Heading
        color={textColor}
        fontSize={{ lg: '2xl', md: '4xl', sm: '4xl', base: 'xl' }}
      >
        Watch
      </Heading>
    </HStack>
  );
};

export default Logo;
