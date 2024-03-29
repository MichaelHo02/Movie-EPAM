import { Box, chakra, useCheckbox, useColorModeValue } from '@chakra-ui/react';

const CheckBox = props => {
  const { getCheckboxProps, getInputProps, htmlProps } = useCheckbox(props);

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
