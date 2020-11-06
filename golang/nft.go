package nft

import (
	"fmt"
	conflux "github.com/Conflux-Chain/go-conflux-sdk"
	"github.com/Conflux-Chain/go-conflux-sdk/types"
	"github.com/joho/godotenv"
	"math/big"
	"os"
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
	_, err = account.GetDefault() //get default account
	if err != nil {
		//fallback to importing key if ./keystore doesn't exist
		_, err = account.ImportKey(os.Getenv("PRIVATE_KEY"), passphrase)
		if err != nil {
			return NFT{}, err
		}
	}
	err = account.UnlockDefault(passphrase)
	if err != nil {
		return NFT{}, err
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
	a := types.Address(addr)
	i := new(big.Int)
	i, ok := i.SetString(id, 10)
	if !ok {
		null := types.Hash("")
		return &null, fmt.Errorf("Invalid ID")
	}

	txhash, err := nft.Contract.SendTransaction(nil, "safeMint", a.ToCommonAddress(), i)
	return txhash, err
}

func (nft NFT) GetAssets(addr string) ([]big.Int, error) {
	a := types.Address(addr)

	balance := &big.Int{}
	err := nft.Contract.Call(nil, &balance, "balanceOf", a.ToCommonAddress())
	if err != nil {
		return []big.Int{}, err
	}

	ids := make([]big.Int, balance.Int64())
	for i := 0; int64(i) < balance.Int64(); i++ {
		id := &big.Int{}
		err := nft.Contract.Call(nil, &id, "tokenOfOwnerByIndex", a.ToCommonAddress(), big.NewInt(int64(i)))
		if err != nil {
			return []big.Int{}, err
		}
		ids[i] = *id
	}

	return ids, err
}
