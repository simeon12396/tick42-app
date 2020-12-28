import { TextField, TextFieldProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const CustomTextField = (props: TextFieldProps) => {
  const styles = useStyles();
  return <TextField {...props} />;
};

export default CustomTextField;

const useStyles = makeStyles((theme) => ({}));
