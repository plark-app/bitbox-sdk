/*
  Check the balance of the root address of an HD node wallet generated
  with the create-wallet example.
*/

// Set NETWORK to either testnet or mainnet
const NETWORK = `testnet`

// Instantiate bitbox.
const bitboxLib = "../../../dist/BITBOX"
const BITBOX = require(bitboxLib).BITBOX

// Instantiate SLP based on the network.
let bitbox
if (NETWORK === `mainnet`)
  bitbox = new BITBOX({ restURL: `https://rest.bitcoin.com/v2/` })
else bitbox = new BITBOX({ restURL: `https://trest.bitcoin.com/v2/` })

// Open the wallet generated with create-wallet.
try {
  var walletInfo = require(`../../applications/wallet/create-wallet/wallet.json`)
} catch (err) {
  console.log(
    `Could not open wallet.json. Generate a wallet with create-wallet first.`
  )
  process.exit(0)
}

const ADDR = walletInfo.cashAddress

async function getUtxos() {
  try {
    // first get BCH balance
    const utxos = await bitbox.Address.utxo(ADDR)

    console.log(`UTXO information for address ${ADDR}:`)
    console.log(utxos)
  } catch (err) {
    console.error(`Error in getUtxos: `, err)
    throw err
  }
}
getUtxos()
