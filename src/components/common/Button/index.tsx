import { Button } from "@mui/material";
import React from "react";
type ButtonComponentProps = {
  variant: "text" | "contained" | "outlined";
  type: "button"|"submit"|"reset"
};

export const ButtonComponent: React.FC<ButtonComponentProps> = ({
  variant,
  type
}) => {
  return (
    <Button
      variant={variant}
      size="large"
      sx={{ width: "50%", margin: "0 auto" }}
      type={type}
    >
      Button
    </Button>
  );
};
