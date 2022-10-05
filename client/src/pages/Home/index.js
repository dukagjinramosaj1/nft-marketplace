import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Web3 from "web3";

import getWeb3 from "../../utils/getWeb3";
import { api } from "../../services/api";

import ArtMarketplace from "../../contracts/Marketplace.json";
import ArtToken from "../../contracts/NFT.json";

import {
  setNft,
  setAccount,
  setTokenContract,
  setMarketContract,
} from "../../redux/actions/nftActions";
import Card from "../../components/Card";

import { useStyles } from "./styles.js";


import social_offer_background from "../../assets/social_offer_background.png";


const Home = () => {
  const classes = useStyles();
  const nft = useSelector((state) => state.allNft.nft);
  const dispatch = useDispatch();

  useEffect(() => {
    let itemsList = [];
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();

        if (typeof accounts === undefined) {
          alert("Please login with Metamask!");
          console.log("login to metamask");
        }

        const networkId = await web3.eth.net.getId();
        try {
          const NFT_TokenContract = new web3.eth.Contract(
            ArtToken.abi,
            ArtToken.networks[networkId].address
          );
          // console.log("Contract: ", NFT_TokenContract);
          const marketplaceContract = new web3.eth.Contract(
            ArtMarketplace.abi,
            ArtMarketplace.networks[networkId].address
          );
          const totalSupply = await NFT_TokenContract.methods
            .totalSupply()
            .call();
          const totalItemsForSale = await marketplaceContract.methods
            .totalItemsForSale()
            .call();

          
          console.log("TOTAL SUPPLY",totalSupply)  
          for (var tokenId = 1; tokenId <= totalSupply; tokenId++) {
            let item = await NFT_TokenContract.methods.Items(tokenId).call();
            let owner = await NFT_TokenContract.methods.ownerOf(tokenId).call();

            const response = await api
              .get(`/tokens/${tokenId}`)
              .catch((err) => {
                console.log("Err: ", err);
              });
            console.log("response: ", response);

            itemsList.push({
              name: response.data.name,
              description: response.data.description,
              image: response.data.image,
              tokenId: item.id,
              creator: item.creator,
              owner: owner,
              uri: item.uri,
              isForSale: false,
              saleId: null,
              price: response.data.price,
              isSold: null,
            });
          }
          if (totalItemsForSale > 0) {
            for (var saleId = 0; saleId < totalItemsForSale; saleId++) {
              let item = await marketplaceContract.methods
                .itemsForSale(saleId)
                .call();
              let active = await marketplaceContract.methods
                .activeItems(item.tokenId)
                .call();

              let itemListIndex = itemsList.findIndex(
                (i) => i.tokenId === item.tokenId
              );

              itemsList[itemListIndex] = {
                ...itemsList[itemListIndex],
                isForSale: active,
                saleId: item.id,
                price: item.price,
                isSold: item.isSold,
              };
            }
          }

          dispatch(setAccount(accounts[0]));
          dispatch(setTokenContract(NFT_TokenContract));
          dispatch(setMarketContract(marketplaceContract));
          dispatch(setNft(itemsList));
        } catch (error) {
          console.error("Error", error);
          alert(
            "Contracts not deployed to the current network " +
            networkId.toString()
          );
        }
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.` +
          error
        );
        console.error(error);
      }
    };
    init();
  }, [dispatch]);

  console.log("Nft :", nft);

  const nftItem = useSelector((state) => state.allNft.nft);

  return (
    <div className={classes.homepage}>
      <section >
        <Grid justifyContent="center" alignItems="center" container  direction="row"  className={classes.gridBanner}>
          <Grid item xs={12} sm={6} >
            <img src={social_offer_background} alt="background" />
          </Grid>
          <Grid item xs={12} sm={6} >
            <Typography className={classes.title}>Discover, Collect, and Sell </Typography>
            <Typography className={classes.title}>Extraordinary NFTs </Typography>
            <Link to="/create-nft">
              <Button variant="contained" style={{backgroundColor:"#051362", color: 'white' }} disableElevation>
                Mint NFT
              </Button>
            </Link>
          </Grid>
        </Grid>
      </section>
      <section className={classes.allNfts}>
        <Typography className={classes.title}>NFTs </Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={5}
        >
          {nftItem.map((nft) => (
            <Grid item key={nft.tokenId}>
              <Card {...nft} />
            </Grid>
          ))}
        </Grid>
      </section>
    </div>
  );
};

export default Home;
