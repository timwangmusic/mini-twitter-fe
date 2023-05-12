import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import axios from "axios";

export function UserDropdown({ setUser }) {
  const [usernames, setUsernames] = useState([]);

  const handleSelect = (k, _e) => {
    setUser({ name: k });
  };

  useEffect(() => {
    const fetchUsers = async () =>
      await axios
        .get("/users")
        .then((response) => {
          setUsernames(response.data.users);
        })
        .catch(console.error);

    fetchUsers();
  }, []);

  return (
    <Dropdown onSelect={handleSelect} data-testid='user-dropdown'>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select User
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {usernames.map((username) => (
          <Dropdown.Item key={username} eventKey={username}>
            {username}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
