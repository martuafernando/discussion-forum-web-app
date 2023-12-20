import React from "react";
import './CreateThread.css'
import ModalLayout from "@components/layouts/modal-layout/ModalLayout";
import SpinningCircle from "@components/spinning-circle/SpinningCircle";
import { FaXmark } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import Flash from "@components/flash/Flash";
import { useNavigate } from "react-router-dom";
import { asyncCreateThread } from "../../redux/states/thread/action";
import useInput from "../../hooks/useInput";

export default function CreateThread() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loading = useSelector(store => store.loadingBar)
  const user = useSelector(store => store.user)
  const [body, onBodyChanged] = useInput('')

  function onCloseHandler(){
    navigate('/')
  }

  function onSubmitHandler(event) {
    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)
    const { title, category } = Object.fromEntries(formData.entries())

    dispatch(asyncCreateThread({ title, category, body, user, onSuccessCallback: onCloseHandler }))
  }

  return (
    <ModalLayout>
      <div className="create-thread">
        <div className="create-thread__title">
          <h2>Create Thread</h2>
          <FaXmark className="flash__close-button" onClick={onCloseHandler}/>
        </div>
        <Flash />
        <form className="create-thread__form" onSubmit={onSubmitHandler}>
          <input type="text" name="title" id="title" placeholder="Title"/>
          <input type="text" name="category" id="category" placeholder="Category"/>
          <div
            className="textarea"
            onInput={ onBodyChanged }
            data-placeholder="What are you thinking?"
            contentEditable/>
          <button
            className="create-thread__action button-filled"
            type="submit"
            disabled={ loading.default }
            >{ loading.default ? <SpinningCircle /> : 'Publish' }
          </button>
        </form>
      </div>
    </ModalLayout>
  )
}