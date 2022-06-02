import { useDispatch } from 'react-redux';
import { fetchTV } from '../../../redux/slices/filterSlice';
import FilterController from './FilterController';
import PaginationController from './PaginationController';

const CardController = ({ variant }) => {
  return (
    <>
      <FilterController variant={variant} />
      <PaginationController />
    </>
  );
};

export default CardController;
