import { Fab, FabProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { NavLink } from "react-router-dom";

interface ICustomFabButtonProps extends FabProps {
  isLink: boolean;
}

const CustomFabButton = (props: ICustomFabButtonProps): JSX.Element => {
  const { children, isLink } = props;
  const styles = useStyles();

  if (isLink) {
    return (
      <Fab {...props}>
        <NavLink to="/add-project" className={styles.link}>
          {children}
        </NavLink>
      </Fab>
    );
  }

  return <Fab {...props}>{children}</Fab>;
};

export default CustomFabButton;

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.secondary.main,
  },
}));
