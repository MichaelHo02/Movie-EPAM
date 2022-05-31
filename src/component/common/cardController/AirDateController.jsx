import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { forwardRef, useEffect, useState } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import {
  updateAirDateGTE,
  updateAirDateLTE,
} from '../../../redux/slices/filterSlice';

const AirDateController = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const dispatch = useDispatch();

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button
      onClick={onClick}
      ref={ref}
      width={'100%'}
      variant={'solid'}
      colorScheme={'teal'}
      boxShadow={'md'}
      fontSize={'lg'}
    >
      {value}
    </Button>
  ));

  const CustomCalendarContainer = ({ className, children }) => {
    return (
      <>
        <Box as={CalendarContainer} className={className} boxShadow={'2xl'}>
          {children}
        </Box>
      </>
    );
  };

  const handleOffsetTime = date =>
    new Date(date.getTime() - date.getTimezoneOffset() * 60000);

  const handleSetDate = (date, setStateCallback, dispatchCallbacks) => {
    date = handleOffsetTime(date);
    setStateCallback(date);
    dispatch(dispatchCallbacks(date.toISOString()));
  };

  useEffect(() => {
    handleSetDate(startDate, setStartDate, updateAirDateGTE);
    handleSetDate(endDate, setEndDate, updateAirDateLTE);
  }, []);

  return (
    <Box>
      <Text fontSize={'xl'} fontWeight={'bold'}>
        Air Date:
      </Text>
      <Flex paddingY={4} gap={5} flexWrap={{ lg: 'nowrap', base: 'wrap' }}>
        <Box width={'full'}>
          <DatePicker
            selected={startDate}
            onChange={date =>
              handleSetDate(date, setStartDate, updateAirDateGTE)
            }
            customInput={<CustomInput />}
            calendarContainer={CustomCalendarContainer}
            maxDate={endDate}
            dateFormat={'yyyy-MM-dd'}
          />
        </Box>
        <Box width={'full'}>
          <DatePicker
            selected={endDate}
            onChange={date => handleSetDate(date, setEndDate, updateAirDateLTE)}
            customInput={<CustomInput />}
            calendarContainer={CustomCalendarContainer}
            minDate={startDate}
            dateFormat={'yyyy-MM-dd'}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default AirDateController;
