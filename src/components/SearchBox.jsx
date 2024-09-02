import PropTypes from 'prop-types';
import styles from './SearchBox.module.css';

const SearchBox = ({ value, onChange }) => {
  return (
    <div className={styles.searchBox}>
      <label className={styles.searchLabel} htmlFor="search">
        Find contacts by name
      </label>
      <input
        type="text"
        id="search"
        value={value}
        onChange={onChange}
        className={styles.searchInput}
        placeholder="Search contacts..."
      />
    </div>
  );
};

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBox;

