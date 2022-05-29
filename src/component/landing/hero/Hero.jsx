import {
  Box,
  Flex,
  Heading,
  Img,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import IllustrationResource from '../../../assets/image';
import SignUpForm from './SignUpForm';

const Hero = () => {
  const color = useColorModeValue('orange.500', 'orange.600');
  const headingSize = { base: '2xl', sm: '3xl', md: '4xl' };
  const textSize = { xl: '3xl', lg: '2xl', base: 'xl' };
  const smallDesc = { xl: '2xl', lg: 'xl', base: 'lg' };
  return (
    <>
      <Box minHeight={'80vh'} paddingTop={40}>
        <Flex gap={10} justifyContent={'center'} alignItems={'center'}>
          <Img
            src={IllustrationResource.HeroBanner}
            boxSize={{ xl: 500, lg: 400 }}
            display={{ base: 'none', lg: 'block' }}
          />
          <VStack
            alignItems={'start'}
            justifyContent={'center'}
            width={'max-content'}
          >
            <Heading color={color} size={headingSize}>
              Great Movie
            </Heading>
            <Heading color={color} size={headingSize}>
              Great Friends
            </Heading>
            <Box>
              <Text
                fontSize={textSize}
                display={{ sm: 'inline', base: 'block' }}
              >
                Great for bonding{' '}
              </Text>
              <Text
                as={'u'}
                fontSize={headingSize}
                fontWeight={'bold'}
                textUnderlineOffset={'0.5rem'}
              >
                Anytime
              </Text>{' '}
              <Text
                as={'u'}
                fontSize={headingSize}
                fontWeight={'bold'}
                textUnderlineOffset={'0.5rem'}
              >
                Anywhere
              </Text>
            </Box>
            <Text fontSize={smallDesc}>
              Ready to watch? Enter your email address here to sign up.
            </Text>
            <SignUpForm />
          </VStack>
        </Flex>
      </Box>
    </>
  );
};

export default Hero;
