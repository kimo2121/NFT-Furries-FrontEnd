import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { useWeb3React } from "@web3-react/core";
import { truncateWalletString } from "utils";
const Navbar: React.FC = () => {
  const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
    },
    navbarContainer: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      textAlign: "center",
      borderRadius: "0px",
      background: "black",
      height: "190px",
    },
    imgLogo: {
      width: "190px",
      height: "190px",
    },
    Logo: {
      textAlign: "center",
      borderRadius: "0px",
      "&:hover": {
        cursor: "pointer",
      },
    },
    socials: {
      color: "white",
      transition: "all .2s",
      display: "inline",
      borderRadius: "5px",
      fontSize: "22px",
      padding: "10px 20px",
      textUnderlineOffset: "4px",
      textDecoration: "none",
      "&:hover": {
        color: "black",
        background: "white",
        cursor: "pointer",
      },
    },
    rarity: {
      padding: "10px 20px",
      transition: "all .2s",
      borderRadius: "5px",
      textUnderlineOffset: "4px",
      fontSize: "22px",
      color: "white",
      textDecoration: "none",
      display: "inline",
      "&:hover": {
        color: "black",
        background: "white",
        cursor: "pointer",
      },
    },
    connectWallet: {
      padding: "10px 20px",
      borderRadius: "5px",
      textUnderlineOffset: "4px",
      fontSize: "22px",
      color: "white",
      background: "purple",
      display: "inline",
      transition: "all .2s",
      "&:hover": {
        background: "orange",
        cursor: "pointer",
      },
    },
  }));

  const classes = useStyles();

  const { login } = useAuth();
  const [loginStatus, setLoginStatus] = useState(false);

  const { connector, library, chainId, account, active } = useWeb3React();

  useEffect(() => {
    const isLoggedin =
      account &&
      active &&
      chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
    if (isLoggedin) {
    }
    setLoginStatus(isLoggedin);
  }, [connector, library, account, active, chainId]);

  return (
    <div className={classes.navbarContainer}>
      <div className={classes.Logo}>
        <img className={classes.imgLogo} src={logo} alt="logo" />
      </div>
      <div
        style={{
          width: "620px",
          alignItems: "center",
          display: "flex",
          justifyContent: "space-evenly",
          paddingRight: "5vw",
        }}
      >
        <div className={`${classes.socials} social-navlink`}>
          Socials
          <div className="social-links">
            <a
              href="https://twitter.com/NF_Furries"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://discord.gg/VVVuBW36EU"
              target="_blank"
              rel="noreferrer"
            >
              Discord
            </a>
          </div>
        </div>
        <Link to="/" className={classes.rarity}>
          Rarity Chart/Attributes
        </Link>
        {loginStatus ? (
          <div
            style={{
              color: "white",
              fontSize: "22px",
              outline: "1px",
              background: "orange",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
          >
            {truncateWalletString(account)}
          </div>
        ) : (
          <div onClick={login} className={classes.connectWallet}>
            Connect Wallet
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
