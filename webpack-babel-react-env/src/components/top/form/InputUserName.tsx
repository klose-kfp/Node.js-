import { TextField } from "@mui/material";
import React from "react";

type UserNameProps = {
  value: string;
  onChange: (newValue: string) => void;
};

const doSome = () => {
  return "aaa";
};
type onChange2 = () => void;
const a: onChange2 = () => doSome();

function InputUserName({ value, onChange }: UserNameProps) {
  return (
    <TextField
      label="ユーザーネーム"
      value={value}
      placeholder="username"
      type="text"
      onChange={(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => onChange(e.target.value)}
      autoComplete="current-password"
    />
  );
}

export default InputUserName;
