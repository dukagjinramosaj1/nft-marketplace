
### Requirements

To run the application you'll need:
* [Git](https://git-scm.com)
* [Node](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
* [Truffle](https://www.trufflesuite.com/)
* [Ganache](https://www.trufflesuite.com/ganache)

  
## :gear: Built With

This project was developed with the following technologies:

#### **Frontend** <sub><sup>React + JavaScript</sup></sub>
  - [React](https://pt-br.reactjs.org/)
  - [Axios](https://github.com/axios/axios)
  - [Redux](https://redux.js.org/)
  - [Web3.js](https://web3js.readthedocs.io/en/v1.3.4/)
  - [Material UI](https://material-ui.com/pt/)

#### **Backend** <sub><sup>Express</sup></sub>
  - [Express](https://expressjs.com/pt-br/)
 
#### **Blockchain and Smart Contracts** <sub><sup>Solidity</sup></sub>
  - [Solidity](https://docs.soliditylang.org/)
  - [Truffle](https://www.trufflesuite.com/)
  - [Ganache](https://www.trufflesuite.com/ganache)



Now go to project folder and run:

```bash
$ cd NFT-Marketplace

# install the dependencies
$ yarn

# run ganache
$ ganache-cli -p 8545 

# deploy de contracts on the blockchain
$ truffle migrate

# run the client-side
$ cd client
$ yarn
$ yarn start

# run the backend
$ cd backend
$ yarn
$ yarn start
```
