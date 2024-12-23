import React, { useState } from "react";

interface WebsiteContent {
  url: string;
  modal: boolean;
}

const WebsiteIframe = ({
  url,
  modal,
  setModal,
}: {
  url: string;
  modal: boolean;
  setModal: () => void; 
}) => {
  const [websiteContent, setWebsiteContent] = useState<WebsiteContent>({
    url,
    modal,
  });

  const isValidUrl = (url: string) => {
    const regex = /^(https:\/\/)/;
    return regex.test(url);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = event.target.value;
    if (isValidUrl(newUrl)) {
      setWebsiteContent({ url: newUrl, modal: websiteContent.modal });
    }
  };

  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <>

      {modal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={setModal} 
        >
          <div
            className={`bg-white shadow-xl ${isFullScreen ? "w-full h-full" : "w-[70%] h-[80%]"} max-w-full rounded-[20px] overflow-hidden transition-all duration-500`}
            onClick={(e) => e.stopPropagation()} 
          >

            <div className="flex items-center justify-between bg-gray-100 p-3 border-b border-gray-300 rounded-t-[20px] z-60">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-grow mx-4">
                <input
                  type="text"
                  value={websiteContent.url} 
                  onChange={handleUrlChange}  
                  className="w-full px-3 py-1 rounded-lg border border-gray-300 text-sm"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={setModal} 
                  className="w-8 h-8 flex items-center justify-center bg-red-500 text-white font-bold rounded shadow hover:bg-red-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className={`absolute top-1/2 right-0 transform -translate-y-1/2 ${isFullScreen ? 'z-50' : 'z-59'} fixed`}>
              <button
                onClick={() => setIsFullScreen(false)} 
                className="w-8 h-8 flex items-center justify-center bg-gray-500 text-white font-bold rounded-full shadow hover:bg-gray-600 transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => setIsFullScreen(true)}
                className="w-8 h-8 flex items-center justify-center bg-gray-500 text-white font-bold rounded-full shadow hover:bg-gray-600 transition-colors mt-2"
              >
                →
              </button>
            </div>

            <iframe
              src={websiteContent.url}
              className="w-full h-full border-none rounded-b-[20px]"
              style={{ transform: "translateZ(0)" }}
              sandbox="allow-scripts allow-same-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default WebsiteIframe;
