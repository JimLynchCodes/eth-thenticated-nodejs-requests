# eth-thenticated-nodejs-requests
Example of validating sender address of a post request on a nodejs backend

<br/>
<br/>

# What's Here

1. Frontend

A react project (made with create-react-app) that has only one button- "send stuff" which sends some json data and the signed request.

Note that this project ***does not connect to any smart contract***.

Instead, it uses metamask and web3 to create a signed message and then sends it off to our nodejs backend server.

{
   sender: "0x123123123123",
   number: 15,
   action: "attack"
}

2. Backend

An express.js server-side node.js project with a single post endpoint, handling the "send stuff" call from our single button.

This project also uses web3, but instead of singing a message it uses the "web3.eth.accounts.recover" to recover the signer address.

We return an error if the user tries to call with a post body where "sender" is different from the signer address. 

_This then gives us a "msg.sender" gaurentee in node.js the same as we have in solidity!_


