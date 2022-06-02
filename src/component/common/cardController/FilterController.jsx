import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Heading,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMovie, fetchTV } from '../../../redux/slices/filterSlice';
import AccordionHolder from './AccordionHolder';
import AirDateController from './AirDateController';
import GenresController from './GenresController';
import RunTimeSlider from './slider/RunTimeSlider';
import VoteAveragedSlider from './slider/VoteAveragedSlider';
import VoteCountSlider from './slider/VoteCountSlider';
import SortCard from './SortCard';
const FilterController = ({ variant }) => {
  const [accordionState, setAccordionState] = useState(false);

  const dispatch = useDispatch();
  const handleOnClick = e => {
    if (variant === 'tv') {
      dispatch(fetchTV());
    } else {
      dispatch(fetchMovie());
    }
    setAccordionState(false);
  };
  return (
    <Accordion
      allowMultiple
      index={accordionState ? [0] : [-1]}
      onChange={() => setAccordionState(!accordionState)}
    >
      <AccordionItem marginY={8} border={'none'}>
        <AccordionHolder>
          <AccordionButton borderRadius={'inherit'} paddingY={4}>
            <Heading flex={1} textAlign={'left'} fontSize={'3xl'}>
              Filter & Sort
            </Heading>
            <AccordionIcon />
          </AccordionButton>
        </AccordionHolder>

        <AccordionHolder>
          <AccordionPanel>
            <SortCard />
          </AccordionPanel>
        </AccordionHolder>

        <AccordionHolder>
          <AccordionPanel>
            <GenresController variant={variant} />
          </AccordionPanel>
        </AccordionHolder>

        <AccordionHolder>
          <AccordionPanel>
            <VoteCountSlider />
          </AccordionPanel>
        </AccordionHolder>

        <AccordionHolder>
          <AccordionPanel>
            <VoteAveragedSlider />
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
  );
};

export default FilterController;
