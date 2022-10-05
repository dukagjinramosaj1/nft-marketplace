const NFT_Token = artifacts.require("NFT");
const Marketplace = artifacts.require("Marketplace");

module.exports = async function(deployer) {
  await deployer.deploy(NFT_Token);

  const token = await NFT_Token.deployed()

  await deployer.deploy(Marketplace, token.address)

  const market = await Marketplace.deployed()

  await token.setMarketplace(market.address)
};
