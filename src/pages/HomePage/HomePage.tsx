import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Mint from "../../components/Mint/Mint";
import NF_Furry_1 from "../../images/nf-furry1.jpg";
import NF_Furry_2 from "../../images/nf-furry2.jpg";
import NF_Furry_3 from "../../images/nf-furry3.jpg";

import "./Home.css";
import FurriesTags from "../../components/FurriesTags/FurriesTags";

const MainPage: React.FC = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      textAlign: "center",
      color: theme.palette.text.secondary,
      borderRadius: "0px",
      backgroundColor: "black",
    },
    furryImg: {
      width: "80%",
      height: "80%",
    },
  }));

  const classes = useStyles();

  return (
    <div style={{ backgroundColor: "black" }}>
      <FurriesTags />
      <Mint />
      <div className="cards-container">
        <div>
          <p>
            AC3
            <br />
            Project Lead
          </p>
          <img className={classes.furryImg} src={NF_Furry_1} alt="logo" />
        </div>
        <div>
          <p>
            LemonCrypto
            <br />
            Technical Manager
          </p>
          <img className={classes.furryImg} src={NF_Furry_2} alt="logo" />
        </div>
        <div>
          <p>
            J<em>i</em>
            ve
            <br />
            Artist
          </p>
          <img className={classes.furryImg} src={NF_Furry_3} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
