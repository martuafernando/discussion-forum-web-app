import PropTypes from 'prop-types';
import {FaXmark} from 'react-icons/fa6';
import './Flash.css';
import {useSelector, useDispatch} from 'react-redux';
import {UNSET_MESSAGE} from '../../redux/actionTypes';
import { useState, useEffect } from 'react';

export default function Flash({className}) {
  const dispatch = useDispatch();
  const error = useSelector((store) => store.error);
  const {isExists, type, message} = error;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          dispatch({type: UNSET_MESSAGE});
          return 100;
        }
        return Math.min(oldProgress + 20, 100);
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      setProgress(0);
    };
  }, [dispatch, isExists, type, message]);

  function onCloseHandler() {
    dispatch({type: UNSET_MESSAGE});
    setProgress(0);
  }

  const radius = 16;
  const stroke = 2;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = progress / 100 * circumference;

  return (
    <div className={`flash ${className} ${isExists ? '' : 'hidden'}`}>
      <div className={`content ${type}`}>
        <p>{message}</p>
        <button type='button' className="flash__close-button" onClick={onCloseHandler}>
          <FaXmark />
          <svg
            height={radius * 2}
            width={radius * 2}
          >
            <circle
              stroke="white"
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset }}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

Flash.propTypes = {
  className: PropTypes.string,
};