import {
  Box,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderMark,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateRuntimes } from '../../../../redux/slices/filterSlice';

const RunTimeSlider = () => {
  const [sliderValueLeft, setSliderValueLeft] = useState(0);
  const [sliderValueRight, setSliderValueRight] = useState(400);
  const [showTooltip, setShowTooltip] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateRuntimes({
        'with_runtime.gte': sliderValueLeft,
        'with_runtime.lte': sliderValueRight,
      })
    );
  }, []);

  return (
    <Box>
      <Text fontSize={'xl'} fontWeight={'bold'}>
        Runtime:
      </Text>
      <Box padding={4}>
        <Tooltip
          bg="teal.500"
          color="white"
          placement={'top'}
          isOpen={showTooltip}
          label={`Runtime from ${sliderValueLeft} to ${sliderValueRight} minutes`}
          marginBottom={4}
        >
          <RangeSlider
            defaultValue={[0, 400]}
            min={0}
            max={400}
            step={2}
            colorScheme={'teal'}
            onChange={v => {
              setSliderValueLeft(v[0]);
              setSliderValueRight(v[1]);
            }}
            onBlur={() => {
              dispatch(
                updateRuntimes({
                  'with_runtime.gte': sliderValueLeft,
                  'with_runtime.lte': sliderValueRight,
                })
              );
            }}
            onMouseEnter={() => {
              setShowTooltip(true);
            }}
            onMouseLeave={() => {
              setShowTooltip(false);
            }}
          >
            <RangeSliderMark value={0} mt="4" ml="-1" fontSize="sm">
              0
            </RangeSliderMark>
            <RangeSliderMark value={100} mt="4" ml="-2.5" fontSize="sm">
              100
            </RangeSliderMark>
            <RangeSliderMark value={200} mt="4" ml="-2.5" fontSize="sm">
              200
            </RangeSliderMark>
            <RangeSliderMark value={300} mt="4" ml="-2.5" fontSize="sm">
              300
            </RangeSliderMark>
            <RangeSliderMark value={400} mt="4" ml="-2.5" fontSize="sm">
              400
            </RangeSliderMark>
            <RangeSliderTrack bg={'gray.400'}>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb boxSize={6} index={0} />
            <RangeSliderThumb boxSize={6} index={1} />
          </RangeSlider>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default RunTimeSlider;
