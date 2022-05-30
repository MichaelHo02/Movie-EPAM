import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  useColorModeValue
} from '@chakra-ui/react';
import GenresController from './GenresController';

const Filter = () => {
  const backgroundColor = useColorModeValue('gray.200', 'gray.600');
  return (
    <>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem marginY={8} border={'none'}>
          <Box height={'full'}>
            <AccordionButton
              backgroundColor={backgroundColor}
              borderRadius={'md'}
              boxShadow={'md'}
              _hover={{
                opacity: 0.7,
              }}
            >
              <Heading flex={1} textAlign={'left'}>
                Filter
              </Heading>
              <AccordionIcon />
            </AccordionButton>
          </Box>
          <Box
            marginY={4}
            backgroundColor={backgroundColor}
            borderRadius={'md'}
            boxShadow={'md'}
          >
            <AccordionPanel>
              <GenresController />
            </AccordionPanel>
          </Box>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Filter;
