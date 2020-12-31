import React from "react";

import PopupWithForm from "../PopupWithForm/PopupWithForm";

function ConfirmDelete(props) {
  function closePopup(e) {
    props.closePopup();
  }

  function onSubmit() {
    props.onSubmit();
  }

  return (
    <PopupWithForm
      isOpened={props.isOpened}
      onClose={closePopup}
      popupTitle="Delete article"
      onSubmit={onSubmit}
    >
      <button className={`popup__submit`}>Delete</button>
    </PopupWithForm>
  );
}

export default ConfirmDelete;
