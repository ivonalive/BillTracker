import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function LogOutButton(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/login'); // Redirect to login page after logout
  };

  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // depending on where it is used, so it accepts props
      className={props.className}
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;