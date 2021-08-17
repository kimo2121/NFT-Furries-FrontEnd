import React, { useEffect, useState } from "react";
import "./Mint.css";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { getContractInfo, truncateWalletString } from "utils";
import { useWeb3React } from "@web3-react/core";
import { getTotalSupply, purchase } from "utils/contracts";
import toast from "react-hot-toast";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      "& > *": {
        marginBottom: theme.spacing(2),
      },
      "& .MuiBadge-root": {
        marginRight: theme.spacing(4),
      },
    },
    buttonStyle: {
      boxShadow: "0 1px 2px 2px #00FF3A",
      background: "black",
      color: "#00FF3A",
      fontWeight: "bolder",
      width: "25px",
      height: "25px",
      borderRadius: "5px",
      "&:hover": {
        backgroundColor: "white",
      },
      "&:disabled": {
        color: "#00FF3A",
      },
    },
    rootButton: {
      background: "black",
      borderRadius: 8,
      border: 0,
      color: "#00FF3A",
      fontWeight: "bolder",
      fontSize: "1.6vmax",
      height: 50,
      padding: "0 30px",
      boxShadow: "0 1px 2px 2px #00FF3A",
      "&:hover": {
        backgroundColor: "white",
      },
    },
    label: {
      textTransform: "capitalize",
    },
  })
);

const Mint: React.FC = () => {
  const classes = useStyles();
  const [count, setCount] = React.useState(1);

  const [totalSupply, setTotalSupply] = useState(0);
  const [loggedin, setLoggedin] = useState<boolean>(false);

  const { connector, library, chainId, account, active } = useWeb3React();

  useEffect(() => {
    const isLoggedin =
      account &&
      active &&
      chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
    setLoggedin(isLoggedin);
    if (isLoggedin) {
      getTotalSupply(chainId, library).then((_totalSupply) => {
        setTotalSupply(_totalSupply);
      });
    }
  }, [connector, library, account, active, chainId]);

  const contractAddress = getContractInfo("NFFurries").address;

  const funcMintTokens = async () => {
    if (count <= 0) {
      toast.error("Mint Count should be over than 0");
      return;
    }
    const load_toast_id = toast.loading("Plesae wait for Mint...");
    try {
      const bSuccess = await purchase(chainId, library.getSigner(), count);
      if (bSuccess) {
        toast.success("Mint Success!");

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.error("Mint Failed!");
      }
    } catch (error) {
      toast.error(error.message);
    }
    toast.dismiss(load_toast_id);
  };

  return (
    <div className="mint-component">
      <div className="counter-button-container">
        <h1>Mint your Non-Fungible Furry</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "2vh",
          }}
        >
          <div className={classes.root}>
            <div>
              <ButtonGroup
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "3vw",
                }}
              >
                <Button
                  className={classes.buttonStyle}
                  aria-label="reduce"
                  onClick={() => {
                    setCount(Math.max(count - 1, 0));
                  }}
                  disabled={count === 0}
                >
                  <RemoveIcon
                    style={{ fontWeight: "bolder", fontSize: "1.6vmax" }}
                  />
                </Button>
                <Button
                  disabled
                  style={{
                    boxShadow: "0 1px 2px 2px #00FF3A",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 10px",
                    background: "black",
                    color: "#00FF3A",
                    fontSize: "1.3vmax",
                    fontWeight: "bolder",
                    borderRadius: "8px",
                  }}
                >
                  {count}
                </Button>
                <Button
                  className={classes.buttonStyle}
                  aria-label="increase"
                  onClick={() => {
                    setCount(count + 1);
                  }}
                  disabled={count === 5}
                >
                  <AddIcon
                    style={{ fontWeight: "bold", fontSize: "1.5vmax" }}
                  />
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <Button
            classes={{
              root: classes.rootButton,
              label: classes.label,
            }}
            onClick={funcMintTokens}
          >
            Mint
          </Button>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <span style={{ marginRight: "5vw" }}>Minted {totalSupply} / 500</span>
          <span>0.14 ETH each</span>
        </div>
      </div>
      <div className="counter-div quantity-address">
        <span>Contract address : {truncateWalletString(contractAddress)}</span>
      </div>
    </div>
  );
};

export default Mint;
