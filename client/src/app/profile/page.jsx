"use client";
import { WalletContext } from "@/context/wallet";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import MarketplaceJson from "../marketplace.json";
import styles from "./profile.module.css";
import axios from "axios";
import NFTTile from "../components/nftCard/NFTCard";

export default function Profile() {
    const [items, setItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState("0");
    const { isConnected, userAddress, signer } = useContext(WalletContext);

    async function getNFTitems() {
        let sumPrice = 0;
        const itemsArray = [];
        if (!signer) {
            console.error("No signer available");
            return { itemsArray, sumPrice };
        }

        try {
            const contract = new ethers.Contract(
                MarketplaceJson.address,
                MarketplaceJson.abi,
                signer
            );

            const walletAddress = await signer.getAddress();
            console.log("Fetching NFTs for wallet:", walletAddress);

            const transaction = await contract.getMyNFTs();
            console.log("Transaction data:", transaction);

            for (const i of transaction) {
                try {
                    const tokenId = parseInt(i.tokenId);
                    const tokenURI = await contract.tokenURI(tokenId);
                    console.log(`Token URI for tokenId ${tokenId}: ${tokenURI}`);

                    // Fetch metadata from tokenURI
                    const meta = (await axios.get(tokenURI)).data;
                    console.log("Metadata fetched:", meta);

                    const price = ethers.formatEther(i.price);

                    // Construct NFT item
                    const item = {
                        price,
                        tokenId,
                        seller: i.seller,
                        owner: i.owner,
                        image: meta.image,
                        name: meta.name,
                        description: meta.description,
                    };

                    itemsArray.push(item);
                    sumPrice += Number(price);
                } catch (error) {
                    console.error("Error processing token:", i.tokenId, error);
                }
            }
        } catch (error) {
            console.error("Error fetching NFTs from contract:", error);
        }

        return { itemsArray, sumPrice };
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { itemsArray, sumPrice } = await getNFTitems();
                setItems(itemsArray);
                setTotalPrice(sumPrice);
            } catch (error) {
                console.error("Error in fetchData:", error);
            }
        };

        if (isConnected) {
            fetchData();
        }
    }, [isConnected, signer]);

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.content}>
                    {isConnected ? (
                        <>
                            <div className={styles.userInfo}>
                                <span className={styles.label}>Wallet Address:</span>
                                <span className={styles.address}>{userAddress}</span>
                            </div>
                            <div className={styles.stats}>
                                <div className={styles.stat}>
                                    <span className={styles.label}>Number of NFTs:</span>
                                    <span className={styles.value}>{items.length}</span>
                                </div>
                                <div className={styles.stat}>
                                    <span className={styles.label}>Total Value:</span>
                                    <span className={styles.value}>{totalPrice} Avax</span>
                                </div>
                            </div>
                            <div className={styles.nftSection}>
                                <h2 className={styles.heading}>Your NFTs</h2>
                                {items.length > 0 ? (
                                    <div className={styles.nftGrid}>
                                        {items.map((value, index) => (
                                            <NFTTile item={value} key={index} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className={styles.noNFT}>You don't have any NFT...</div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className={styles.notConnected}>You are not connected...</div>
                    )}
                </div>
            </div>
        </div>
    );
}
