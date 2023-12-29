import { TextField } from "@mui/material";

type InputMailAddressProps = {
  value: string;
  onChange: (newValue: string) => void;
};

const regexpEmail =
  /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

function InputMailAddress({ value, onChange }: InputMailAddressProps) {
  return (
    <TextField
      label="メールアドレス"
      placeholder="メールアドレス"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={(regexpEmail.test(value) && value) || !value ? false : true}
      helperText={
        (regexpEmail.test(value) && value) || !value
          ? null
          : "Incorrect Email address format."
      }
      autoComplete="current-password"
    />
  );
}

export default InputMailAddress;
