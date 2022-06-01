import { Box, Select, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSort } from '../../../redux/slices/filterSlice';

const SortCard = () => {
  const [value, setValue] = useState('popularity.desc');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateSort(value));
  }, []);

  return (
    <Box>
      <Text fontSize={'xl'} fontWeight={'bold'}>
        Sort:
      </Text>
      <Select
        size={'lg'}
        variant={'filled'}
        focusBorderColor={'teal.500'}
        borderColor={'gray.400'}
        marginTop={3}
        onChange={e => {
          setValue(e.target.value);
          dispatch(updateSort(e.target.value));
        }}
        defaultValue={value}
      >
        <option value={'popularity.desc'}>Popularity decending</option>
        <option value={'popularity.asc'}>Popularity ascending</option>
        <option value={'vote_average.desc'}>Rating decending</option>
        <option value={'vote_average.asc'}>Rating ascending</option>
      </Select>
    </Box>
  );
};

export default SortCard;
