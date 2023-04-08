import { useState, useEffect } from "react";
import ErrorModal from "../ErrorModal/ErrorModal";
import "./AddUser.css";

const AddUser = ({ oldUsers }) => {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [shouldShowErrorMessage, setShouldShowErrorMessage] = useState(false);
  const userNameElement = document.querySelector("#username");
  const userAgeElement = document.querySelector("#age");
  const modalElement = document.querySelector(".modal-container");

  const onUserNameChangeHandler = (event) => {
    setUserName(event.target.value);
  };

  const onUserAgeChangeHandler = (event) => {
    if (event.target.value[0] === "0") {
      event.target.value.slice(0);
    } else {
      setUserAge(event.target.value);
    }
  };

  const addUserButtonHandler = () => {
    const isUserDataValid = evaluateUserDataValidation();
    if (isUserDataValid) {
      setUsers((prevUsers) => [
        ...prevUsers,
        {
          username: userName,
          age: userAge,
          id: Math.floor(Math.random() * 10000),
        },
      ]);
      setUserName("");
      setUserAge("");
    }
  };

  const showErrorHandler = () => {
    setShouldShowErrorMessage(!shouldShowErrorMessage);
  };

  const evaluateUserDataValidation = () => {
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

  useEffect(() => {
    if (modalElement) setShouldShowErrorMessage(false);
  }, [shouldShowErrorMessage]);

  return (
    <>
      <div className="section-wrapper">
        <div className="input-section">
          <div className="input-item">
            <h3>Username</h3>
            <input
              type="text"
              onChange={onUserNameChangeHandler}
              placeholder="Enter Username"
              value={userName}
              id="username"
            />
          </div>
          <div className="input-item">
            <h3>Age (Years)</h3>
            <input
              type="number"
              onChange={onUserAgeChangeHandler}
              placeholder="Enter Age"
              value={userAge}
              id="age"
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
