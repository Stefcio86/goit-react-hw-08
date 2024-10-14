import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setFilter } from '../redux/filters/filterSlice';
import { useEffect, useState } from 'react';
import styles from './SearchBox.module.css';

const SearchBox = ({ value = '' }) => { 
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setFilter(searchTerm));
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, dispatch]);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    dispatch(setFilter(''));
  };

  return (
    <div className={styles.searchBox}>
      <label className={styles.searchLabel} htmlFor="search">
        Find contacts by name
      </label>
      <div className={styles.inputContainer}>
        <input
          type="text"
          id="search"
          onChange={handleChange}
          value={searchTerm}
          className={styles.searchInput}
          placeholder="Search contacts..."
        />
        <button type="button" onClick={handleClear} className={styles.clearButton}>
          Clear
        </button>
      </div>
    </div>
  );
};

SearchBox.propTypes = {
  value: PropTypes.string,
};

export default SearchBox;
