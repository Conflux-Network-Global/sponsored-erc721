package main

import (
	"fmt"
	nft "github.com/Conflux-Network-Global/sponsored-erc721/golang"
)

func main() {
	NFT, err := nft.New("http://test.confluxrpc.org", "0x8aa092e0660c59eab456efdbd39ae8d158e9a95b", "test")
	if err != nil {
		fmt.Println(err)
		return
	}

	// txhash, err := NFT.Mint("0x18e33e342b0f3fFE0b0193950FE9F2e0378a81Ee", "2")
	// if err != nil {
	//   fmt.Println(err)
	//   return
	// }
	// fmt.Println("Mint TX hash:", txhash)

	ids, err := NFT.GetAssets("0x18e33e342b0f3fFE0b0193950FE9F2e0378a81Ee")
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("NFT IDs:", ids)
}
