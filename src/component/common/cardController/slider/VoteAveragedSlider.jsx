import {
  Box,
  Text,
  Tooltip,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateVoteAvg } from '../../../../redux/slices/filterSlice';

const VoteAveragedSlider = () => {
  const [sliderValue, setSliderValue] = useState(5);
  const [showTooltip, setShowTooltip] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateVoteAvg(sliderValue));
  }, [dispatch, sliderValue]);

  return (
    <Box>
      <Text fontSize={'xl'} fontWeight={'bold'}>
        Average Score:
      </Text>
      <Box padding={4}>
        <Slider
          id="slider"
          defaultValue={5}
          min={0}
          max={10}
          step={1}
          colorScheme="teal"
          onChange={v => {
            setSliderValue(v);
            dispatch(updateVoteAvg(v));
          }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <SliderMark value={0} mt="4" ml="-1" fontSize="sm">
            0
          </SliderMark>
          <SliderMark value={2} mt="4" ml="-1" fontSize="sm">
            2
          </SliderMark>
          <SliderMark value={4} mt="4" ml="-1" fontSize="sm">
            4
          </SliderMark>
          <SliderMark value={6} mt="4" ml="-1" fontSize="sm">
            6
          </SliderMark>
          <SliderMark value={8} mt="4" ml="-1" fontSize="sm">
            8
          </SliderMark>
          <SliderMark value={10} mt="4" ml="-1" fontSize="sm">
            10
          </SliderMark>
          <SliderTrack bgColor={'gray.400'}>
            <SliderFilledTrack />
          </SliderTrack>
          <Tooltip
            bg="teal.500"
            color="white"
            placement="top"
            isOpen={showTooltip}
            label={`At least ${sliderValue} score`}
          >
            <SliderThumb boxSize={6} />
          </Tooltip>
        </Slider>
      </Box>
    </Box>
  );
};

export default VoteAveragedSlider;
