import { Box, TextField } from "@mui/material";
import React from "react";

type InputFieldProps = {
  label: string;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  name,
}) => {
  return (
    <Box>
      <TextField
        label={label}
        name={name}
        value={value}
        fullWidth
        onChange={onChange}
      />
    </Box>
  );
};
