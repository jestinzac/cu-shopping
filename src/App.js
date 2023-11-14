import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import CheckOut from "./routes/checkout/checkout.component";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getCurrentUser,
} from "./utils/firebase/firebase.util";
import { checkUserSession } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch(); // There's only ever one instance of it, so it doesn't change at all and not required to pass as useEffect dependencies

  useEffect(() => {
    //getCurrentUser().then(user => console.log(user))
    dispatch(checkUserSession())
    /*const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;*/ // cleanup actual method, this will remove observer and in turn will trigger complete state of onAuthStateChanged automatically
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/shop/*" element={<Shop />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/checkout" element={<CheckOut />} />
      </Route>
    </Routes>
  );
};

export default App;
