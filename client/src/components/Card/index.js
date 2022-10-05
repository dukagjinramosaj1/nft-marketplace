import React from "react";
import { Link, useParams } from "react-router-dom";
import Web3 from "web3";
import { Card as MuiCard } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import SvgIcon from "@material-ui/core/SvgIcon";
import Divider from "@material-ui/core/Divider";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedNft, removeSelectedNft } from "../../redux/actions/nftActions";


import { useStyles } from "./styles.js";
import { ReactComponent as EthereumLogo } from "../../assets/ethereum_logo.svg";

const Card = ({ tokenId, name, image, price, owner, isForSale }) => {
  const classes = useStyles();

  // const status = { minted:"minted", buy:"Buy", sold:"sold" }

  const status = {
    false: { title: 'Sold', color: 'light-danger' },
    true: { title: 'Buy', color: 'light-primary' }
  }



  const { nftId } = useParams();
  const marketplaceContract = useSelector(
    (state) => state.allNft.marketplaceContract
  );
  const account = useSelector((state) => state.allNft.account);
  let nft = useSelector((state) => state.nft);
  let nftItem = useSelector((state) =>
    state.allNft.nft.filter((nft) => nft.tokenId === nftId)
  );
  const {
    creator,
    description,
    saleId,
    isSold,
  } = nft;
  const dispatch = useDispatch();
  useEffect(() => {
    if (nftId && nftId !== "" && nftItem) dispatch(selectedNft(nftItem[0]));
    return () => {
      dispatch(removeSelectedNft());
    };
  }, [nftId]);


  console.log("image: ", image);
  return (
    <Link to={`/nft/${tokenId}`}>
      <MuiCard className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={name}
            height="240"
            image={image}
            title={name}
          />
          <CardContent className={classes.content}>
            <div className={classes.title}>
              <Typography
                className={"MuiTypography--heading"}
                variant={"h5"}
                gutterBottom
              >
                {name}
              </Typography>
              
                {owner == account && !isForSale ?
                  <Chip
                    size="small"
                    // disabled={true}
                    label="Sell"
                    className={classes.sellBadge}
                  />
                  : ""}

                 { owner !== account && isForSale ?
                    <Chip
                    size="small"
                    // disabled={true}
                    label="Buy"
                    className={classes.buyBadge}
                  />
                  : "" }
                  

            </div>
            <Typography variant="h6" className={classes.price}>
              <SvgIcon
                component={EthereumLogo}
                viewBox="0 0 400 426.6"
                titleAccess="ETH"
              />
              <span>{Web3.utils.fromWei(String(price), "ether")}</span>
            </Typography>
            <Divider className={classes.divider} light />
            <Typography
              variant={"body1"}
              align={"center"}
              className={classes.seller}
            >
              Owner:   {owner.slice(0, 7)}...{owner.slice(-4)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </MuiCard>
    </Link>
  );
};

export default Card;
