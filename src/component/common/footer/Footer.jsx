import { Flex, Img, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import IllustrationResource from '../../../assets/image';

const Footer = () => {
  return (
    <VStack>
      <Flex
        align="center"
        borderTop="0.5px solid #d1d2d4"
        justify="center"
        width={'100%'}
      >
        <Text color="gray.500" display={{ base: 'none', md: 'inline-block' }}>
          A product of
        </Text>
        <Img src={IllustrationResource.RmitLogo} alt="RMIT logo" w="60px" />
        <Text fontWeight="bold">
          RMIT University
        </Text>
      </Flex>
      <Text>Made by Ho Le Minh Thach</Text>
    </VStack>
  );
};

export default Footer;
