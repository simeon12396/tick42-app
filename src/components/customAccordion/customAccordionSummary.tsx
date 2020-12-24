import { AccordionSummary, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { TVariant } from "../../misc/misc";

interface ICustomAccordionSummary {
  ariaControls: string;
  id: string;
  typoVariant: TVariant;
  typoTitle: string;
}

const CustomAccordionSummary = ({ ariaControls, id, typoVariant, typoTitle }: ICustomAccordionSummary): JSX.Element => {
  const styles = useStyles();

  return (
    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={ariaControls} id={id} classes={{ root: styles.subAccordionSummary }}>
      <Typography variant={typoVariant} classes={{ body2: styles.customBody2 }}>
        {typoTitle}
      </Typography>
    </AccordionSummary>
  );
};

export default CustomAccordionSummary;

const useStyles = makeStyles((theme) => ({
  customBody2: {
    color: theme.palette.primary.main,
  },
  subAccordionSummary: {
    padding: `0px 0px 0px ${theme.spacing(2)}px`,
  },
}));
