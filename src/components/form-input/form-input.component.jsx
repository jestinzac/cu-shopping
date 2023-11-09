import { InputGroup, InputLabel, Input } from "./form-input.styles.jsx";

const FormInput = ({ label, ...inputOptions }) => {
  return (
    <InputGroup>
      <Input {...inputOptions} />
      {label && (
        <InputLabel shrink={inputOptions.value.length}>{label}</InputLabel>
      )}
    </InputGroup>
  );
};

export default FormInput;
