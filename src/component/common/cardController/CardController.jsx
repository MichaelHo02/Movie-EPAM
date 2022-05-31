import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import AccordionHolder from './AccordionHolder';
import GenresController from './GenresController';
import RunTimeSlider from './RunTimeSlider';
import SliderController from './SliderController';

const Filter = () => {
  const backgroundColor = useColorModeValue('gray.200', 'gray.600');
  return (
    <>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem marginY={8} border={'none'}>
          <AccordionHolder>
            <AccordionButton borderRadius={'inherit'}>
              <Heading flex={1} textAlign={'left'}>
                Filter
              </Heading>
              <AccordionIcon />
            </AccordionButton>
          </AccordionHolder>
          <AccordionHolder>
            <AccordionPanel>
              <GenresController />
            </AccordionPanel>
          </AccordionHolder>
          <AccordionHolder>
            <AccordionPanel>
              <SliderController />
            </AccordionPanel>
          </AccordionHolder>
          <AccordionHolder>
            <AccordionPanel>
              <RunTimeSlider />
            </AccordionPanel>
          </AccordionHolder>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Filter;
