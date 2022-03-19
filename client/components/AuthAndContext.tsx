import React, { useState, useEffect, createContext } from 'react';
import SignIn from './SignIn';

//Takes entry value from SignIn form and verifies credentials
export const login = async (
  username: FormDataEntryValue | null,
  password: FormDataEntryValue | null
) => {
  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();
    if (data) {
      sessionStorage.setItem('user', JSON.stringify(data));
    }
    return data;
  } catch (err) {
    console.log('error:', err);
  }
};

export const isAuthenticated = () => {
  const user = sessionStorage.getItem('user');
  if (!user) return {};
  return JSON.parse(user);
};

// const UserContext = createContext(["", ]);

// export default function UserProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState("");

//   useEffect(() => {
//     const checkLoggedIn = () => {
//       let user = isAuthenticated();
//       if (user === null) {
//         sessionStorage.setItem('user', '');
//         user = '';
//       }
//       setCurrentUser(user);
//     };
//     checkLoggedIn();
//   }, []);

//   console.log('userContext', currentUser);

//   return (
//     <UserContext.Provider value={[currentUser, setCurrentUser]}>
//       {currentUser ? children : <SignIn />}
//     </UserContext.Provider>
//   );
// }

// export default UserContext;
