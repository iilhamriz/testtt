import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  smPg: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    },
  },
}));
