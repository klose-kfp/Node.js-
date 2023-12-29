import React from "react";

import { TextField } from "@mui/material";

type InputPasswordProps = {
  value: string;
  showPass: boolean;
  onChange: (newValue: string) => void;
  onKeyDown: (e: any) => void;
};

function InputPassword({
  value,
  showPass,
  onChange,
  onKeyDown,
}: InputPasswordProps) {
  return (
    <TextField
      value={value}
      label="パスワード"
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => onKeyDown(e)}
      type={showPass ? "" : "password"}
      autoComplete="current-password"
    />
  );
}

export default InputPassword;
