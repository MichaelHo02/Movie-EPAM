import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { forwardRef, useState } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AirDateController = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button
      onClick={onClick}
      ref={ref}
      width={'100%'}
      variant={'solid'}
      colorScheme={'teal'}
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

  console.log(startDate.toISOString(), endDate.toISOString);

  return (
    <Box>
      <Text fontSize={'xl'} fontWeight={'bold'}>
        Air Date:
      </Text>
      <Flex paddingY={4} gap={5} flexWrap={{ lg: 'nowrap', base: 'wrap' }}>
        <Box width={'full'}>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            customInput={<CustomInput />}
            calendarContainer={CustomCalendarContainer}
          />
        </Box>
        <Box width={'full'}>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            customInput={<CustomInput />}
            calendarContainer={CustomCalendarContainer}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default AirDateController;
