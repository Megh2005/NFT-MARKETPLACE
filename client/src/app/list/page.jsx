"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import marketplace from "./../marketplace.json";
import { ethers } from "ethers";
import { WalletContext } from "@/context/wallet";

export default function SellNFT() {
    const [formParams, updateFormParams] = useState({
        name: "",
        description: "",
        price: "",
    });
    const [fileURL, setFileURL] = useState();
    const [message, updateMessage] = useState("");
    const [btn, setBtn] = useState(false);
    const [btnContent, setBtnContent] = useState("List NFT");
    const router = useRouter();
    const { isConnected, signer } = useContext(WalletContext);

    async function onFileChange(e) {
        try {
            const file = e.target.files[0];
            const data = new FormData();
            data.set("file", file);
            setBtn(false);
            updateMessage("Uploading image... Please don't click anything!");
            const response = await uploadFileToIPFS(data);
            if (response.success === true) {
                setBtn(true);
                updateMessage("");
                setFileURL(response.pinataURL);
            }
        } catch (e) {
            console.log("Error during file upload...", e);
        }
    }

    async function uploadMetadataToIPFS() {
        const { name, description, price } = formParams;
        if (!name || !description || !price || !fileURL) {
            updateMessage("Please fill all the fields!");
            return -1;
        }

        const nftJSON = {
            name,
            description,
            price,
            image: fileURL,
        };

        try {
            const response = await uploadJSONToIPFS(nftJSON);
            if (response.success === true) {
                return response.pinataURL;
            }
        } catch (e) {
            console.log("Error uploading JSON metadata: ", e);
        }
    }

    async function listNFT(e) {
        try {
            setBtnContent("Processing...");
            const metadataURL = await uploadMetadataToIPFS();
            if (metadataURL === -1) return;

            updateMessage("Uploading NFT...Please don't click anything!");

            let contract = new ethers.Contract(
                marketplace.address,
                marketplace.abi,
                signer
            );
            const price = ethers.parseEther(formParams.price);

            let transaction = await contract.createToken(metadataURL, price);
            await transaction.wait();

            setBtnContent("List NFT");
            setBtn(false);
            updateMessage("");
            updateFormParams({ name: "", description: "", price: "" });
            alert("Successfully listed your NFT!");
            router.push("/list");
        } catch (e) {
            alert("Upload error", e);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            {isConnected ? (
                <div className="w-full max-w-xl p-6 bg-gray-800 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6">Upload your NFT</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">NFT Name</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 text-gray-900 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formParams.name}
                                onChange={(e) =>
                                    updateFormParams({ ...formParams, name: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">NFT Description</label>
                            <textarea
                                className="w-full px-3 py-2 text-gray-900 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={4}
                                value={formParams.description}
                                onChange={(e) =>
                                    updateFormParams({ ...formParams, description: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Price (in Avax)</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 text-gray-900 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formParams.price}
                                onChange={(e) =>
                                    updateFormParams({ ...formParams, price: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Upload Image</label>
                            <input
                                type="file"
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                                onChange={onFileChange}
                            />
                        </div>
                        <div className="text-center text-red-500">{message}</div>
                        <button
                            onClick={listNFT}
                            disabled={!btn}
                            className={`w-full py-2 px-4 rounded text-white ${btn
                                    ? "bg-blue-500 hover:bg-blue-600"
                                    : "bg-gray-600 cursor-not-allowed"
                                } transition duration-200`}
                        >
                            {btnContent}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center text-lg font-semibold">
                    Connect Your Wallet to Continue...
                </div>
            )}
        </div>
    );
}
