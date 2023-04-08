import { useState } from "react";
import "./ErrorModal.css";

const ErrorModal = ({ errorMessage, isOkayButtonClicked }) => {
  const [modalStatus, setModalStatus] = useState(true);

  const okayButtonClickHandler = () => {
    setModalStatus(!modalStatus);
    isOkayButtonClicked(modalStatus);
  };

  const clickOnBackground = (event) => {
    if (event.target.className === "modal-background") {
      setModalStatus(!modalStatus);
      isOkayButtonClicked(modalStatus);
    }
  };

  return (
    <div onClick={clickOnBackground} className="modal-background">
      <div
        className="modal-container"
        style={{ display: modalStatus ? "flex" : "none" }}
      >
        <div className="label-wrapper">
          <h3>{errorMessage.title}</h3>
        </div>
        <span id="modal-content">{errorMessage.content}</span>
        <div id="button-wrapper">
          <button onClick={okayButtonClickHandler}>Okay</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
