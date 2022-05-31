import {
  Box,
  Text,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark,
  Tooltip,
  useRangeSlider,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

const RunTimeSlider = () => {
  const [sliderValueLeft, setSliderValueLeft] = useState(50);
  const [sliderValueRight, setSliderValueRight] = useState(350);
  const [showTooltip, setShowTooltip] = useState(true);
  return (
    <Box>
      <Text fontSize={'xl'} fontWeight={'bold'}>
        Runtime:
      </Text>
      <Box padding={4}>
        <Tooltip
          bg="teal.500"
          color="white"
          placement="top"
          isOpen={showTooltip}
          label={`Runtime from ${sliderValueLeft} to ${sliderValueRight} minutes`}
        >
          <RangeSlider
            defaultValue={[50, 350]}
            min={0}
            max={400}
            step={2}
            colorScheme={'teal'}
            onChange={v => {
              setSliderValueLeft(v[0]);
              setSliderValueRight(v[1]);
            }}
            onMouseEnter={() => {
              setShowTooltip(true);
            }}
            onMouseLeave={() => {
              setShowTooltip(false);
            }}
          >
            <RangeSliderMark value={0} mt="2" ml="-1" fontSize="sm">
              0
            </RangeSliderMark>
            <RangeSliderMark value={100} mt="2" ml="-2.5" fontSize="sm">
              100
            </RangeSliderMark>
            <RangeSliderMark value={200} mt="2" ml="-2.5" fontSize="sm">
              200
            </RangeSliderMark>
            <RangeSliderMark value={300} mt="2" ml="-2.5" fontSize="sm">
              300
            </RangeSliderMark>
            <RangeSliderMark value={400} mt="2" ml="-2.5" fontSize="sm">
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
