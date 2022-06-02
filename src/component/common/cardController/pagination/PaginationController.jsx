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
import { getFilterInfo } from '../../../../redux/selectors';
import { fetchTV } from '../../../../redux/slices/filterSlice';
import Holder from '../../holder/Holder';
import PaginationButton from './PaginationButton';

const PaginationController = () => {
  const dispatch = useDispatch();
  const selector = useSelector(getFilterInfo).pagination;
  return (
    <Holder>
      <Flex alignItems={'center'} padding={4} gap={2}>
        <Text
          fontSize={'xl'}
        >{`Page: ${selector.page} / ${selector.total_pages}`}</Text>
        <Spacer />
        <ButtonGroup>
          <PaginationButton
            icon={<ArrowLeftIcon />}
            onClick={() => {
              dispatch(fetchTV(-1));
            }}
            isDisabled={selector.page === 1}
          />
          <PaginationButton
            icon={<ArrowRightIcon />}
            onClick={() => {
              dispatch(fetchTV(1));
            }}
            isDisabled={selector.page === selector.total_pages}
          />
        </ButtonGroup>
      </Flex>
    </Holder>
  );
};

export default PaginationController;
