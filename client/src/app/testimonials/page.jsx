"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import React from "react";

export default function InfiniteMovingCardsDemo() {
    return (
        <div className="h-[100vh] rounded-md flex flex-col antialiased bg-black dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            {/* Gradient Shiny Heading */}
            <h1 className="text-6xl font-extrabold text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text animate-gradient-shine mb-8">
                Testimonials
            </h1>
            <InfiniteMovingCards items={testimonials} direction="left" speed="normal" />
        </div>
    );
}

const testimonials = [
    {
        quote: "Ownio has revolutionized the way I look at articles and NFTs. I can now turn my favorite reads into unique collectibles, and it is a fantastic feeling to be part of the future of the web!",
        name: "Amit Sharma",
        title: "Tech Enthusiast",
    },
    {
        quote: "The concept of turning articles into NFTs is simply mind-blowing! As a writer, I am now able to monetize my work in ways I never imagined before.",
        name: "Sanya Gupta",
        title: "Freelance Writer",
    },
    {
        quote: "What I love about Ownio is how easy it makes the process of creating and sharing NFTs. The platform is intuitive and user-friendly. Great job!",
        name: "Vikram Singh",
        title: "Software Developer",
    },
    {
        quote: "This is a brilliant idea! I have always been passionate about collecting art and articles. Now, I can combine the two and create something truly special.",
        name: "Neha Patel",
        title: "Graphic Designer",
    },
    {
        quote: "Turning articles into NFTs is a game-changer. I can now offer my readers a chance to own unique, collectible pieces of my writing. This is the future of digital art!",
        name: "Rajesh Verma",
        title: "Content Creator",
    },
    {
        quote: "I have been looking for a platform that combines my love for reading with the digital art world. Ownio is the perfect fit for me. I highly recommend it to everyone.",
        name: "Priya Nair",
        title: "Digital Artist",
    },
    {
        quote: "As an entrepreneur, I see the value in owning and trading digital assets. Ownio has made it incredibly easy to create unique NFTs from articles.",
        name: "Ravi Mehta",
        title: "Entrepreneur",
    },
    {
        quote: "With Ownio, I can take my favorite articles and create personalized, tradable NFTs. It is a fun, new way to engage with content and technology.",
        name: "Simran Kaur",
        title: "Digital Marketing Expert",
    },
    {
        quote: "The process of creating NFTs from articles is so simple, and the results are beautiful. I am excited to see how this platform evolves.",
        name: "Arjun Desai",
        title: "Technology Consultant",
    },
    {
        quote: "Ownio has opened up an entirely new world for me. I can now create NFTs from articles and monetize my work in ways I never thought possible.",
        name: "Rashmi Kumar",
        title: "Blogger & Writer",
    },
    {
        quote: "I have always loved the idea of owning unique pieces of content. Ownio has taken that to a whole new level by offering NFTs of articles.",
        name: "Suresh Reddy",
        title: "Content Curator",
    },
    {
        quote: "Ownio is platform is a perfect blend of technology and creativity. I am proud to be a part of this groundbreaking community.",
        name: "Deepika Joshi",
        title: "Web Designer",
    },
    {
        quote: "The ability to convert articles into NFTs has opened up endless possibilities for writers, artists, and tech enthusiasts alike. Ownio is a brilliant platform!",
        name: "Nikhil Kapoor",
        title: "Tech Enthusiast",
    },
    {
        quote: "I am a huge fan of digital art, and now, with Ownio, I can take the best of both worlds—articles and NFTs—and create something truly unique.",
        name: "Meera Agarwal",
        title: "Digital Artist",
    },
    {
        quote: "As a journalist, I am always looking for ways to make my work stand out. Ownio allows me to transform my articles into exclusive digital assets, which is amazing!",
        name: "Aman Mehra",
        title: "Journalist",
    },
    {
        quote: "I can now showcase my articles as NFTs and offer my followers something truly unique. The process is simple, and the results are stunning!",
        name: "Tanvi Singh",
        title: "Social Media Influencer",
    },
    {
        quote: "Being able to turn my writings into NFTs is an exciting experience. Ownio makes it easy and seamless to explore new ways of interacting with content.",
        name: "Sandeep Gupta",
        title: "Writer & Blogger",
    },
    {
        quote: "Ownio makes creating and sharing NFTs so much fun. It is not just a great platform for artists, but also for anyone looking to explore the world of NFTs.",
        name: "Kiran Verma",
        title: "Artist",
    },
    {
        quote: "I can now combine my passion for writing with my interest in blockchain technology. Ownio is helping me monetize my content in the most exciting way.",
        name: "Harshit Patel",
        title: "Blockchain Enthusiast",
    },
    {
        quote: "With Ownio, I have discovered a whole new way to create and share digital art. The platform makes it so easy to turn articles into NFTs. Truly innovative!",
        name: "Suhana Rao",
        title: "Creative Director",
    }
];
