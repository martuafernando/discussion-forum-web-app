import React from "react";
import PropTypes from "prop-types";
import { FaXmark } from "react-icons/fa6";
import './Flash.css'
import { useSelector, useDispatch } from "react-redux";
import { unsetError } from "../../redux/states/error/action";

export default function Flash({ className }) {
  const dispatch = useDispatch()
  const error = useSelector(store => store.error)
  const { isExist, type, message } = error

  function onCloseHandler(event){
    dispatch(unsetError)
  }

  return (
    <div className={`flash ${type} ${className} ${isExist ? '' : 'hidden'}`}>
      <p>{ message }</p>
      <FaXmark className="flash__close-button" onClick={onCloseHandler}/>
    </div>
  )
}

Flash.propTypes = {
  className: PropTypes.string,
}