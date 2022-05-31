import { useDispatch } from 'react-redux';
import { fetchTV } from '../../../redux/slices/filterSlice';
import FilterController from './FilterController';
import PaginationController from './PaginationController';

const Filter = () => {
  return (
    <>
      <FilterController />
      <PaginationController />
    </>
  );
};

export default Filter;
