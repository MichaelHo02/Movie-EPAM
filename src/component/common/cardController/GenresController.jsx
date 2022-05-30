import {
  Box,
  Button,
  chakra,
  Flex,
  Tag,
  Text,
  useCheckbox,
  useCheckboxGroup,
  useColorModeValue,
} from '@chakra-ui/react';

function CustomCheckbox(props) {
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
}

const GenresController = () => {
  const options = [
    'react',
    'vue',
    'svelte',
    'react',
    'vue',
    'svelte',
    'react',
    'vue',
    'svelte',
    'react',
    'vue',
    'svelte',
    'react',
    'vue',
    'svelte',
    'react',
    'vue',
    'svelte',
    'react',
    'vue',
    'svelte',
    'react',
    'vue',
    'svelte',
    'react',
    'vue',
    'svelte',
    'react',
    'vue',
    'svelte',
    'react',
    'vue',
    'svelte',
  ];

  const { value, getCheckboxProps } = useCheckboxGroup({});
  return (
    <Box>
      <Text fontSize={'xl'} fontWeight={'bold'}>
        Genres:
      </Text>
      <Flex flexWrap={'wrap'} gap={4} paddingY={4}>
        {options.map((item, index) => {
          const checkbox = getCheckboxProps({ value: item });
          return (
            <CustomCheckbox key={index} {...checkbox}>
              {item}
            </CustomCheckbox>
          );
        })}
      </Flex>
    </Box>
  );
};

export default GenresController;
