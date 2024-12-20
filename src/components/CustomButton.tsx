import { Button } from "@mui/material";
import { ReactNode } from "react";

export enum ButtonType {
    BUTTON = "button",
    SUBMIT = "submit",
    RESER = "reset",
}

interface IButton {
  name: any;
  type?: ButtonType,
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  icon?: ReactNode;
}

const CustomButton = ({ name, type, onClick, disabled = false, icon }: IButton) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      type={type}
      sx={{
        bgcolor: "#FFA21A",
        borderRadius: "10px",
        textTransform: "capitalize",
        "&:hover": {
          backgroundColor: "#FFA21A",
          opacity: 0.8,
          cursor: !disabled ? "pointer" : "not-allowed"
        },
        "&.Mui-disabled": {
          backgroundColor: "#E0E0E0",
          color: "#A0A0A0",
        },
      }}
      startIcon={icon}
    >
      {name}
    </Button>
  );
};

export default CustomButton;
