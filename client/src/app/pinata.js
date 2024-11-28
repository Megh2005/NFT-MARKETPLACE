"use server";

const axios = require("axios");
const jwt = process.env.JWT;

// Ensure JWT is set
if (!jwt) {
  throw new Error("JWT is not set. Ensure process.env.JWT is configured.");
}

export const uploadJSONToIPFS = async (JSONBody) => {
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

  try {
    const res = await axios.post(url, JSONBody, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log("Pinata response:", res.data);

    return {
      success: true,
      pinataURL: `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`,
    };
  } catch (error) {
    console.error("Error uploading JSON to IPFS:", error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data?.error || error.message,
    };
  }
};

export const uploadFileToIPFS = async (data) => {
  // Add metadata to FormData
  try {
    const file = data.get("file");
    if (!file) {
      throw new Error("No file found in FormData.");
    }

    const pinataMetadata = JSON.stringify({ name: file.name });
    data.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({ cidVersion: 0 });
    data.append("pinataOptions", pinataOptions);

    console.log("FormData contents:", Array.from(data.entries()));

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data,
      {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    console.log("Pinata response:", res.data);

    return {
      success: true,
      pinataURL: `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`,
    };
  } catch (error) {
    console.error("Error uploading file to IPFS:", error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data?.error || error.message,
    };
  }
};
