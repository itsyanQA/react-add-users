import "./ShowUsers.css";

const ShowUsers = ({ users }) => {
  return (
    <div className="users-wrapper">
      <ul style={{ display: users.length > 0 ? "block" : "none" }}>
        {users.map((user) => {
          return (
            <li key={user.id}>{`${
              user.username.charAt(0).toUpperCase() + user.username.slice(1)
            } (${user.age} years old)`}</li>
          );
        })}
      </ul>
    </div>
  );
};
export default ShowUsers;
