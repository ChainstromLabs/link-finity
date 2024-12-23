import React, { useState, useEffect } from "react";

const MobilePreviewFrame: React.FC = () => {
    
    const [time, setTime] = useState("");
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            setTime(`${hours}:${minutes}`);
        };

        const interval = setInterval(updateTime, 60000);

        updateTime();

        return () => clearInterval(interval);
    }, []);


    return (
        <div>
            <div className="relative flex justify-center h-[520px] w-[250px] border border-4 border-black rounded-2xl bg-gray-50"
                style={{
                    width: '100%',
                    maxWidth: '414px',
                    height: '100%',
                    maxHeight: '796px',
                    aspectRatio: '9 / 19.5',
                }}
            >

                {/* Top notch */}
                <span className="absolute top-2 bg-black w-16 h-4 rounded-full"></span>

                {/* Status bar */}
                <div className="absolute top-2 left-2 right-2 flex justify-between items-center px-4">
                    {/* Signal icon (menggunakan SVG) */}
                    <div className="flex gap-1 items-center">
                        <span className="text-black text-xs font-semibold">{time}</span>
                    </div>

                    {/* Time */}

                    <div className="flex items-center gap-1">

                        <i className="fa fa-wifi" aria-hidden="true"></i>
                        <i className="fa-solid fa-signal"></i>
                        <img
                            src="https://i.imgur.com/Ghxs5S5.png"
                            alt="Battery Icon"
                            className="w-7 h-4"
                        />

                    </div>
                </div>

                {/* Right side decorations */}
                <span className="absolute -right-1.5 top-20 border-2 border-black h-10 rounded-md"></span>

                {/* Left side decorations */}
                <span className="absolute -left-1.5 top-16 border-2 border-black h-6 rounded-md"></span>
                <span className="absolute -left-1.5 top-32 border-2 border-black h-12 rounded-md"></span>
                <span className="absolute -left-1.5 top-48 border-2 border-black h-12 rounded-md"></span>


                <div className="absolute inset-0 bg-white overflow-hidden" style={{ top: '30px' }}>
                    <iframe
                        src="http://localhost:3000/preview/test"
                        style={{
                            width: '100%',
                            height: '100%',
                            border: 'none',
                        }}
                        title="Iframe Example"
                    />
                </div>

            </div>


        </div>

    );
};

export default MobilePreviewFrame;
