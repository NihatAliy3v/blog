import { Button } from "@mui/material";
import React from "react";
type ButtonComponentProps = {
  variant: "text" | "contained" | "outlined";
  type: "button" | "submit" | "reset";
  text: string;
};

export const ButtonComponent: React.FC<ButtonComponentProps> = ({
  variant,
  type,
  text,
}) => {
  return (
    <Button
      variant={variant}
      size="large"
      sx={{ margin: "0 auto" }}
      type={type}
      fullWidth
    >
      {text}
    </Button>
  );
};
