
import './CategoryItem.css';
import {Link} from 'react-router-dom';
import {stringToColor} from '../../utils/helper';
import PropTypes from 'prop-types';

export default function CategoryItem({
  className,
  display,
  onClick,
}) {
  return (
    <Link
      onClick={ onClick }
      className={`category-item badge ${ className }`}
      style={{backgroundColor: `${stringToColor(display)}`}}
    >#{ display }
    </Link>
  );
}

CategoryItem.propTypes = {
  className: PropTypes.string,
  display: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
