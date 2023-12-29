import PropTypes from 'prop-types';
import {FaXmark} from 'react-icons/fa6';
import './Flash.css';
import {useSelector, useDispatch} from 'react-redux';
import {UNSET_ERROR} from '../../redux/actionTypes';
export default function Flash({className}) {
  const dispatch = useDispatch();
  const error = useSelector((store) => store.error);
  const {isExists, type, message} = error;

  function onCloseHandler() {
    dispatch({type: UNSET_ERROR});
  }

  return (
    <div className={`flash ${type} ${className} ${isExists ? '' : 'hidden'}`}>
      <p>{message}</p>
      <FaXmark className="flash__close-button" onClick={onCloseHandler} />
    </div>
  );
}

Flash.propTypes = {
  className: PropTypes.string,
};
