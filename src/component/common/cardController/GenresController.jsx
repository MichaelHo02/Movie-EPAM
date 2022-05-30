import { Box, Flex, Text, useCheckboxGroup } from '@chakra-ui/react';
import CheckBox from './CheckBox';

const GenresController = () => {
  const options = ['react', 'vue', 'svelte'];

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
            <CheckBox key={index} {...checkbox}>
              {item}
            </CheckBox>
          );
        })}
      </Flex>
    </Box>
  );
};

export default GenresController;
