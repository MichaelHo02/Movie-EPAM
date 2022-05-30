import { useColorModeValue, useCheckbox, chakra, Box } from '@chakra-ui/react';
import React from 'react';

const CheckBox = props => {
  const { state, getCheckboxProps, getInputProps, htmlProps } =
    useCheckbox(props);

  const backgroundColor = useColorModeValue('teal.500', 'teal.600');

  return (
    <chakra.label {...htmlProps}>
      <input {...getInputProps()} hidden />
      <Box
        cursor={'pointer'}
        size={'lg'}
        fontSize={'lg'}
        borderRadius={'full'}
        backgroundColor={'gray.300'}
        color={'black'}
        _checked={{
          backgroundColor: backgroundColor,
          boxShadow: 'md',
          color: 'white',
        }}
        paddingX={4}
        paddingY={1}
        boxShadow={'inner'}
        {...getCheckboxProps()}
      >
        {props.children}
      </Box>
    </chakra.label>
  );
};

export default CheckBox;
