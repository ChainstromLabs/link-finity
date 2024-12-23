import React, { useState, useEffect, useRef, ChangeEvent } from "react";

export default function SectionHero() {

    const images = [
        "https://i.imgur.com/Ele3pLn.png",
        "https://i.imgur.com/gPdnCJx.png",

    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);


    return (
        <section className="pt-8 lg:pt-25 bg-[url('')] bg-center bg-cover relatve">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">

                <h1
                    className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl text-gray-900 mb-5 md:text-5xl leading-[50px]">
                    Unify your digital world with
                    <span className="text-indigo-600"> LinkFinity. </span>
                </h1>
                <div className="border border-indigo-600 p-1 w-72 mx-auto rounded-full flex items-center justify-between mb-4">
                    <span className="font-inter text-xs font-medium text-gray-900 ml-3"
                    >Browse innovative NFT templates .</span>
                    <a href="" className="w-8 h-8 rounded-full flex justify-center items-center bg-indigo-600">
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.83398 8.00019L12.9081 8.00019M9.75991 11.778L13.0925 8.44541C13.3023 8.23553 13.4073 8.13059 13.4073 8.00019C13.4073 7.86979 13.3023 7.76485 13.0925 7.55497L9.75991 4.22241"
                                stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin ="round" />
                        </svg>
                    </a>
                </div>
                <p className="max-w-sm mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9">
                    LinkFinity is a Link Bio platform that connects your digital world in one Web3 link.
                </p>

                <div className="relative lg:w-[70%] max-w-md flex justify-center mx-auto">

                    <input
                        type="text"
                        className="w-full px-4 py-2 pr-24 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="linkfinity/yourname"
                    />

                    <a href=""
                        className="absolute right-1 top-1 bottom-1 inline-flex items-center justify-center px-4 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all duration-500">
                        Claim LinkFinity
                    </a>
                </div>


                <div className="flex justify-center">
                    <div className="relative w-full lg:w-[70%] mx-auto overflow-hidden">
                        <div
                            className="flex transition-transform duration-500"
                            style={{
                                transform: `translateX(-${currentIndex * 100}%)`,
                            }}
                        >

                            {images.map((image, index) => (
                                <div key={index} className="relative min-w-full flex justify-center items-center">
                                    {/* Background Shape */}
                                    <div className="absolute left-[50%] top-[5%] -translate-x-1/2 h-[90%] w-[60%] bg-indigo-600 rounded-3xl -skew-x-12 z-0"></div>

                                    {/* Image */}
                                    <img
                                        src={image}
                                        alt={`Carousel Image ${index + 1}`}
                                        className="relative z-10 h-auto w-auto max-w-full object-contain"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Navigation */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 z-10"
                        >
                            &#8249;
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 z-10"
                        >
                            &#8250;
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-blue-500" : "bg-gray-300"
                                        }`}
                                ></button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
        </section>
    );
}
