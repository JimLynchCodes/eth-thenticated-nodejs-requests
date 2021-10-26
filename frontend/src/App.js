import logo from './dolla-bills.png';
import './App.css';
import Web3 from 'web3';

function App() {

  async function sendSignedMessage() {
    console.log('sending signedMessage!')
    await callEndpointAsUser();
  }
  
  async function sendForgedMessage() {
    console.log('sending forged Message!')
    await callEndpointAsUser("0x0000000000000000000000000000000000000000");
  }

  async function callEndpointAsUser(forgedAddress) {

    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        console.log(accounts)


        const dataToSend = {
          signedAs: forgedAddress || accounts[0],
          sender: 'Jim',
          number: 42,
          otherStuff:
            { greeting: 'hello! ' }
        }

        // const accounts = web3.eth.accounts.getAcounts();

        console.log('signing...')

        // const signedPayload = await web3.eth.sign(JSON.stringify(dataToSend), accounts[0]);
        const signedPayload = await web3.eth.personal.sign(JSON.stringify(dataToSend), accounts[0]);

        // console.log('sign err: ', err)
        console.log('data to send, ', dataToSend);
        console.log('signed data to send, ', signedPayload);

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dataToSend,
            signedPayload
          })
        };

        const response = await fetch('http://localhost:3000/example', requestOptions);
        const data = await response.json();

        console.log('got a response: ', data);
        // });



      } catch (error) {
        console.log("User denied account access...")
        // User denied account access...
      }
    }

    // try {
    // const provider = window['ethereum'] || Web3.givenProvider;

    // const web3 = new Web3(provider);


    //   const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    //   web3.eth.getAccounts().then(console.log);

    //   const dataToSend = { sender: 'Jim', number: 42, otherStuff: { greeting: 'hello! ' } }

    //   const accounts = web3.eth.accounts.getAcounts();

    //   const signedPayload = web3.eth.sign(dataToSend, accounts[0]);

    //   const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       dataToSend,
    //       signedPayload
    //     })
    //   };

    //   const response = await fetch('http://localhost:3000/example', requestOptions);
    //   const data = await response.json();

    //   console.log('got a response: ', data);

    // } catch (err) {
    //   throw new Error('Non-Ethereum browser detected. You should consider trying Mist or MetaMask!');
    // }




  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br />
        <p>
          Click to send a signed message!
        </p>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}

        <button onClick={(e) => sendSignedMessage()}>Send signed message!</button>

        <br />

        <button onClick={(e) => sendForgedMessage()}>Send forged message!</button>

      </header>
    </div>
  );
}

export default App;
