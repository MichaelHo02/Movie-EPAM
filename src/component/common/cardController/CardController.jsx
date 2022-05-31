import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Heading,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { fetchTV } from '../../../redux/slices/filterSlice';
import AccordionHolder from './AccordionHolder';
import AirDateController from './AirDateController';
import GenresController from './GenresController';
import RunTimeSlider from './RunTimeSlider';
import SliderController from './SliderController';

const Filter = () => {
  const dispatch = useDispatch();
  const handleOnClick = e => {
    dispatch(fetchTV());
  };

  return (
    <>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem marginY={8} border={'none'}>
          <AccordionHolder>
            <AccordionButton borderRadius={'inherit'}>
              <Heading flex={1} textAlign={'left'} fontSize={'3xl'}>
                Filter & Sorting
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

          <AccordionHolder>
            <AccordionPanel>
              <AirDateController />
            </AccordionPanel>
          </AccordionHolder>

          <AccordionHolder>
            <AccordionPanel>
              <Button
                marginTop={3}
                width={'full'}
                colorScheme={'orange'}
                boxShadow={'md'}
                onClick={handleOnClick}
              >
                Submit
              </Button>
            </AccordionPanel>
          </AccordionHolder>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Filter;
