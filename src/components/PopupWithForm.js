import React from "react";

function PopupWithForm() {
  return (
    <div className="popup section">
      <div className="popup__dialog-window">
        <form noValidate autoComplete="off">
            <h2 className="popup__title">Sign Up</h2>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
