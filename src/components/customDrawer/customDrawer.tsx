import { AppBar, createStyles, CssBaseline, Divider, Drawer, IconButton, Theme, Toolbar, Typography, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { ReactChild, ReactChildren, useState } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import CustomAccordion from "../customAccordion/customAccordion";

interface IDrawer {
  title: string;
  children: ReactChild | ReactChildren;
}

const drawerWidth = 240;

const CustomDrawerLeft = ({ title, children }: IDrawer): JSX.Element => {
  const styles = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(styles.appBar, {
          [styles.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={clsx(styles.menuButton, open && styles.hide)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={styles.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: styles.drawerPaper,
        }}
      >
        <div className={styles.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
        </div>
        <Divider />
        <CustomAccordion />
      </Drawer>
      <main
        className={clsx(styles.content, {
          [styles.contentShift]: open,
        })}
      >
        <div className={styles.drawerHeader} />
        {children}
      </main>
    </div>
  );
};

export default CustomDrawerLeft;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      height: "100vh",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    accordionDetailsRoot: {
      display: "block",
      padding: `0px 0px 0px ${theme.spacing(2)}px`,
    },
    accordionRoot: {
      boxShadow: "none",
      margin: 0,

      "& .Mui-expanded": {
        marginRight: 0,
      },

      "&::before": {
        height: "0px",
      },
    },
    subAccordionSummary: {
      padding: `0px 0px 0px ${theme.spacing(2)}px`,
    },
    customBody2: {
      color: theme.palette.primary.main,
    },
    customCaption: {
      display: "block",
    },
    generalAccordion: {
      marginRight: theme.spacing(2),
    },
  })
);
