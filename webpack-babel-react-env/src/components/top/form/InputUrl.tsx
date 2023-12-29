import { TextField } from "@mui/material";

import "./Input.css";

type InputUrlProps = {
  value: string;
  onChange: (newValue: string) => void;
};

function InputUrl({ value, onChange }: InputUrlProps) {
  return (
    <TextField
      className="url-input"
      value={value}
      placeholder="URL"
      type="text"
      onChange={(e) => onChange(e.target.value)}
      autoComplete="current-password"
    />
  );
}

export default InputUrl;
