import { Button, ButtonProps } from "@material-ui/core";
import React from "react";
import { TButton } from "../../../misc/misc";

interface TCustommButtonProps extends ButtonProps {
  onClick?: (e: any) => void;
  type: TButton;
}

const CustomButton = (props: TCustommButtonProps): JSX.Element => {
  const { onClick, type } = props;

  if (type === "submit") {
    return (
      <Button {...props} onClick={onClick}>
        Submit
      </Button>
    );
  }

  return <Button {...props}>Submit</Button>;
};

export default CustomButton;
