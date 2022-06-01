import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import {
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterInfo } from '../../../redux/selectors';
import { fetchTV } from '../../../redux/slices/filterSlice';

const PaginationController = () => {
  const backgroundColor = useColorModeValue('gray.200', 'gray.700');
  const dispatch = useDispatch();
  const selector = useSelector(getFilterInfo);
  return (
    <Flex
      marginY={4}
      padding={4}
      backgroundColor={backgroundColor}
      borderRadius={'md'}
      boxShadow={'md'}
      width={'full'}
      gap={2}
      alignItems={'center'}
    >
      <Text
        fontSize={'xl'}
      >{`Page: ${selector.page} / ${selector.total_pages}`}</Text>
      <Spacer />
      <ButtonGroup>
        <IconButton
          icon={<ArrowLeftIcon />}
          colorScheme={'teal'}
          variant={'outline'}
          onClick={() => {
            dispatch(fetchTV(-1));
          }}
        />
        <IconButton
          icon={<ArrowRightIcon />}
          colorScheme={'teal'}
          variant={'outline'}
          onClick={() => {
            dispatch(fetchTV(1));
          }}
        />
      </ButtonGroup>
    </Flex>
  );
};

export default PaginationController;
