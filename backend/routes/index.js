var express = require('express');
var router = express.Router();

var Web3 = require('web3');

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

router.use(cors(corsOptions))

/* GET home page. */

router.post('/example', async function(req, res, next) {

  var web3 = new Web3("https://rinkeby.infura.io/v3/2fad09ea5c184cff844b1467c8616d6b");

  const signerAddress = await web3.eth.accounts.recover(JSON.stringify(req.body.dataToSend), req.body.signedPayload)

  if (signerAddress !== req.body.dataToSend.signedAs) {
    res.status(403).send(new Error('Message incorrectly signed.'));
  }

  // do other stuff with "signerAddress" as your authenticated "msg.sender" value
  // and "req.body.dataToSend" from user

  res.json({ success: 'successfully did stuff!'})

});

module.exports = router;
