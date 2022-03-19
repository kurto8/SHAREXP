import React, { useState, useEffect, createContext } from 'react';
import SignIn from './SignIn';

export interface AuthProps {
  user: string | undefined,
  logIn: (name: string) => void,
  logOut: () => void,
}

export const UserContext = createContext({} as AuthProps);

export default function UserProvider(props: {children: React.ReactNode}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');

  const logIn = (name: string) => {
    setUser(name)
    setLoggedIn(true);
  }

  const logOut = () => {
    setUser('')
    setLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ user, logIn, logOut }}>
      {loggedIn ? props.children : <SignIn />}
    </UserContext.Provider>
  );
}

//Takes entry value from SignIn form and verifies credentials
export const authenticate = async (
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
    // if (data) {
    //   sessionStorage.setItem('user', JSON.stringify(data));
    // }
    return data;
  } catch (err) {
    console.log('error:', err);
  }
};

// const isAuthenticated = () => {
//   const user = sessionStorage.getItem('user');
//   if (!user) return {};
//   return JSON.parse(user);
// };
