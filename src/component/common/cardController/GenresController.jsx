import { Box, Flex, Text, useCheckboxGroup } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import tvShowsAPI from '../../../api/services/tvShowsAPI';
import CheckBox from './CheckBox';

const GenresController = () => {
  const { value, getCheckboxProps } = useCheckboxGroup({});
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    tvShowsAPI.getGenres().then(res => {
      setGenres(res.data.genres);
    });
  }, []);
  return (
    <Box>
      <Text fontSize={'xl'} fontWeight={'bold'}>
        Genres:
      </Text>
      <Flex flexWrap={'wrap'} gap={4} paddingY={4}>
        {genres.map((genre, index) => {
          const checkbox = getCheckboxProps({ value: genre.name });
          return (
            <CheckBox key={index} {...checkbox}>
              {genre.name}
            </CheckBox>
          );
        })}
      </Flex>
    </Box>
  );
};

export default GenresController;
