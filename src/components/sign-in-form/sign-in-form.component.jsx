import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.util";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action"

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // await signInAuthUserWithEmailAndPassword(
      //   email,
      //   password
      // );
      dispatch(emailSignInStart(email, password))
      resetFormFields();
    } catch (error) {
      // if (error.code === "auth/wrong-password") {
      //   alert("incorrect password for email");
      // } else if (error.code === "auth/user-not-found") {
      //   alert("no user associated with this email");
      // }
      console.log('user sign in failed', error);
    }
  };

  const signInWithGoogle = async () => {
    //await signInWithGooglePopup();
    dispatch(googleSignInStart())
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          required
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          required
          onChange={handleChange}
        />

        <div className="buttons-container">
          <Button type="submit">
            Sign In
          </Button>
          <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
