import { Box, Flex, Text, useCheckboxGroup } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateGenres } from '../../../redux/slices/filterSlice';
import { fetchGenre } from '../../../redux/slices/genreSlice';
import CheckBox from './CheckBox';

const GenresController = ({ variant }) => {
  const { value, getCheckboxProps } = useCheckboxGroup({});
  const dispatch = useDispatch();
  const genreList = useSelector(state => state.genreInfo.data);
  useEffect(() => {
    dispatch(fetchGenre(variant));
  }, [dispatch, variant]);

  useEffect(() => {
    dispatch(updateGenres(value));
  }, [dispatch, value]);

  return (
    <Box>
      <Text fontSize={'xl'} fontWeight={'bold'}>
        Genres:
      </Text>
      <Flex flexWrap={'wrap'} gap={4} paddingY={4}>
        {genreList.map((genre, index) => {
          const checkbox = getCheckboxProps({ value: genre.id });
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
