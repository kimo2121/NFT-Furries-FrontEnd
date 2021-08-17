import React, { useEffect, useState } from "react";
import "./MobileNavBar.css";
import { IconContext } from "react-icons";
import * as AiIcons from "react-icons/ai";
import logo from "../../assets/logo.png";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { useWeb3React } from "@web3-react/core";
import { truncateHashString, truncateWalletString } from "utils";

const MobileNavBar: React.FC = () => {
  const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
    },
    navbarContainer: {
      width: "100%",
      textAlign: "center",
      borderRadius: "0px",
      background: "black",
      display: "flex",
      height: "140px",
      lineHeight: "100px",
      flexDirection: "row-reverse",
      justifyContent: "space-between",
    },
    imgLogo: {
      width: "140px",
      height: "140px",
    },
    Logo: {
      textAlign: "center",
      borderRadius: "0px",
      lineHeight: "100px",
      float: "left",
      "&:hover": {
        cursor: "pointer",
      },
    },
    socials: {
      paddingTop: "7px",
      transition: "all .2s",
      fontSize: "22px",
      paddingBottom: "7px",
      color: "white",
      "&:hover": {
        cursor: "pointer",
      },
    },
    rarity: {
      paddingTop: "7px",
      fontSize: "22px",
      transition: "all .2s",
      textDecoration: "none",
      paddingBottom: "7px",
      margin: "4vh 0",
      color: "white",
      "&:hover": {
        cursor: "pointer",
      },
    },
    connectWallet: {
      paddingTop: "7px",
      transition: "all .2s",
      fontSize: "22px",
      textDecoration: "none",
      paddingBottom: "7px",
      color: "white",
      "&:hover": {
        cursor: "pointer",
      },
    },
  }));

  const classes = useStyles();

  const [sidebar, setSidebar] = useState(false);
  const [links, setLinks] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const ShowLinks = () => setLinks(!links);

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
      <IconContext.Provider value={{ color: "rgb(0, 0, 0)" }}>
        <div className="burger-menu-component">
          <div className="navbar">
            <div>
              <MenuIcon
                onClick={showSidebar}
                fontSize="large"
                className="burger-icon"
                style={{ marginRight: "12px", fill: "white" }}
              />
            </div>
          </div>
          <nav className={sidebar ? "burger-menu active" : "burger-menu"}>
            <div
              style={{
                margin: "margin 0",
                height: "100%",
                width: "100%",
              }}
            >
              <div className="burger-menu-content">
                <div onClick={ShowLinks} className={`${classes.socials}`}>
                  Socials
                </div>
                {links && (
                  <p className="hidden-shown-links">
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
                  </p>
                )}

                <Link to="/" className={classes.rarity}>
                  Rarity Chart/Attributes
                </Link>
                {loginStatus ? (
                  <div
                    style={{
                      color: "white",
                      fontSize: "22px",
                      width: "fit-content",
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
          </nav>
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default MobileNavBar;
