import AddUser from "./components/AddUser/AddUser";
import ShowUsers from "./components/ShowUsers/ShowUsers";
import { useState } from "react";
import "./App.css"

function App() {
  let [users, setUsers] = useState([]);
  const recievedUsers = (newUsers) =>
    setUsers(newUsers);

  return (
    <>
      <AddUser oldUsers={recievedUsers} />
      <ShowUsers users={users} />
    </>
  );
}

export default App;
