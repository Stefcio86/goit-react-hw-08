import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setFilter } from '../slices/filtersSlice';
import styles from './SearchBox.module.css';
import { useEffect, useState } from 'react';

const SearchBox = ({ value }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(value);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setFilter(searchTerm));
      setIsSearching(false);
    }, 300);

    setIsSearching(true);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, dispatch]);

  // Synchronizacja lokalnego stanu z propsami
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
          className={`${styles.searchInput} ${isSearching ? styles.searching : ''}`}
          placeholder="Search contacts..."
        />
        <button type="button" onClick={handleClear} className={styles.clearButton}>Clear</button>
      </div>
    </div>
  );
};

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
};

export default SearchBox;
