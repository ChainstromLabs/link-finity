// 
import React, { useEffect, useRef } from "react";

interface TwitterTimelineProps {
    username?: string;
    url?: string;
    pinnedurl?: string;
}

const TwitterVideo: React.FC<TwitterTimelineProps> = ({ username, url, pinnedurl }) => {
    const scriptLoaded = useRef(false);

    useEffect(() => {
        if (!scriptLoaded.current) {
            const script = document.createElement("script");
            script.src = "https://platform.twitter.com/widgets.js";
            script.async = true;
            script.charset = "utf-8";
            document.body.appendChild(script);

            script.onload = () => {
                scriptLoaded.current = true;
            };

            return () => {
                document.body.removeChild(script);
            };
        }
    }, []);



    return (

        <div className="w-full max-w-7xl mx-auto p-4">

            {username && (
                <div className="w-full max-w-7xl mx-auto p-2 ">
                    <a
                        className="twitter-timeline"
                        data-theme="dark"
                        data-tweet-limit="5"
                        href={`https://twitter.com/${username}?ref_src=twsrc%5Etfw`}
                    >
                        Loading Tweets
                    </a>
                </div>
            )}

            {url && (
                
            //  37 characters

                <div className="w-full max-w-7xl mx-auto p-2">
                    <div className="rounded-3xl border-2 border-gray-300 p-4 shadow-lg">
                        <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-center">
                        Generation blockchain changes
                        </h1>
                        <blockquote className="twitter-tweet" data-media-max-width="560">
                            <a href={`${url}?ref_src=twsrc%5Etfw`}>
                                Loading video this video content X pleasee wait...
                            </a>
                        </blockquote>
                    </div>
                </div>
            )}

            {/* 28 characters */}
            {pinnedurl && (
                <div className="w-full max-w-7xl mx-auto p-2">
                    <div className="rounded-3xl border-2 border-gray-300 p-4 shadow-lg">
                        <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-center">
                            icpp-art NFT Launch is now
                        </h1>
                        <blockquote className="twitter-tweet" data-theme="dark">
                            <a href={`${pinnedurl}?ref_src=twsrc%5Etfw`}>
                                Loading post this post content X pleasee wait...
                            </a>
                        </blockquote>
                    </div>
                </div>
            )}




        </div>

    );
};

export default TwitterVideo;
