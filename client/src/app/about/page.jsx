"use client";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const words = `Ownio is an innovative web app that allows users to generate NFTs from articles, combining the world of digital art with written content. By transforming articles into unique, tradable digital assets, Ownio empowers creators and writers to explore new ways of monetizing their work and engaging with their audience. Whether you're a journalist, blogger, or content creator, Ownio provides a seamless platform to turn your articles into valuable NFTs, offering a creative and secure method for preserving and sharing your intellectual property
`;

export default function TextGenerateEffectDemo() {
    return (
        <div className="flex flex-col text-center sm:px-36 items-center justify-center min-h-screen">
            <div className="w-[100vw] sm:mt-[-40vh] rounded-md flex flex-col antialiased bg-black dark:bg-transparent items-center justify-center relative">
                {/* Gradient Shiny Heading */}
                <h1 className="text-6xl font-extrabold text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text animate-gradient-shine mb-8">
                    About Us
                </h1>
            </div>
            <div className="flex items-center justify-center">
                <TextGenerateEffect
                    filter={true}
                    className="text-center text-yellow-400 capitalize px-2 sm:px-14"
                    words={words}
                />
            </div>
        </div>
    );
}
