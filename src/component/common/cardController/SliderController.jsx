import {
  Box,
  Slider,
  SliderMark,
  Text,
  SliderTrack,
  SliderFilledTrack,
  Tooltip,
  SliderThumb,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateVoteCount } from '../../../redux/slices/filterSlice';

const SliderController = () => {
  const [sliderValue, setSliderValue] = useState(50);
  const [showTooltip, setShowTooltip] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateVoteCount(sliderValue));
  }, []);

  return (
    <Box>
      <Text fontSize={'xl'} fontWeight={'bold'}>
        Average Vote:
      </Text>
      <Box padding={4}>
        <Slider
          id="slider"
          defaultValue={50}
          min={0}
          max={500}
          step={5}
          colorScheme="teal"
          onChange={v => {
            setSliderValue(v);
            dispatch(updateVoteCount(v));
          }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <SliderMark value={0} mt="2" ml="-1" fontSize="sm">
            0
          </SliderMark>
          <SliderMark value={125} mt="2" ml="-2.5" fontSize="sm">
            125
          </SliderMark>
          <SliderMark value={250} mt="2" ml="-2.5" fontSize="sm">
            250
          </SliderMark>
          <SliderMark value={375} mt="2" ml="-2.5" fontSize="sm">
            375
          </SliderMark>
          <SliderMark value={500} mt="2" ml="-2.5" fontSize="sm">
            500
          </SliderMark>
          <SliderTrack bgColor={'gray.400'}>
            <SliderFilledTrack />
          </SliderTrack>
          <Tooltip
            bg="teal.500"
            color="white"
            placement="top"
            isOpen={showTooltip}
            label={`At least ${sliderValue} votes`}
          >
            <SliderThumb boxSize={6} />
          </Tooltip>
        </Slider>
      </Box>
    </Box>
  );
};

export default SliderController;
