import { useState, useEffect, useRef } from "react";
import ErrorModal from "../ErrorModal/ErrorModal";
import "./AddUser.css";

const AddUser = ({ oldUsers }) => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [shouldShowErrorMessage, setShouldShowErrorMessage] = useState(false);
  const modalElement = document.querySelector(".modal-container");
  const userInputRef = useRef();
  const ageInputRef = useRef();

  const addUserButtonHandler = () => {
    const isUserDataValid = evaluateUserDataValidation();
    if (isUserDataValid) {
      setUsers((prevUsers) => [
        ...prevUsers,
        {
          username: userInputRef.current.value,
          age: ageInputRef.current.value,
          id: Math.floor(Math.random() * 10000),
        },
      ]);
      userInputRef.current.value = "";
      ageInputRef.current.value = "";
    }
  };

  const showErrorHandler = () => {
    setShouldShowErrorMessage(!shouldShowErrorMessage);
  };

  const evaluateUserDataValidation = () => {
    const userName = userInputRef.current.value;
    const userAge = ageInputRef.current.value;
    let isUserDataValid = true;
    if (!userName || !userAge) {
      setErrorMessage({
        title: "Invalid Input",
        content: "Please enter a valid name and age (non-empty values).",
      });
      setShouldShowErrorMessage(true);
      isUserDataValid = false;
    } else if (userAge <= 0 || userAge > 120) {
      setErrorMessage({
        title: "Invalid Age",
        content: "Please enter a valid age (age > 0 and age < 120).",
      });
      setShouldShowErrorMessage(true);
      isUserDataValid = false;
    }

    return isUserDataValid;
  };

  useEffect(() => {
    oldUsers(users);
  }, [users]);

  return (
    <>
      <div className="section-wrapper">
        <div className="input-section">
          <div className="input-item">
            <h3>Username</h3>
            <input
              type="text"
              placeholder="Enter Username"
              id="username"
              ref={userInputRef}
            />
          </div>
          <div className="input-item">
            <h3>Age (Years)</h3>
            <input
              type="number"
              placeholder="Enter Age"
              id="age"
              ref={ageInputRef}
            />
          </div>
          <button onClick={addUserButtonHandler}>Add User</button>
        </div>
      </div>
      {!shouldShowErrorMessage ? null : (
        <ErrorModal
          errorMessage={errorMessage}
          isOkayButtonClicked={showErrorHandler}
        />
      )}
    </>
  );
};

export default AddUser;
