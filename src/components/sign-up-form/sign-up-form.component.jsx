import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.util";

import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";
import { signUpStart } from "../../store/user/user.action";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      // const response = await createAuthUserWithEmailAndPassword(
      //   email,
      //   password
      // );
      // //setCurrentUser(response.user);
      // await createUserDocumentFromAuth(response.user, { displayName });
      dispatch(signUpStart(email, password, displayName))
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use!");
      }
      console.log("user creation encountered an error", error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          value={displayName}
          required
          onChange={handleChange}
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          required
          onChange={handleChange}
        />

        <Button type="submit" buttonType="inverted">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
