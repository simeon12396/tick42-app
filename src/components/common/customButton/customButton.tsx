import { Button, ButtonProps } from "@material-ui/core";
import { TButton } from "../../../misc/misc";

interface TCustommButtonprops extends ButtonProps {
  onClick?: (e: any) => void;
  type: TButton;
}

const CustomButton = (props: TCustommButtonprops): JSX.Element => {
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
