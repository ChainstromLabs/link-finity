import React from "react";

interface TwitterTimelineProps {
    url?: string;
    playlist?: string;
}

const YoutubeFrame: React.FC<TwitterTimelineProps> = ({ url, playlist }) => {
    return (
        <div>
            {url && (
                <div className="w-full max-w-7xl mx-auto p-2">
                    <div className="rounded-3xl border-2 border-gray-300 p-4 shadow-lg">
                        <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-center">
                        ICP World Computer Show 2024
                        </h1>
                        <div className="relative w-full pb-[56.25%]">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src={`${url}`}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen={true}
                                frameBorder="0"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}


            {playlist && (
                <div className="w-full max-w-7xl mx-auto p-2">
                    <div className="rounded-3xl border-2 border-gray-300 p-4 shadow-lg">
                        <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-center">
                        Chain Fusion Day at Bitcoin Nashville - Panel: Scaling Bitcoin
                        </h1>
                        <div className="relative w-full pb-[56.25%]">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src={`${playlist}`}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen={true}
                                frameBorder="0"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
};

export default YoutubeFrame;
