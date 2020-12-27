import { Fab, FabProps } from "@material-ui/core";
import React from "react";

interface ICustomFabButtonProps extends FabProps {}

const CustomFabButton = (props: ICustomFabButtonProps): JSX.Element => {
  const { children } = props;

  return <Fab {...props}>{children}</Fab>;
};

export default CustomFabButton;
