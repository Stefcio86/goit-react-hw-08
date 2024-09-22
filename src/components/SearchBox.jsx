import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setFilter } from '../slices/filtersSlice';
import styles from './SearchBox.module.css';

const SearchBox = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(setFilter(event.target.value));
  };
  return (
    <div className={styles.searchBox}>
      <label className={styles.searchLabel} htmlFor="search">
        Find contacts by name
      </label>
      <input
        type="text"
        id="search"
        onChange={handleChange}
        className={styles.searchInput}
        placeholder="Search contacts..."
      />
    </div>
  );
};

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  
};

export default SearchBox;

