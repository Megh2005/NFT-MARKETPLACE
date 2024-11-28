import GetIpfsUrlFromPinata from "@/app/utils";
import Image from "next/image";
import Link from "next/link";

export default function NFTCard({ item }) {
    const IPFSUrl = GetIpfsUrlFromPinata(item.image);

    const limitedDescription =
        item.description.length > 100
            ? item.description.substring(0, 100) + "..."
            : item.description;

    return (
        <div style={styles.tile}>
            <div style={styles.imageContainer}>
                <Image src={IPFSUrl} alt={item.name} width={500} height={360} />
            </div>
            <div style={styles.overlay}>
                <Link href={`/nft/${item.tokenId}`} style={styles.text}>
                    <strong style={styles.textStrong}>{item.name}</strong>
                    <p style={styles.textP}>{limitedDescription}</p>
                </Link>
            </div>
        </div>
    );
}

const styles = {
    tile: {
        position: "relative",
        overflow: "hidden",
        borderRadius: "8px",
    },
    imageContainer: {
        position: "relative",
        width: "100%",
        height: "100%",
        transition: "transform 0.3s ease",
    },
    imageContainerHover: {
        transform: "scale(1.05)",
    },
    overlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "linear-gradient(to top, rgba(255, 165, 0, 0.8), rgba(255, 215, 0, 0.5))",
        padding: "20px",
        boxSizing: "border-box",
        transition: "opacity 0.5s ease, transform 0.3s ease",
        opacity: 0,
        transform: "translateY(100%)",
    },
    tileHoverOverlay: {
        opacity: 1,
        transform: "translateY(0)",
    },
    overlayHover: {
        textDecoration: "underline",
        transform: "translateY(-10px)",
        cursor: "pointer",
    },
    text: {
        color: "#fff",
    },
    textStrong: {
        fontSize: "1.2rem",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    textP: {
        fontSize: "1rem",
        margin: 0,
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxHeight: "3em",
        whiteSpace: "nowrap",
    },
};
