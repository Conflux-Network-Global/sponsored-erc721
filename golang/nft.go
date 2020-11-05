package nft

import (
	conflux "github.com/Conflux-Chain/go-conflux-sdk"
	"github.com/Conflux-Chain/go-conflux-sdk/types"
  "github.com/ethereum/go-ethereum/common"
	"github.com/joho/godotenv"
	"os"
  "math/big"
  "fmt"
)

type NFT struct {
	Endpoint string
	Address  types.Address
	Client   *conflux.Client
	Contract *conflux.Contract
}

func New(url string, addr string, passphrase string) (NFT, error) {
	//load .env file
	err := godotenv.Load()
	if err != nil {
		return NFT{}, err
	}

	//set up client
	client, err := conflux.NewClient(url)
	if err != nil {
		return NFT{}, err
	}

	//set up account
	account := conflux.NewAccountManager("./keystore")
  _, err = account.GetDefault() //get dfault account
	if err != nil {
    //fallback to importing key if ./keystore doesn't exist
    _, err = account.ImportKey(os.Getenv("PRIVATE_KEY"), passphrase)
    if err != nil {
      return NFT{}, err
    }
	}


	client.SetAccountManager(account)
	a := types.Address(addr)

	//setup contract instance
	abi := ABI()
	contract, err := client.GetContract([]byte(abi), &a)

	return NFT{
		Endpoint: url,
		Address:  a,
		Client:   client,
		Contract: contract,
	}, nil
}

func (nft NFT) Mint(addr string, id string) (*types.Hash, error) {
  a := common.Address(addr)
  i := new(big.Int)
  i, ok := i.SetString(id, 10)
  if !ok {
    null := types.Hash("")
    return &null, fmt.Errorf("Invalid ID")
  }

  txhash, err := nft.Contract.SendTransaction(nil, "safeMint", a, i, byte(0))
  return txhash, err
}
