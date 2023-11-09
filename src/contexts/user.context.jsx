import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.util";

const useGeoLocationDetails = {
  currency: "£",
  region: "GB",
};

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  ...useGeoLocationDetails,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser, ...useGeoLocationDetails };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe; // cleanup actual method, this will remove observer and in turn will trigger complete state of onAuthStateChanged automatically
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
