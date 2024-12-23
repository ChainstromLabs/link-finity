import React, { useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function SectionTemplate() {
  const [isWaitingModalOpen, setIsWaitingModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [confirmTransaction, setConfirmTransaction] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [nftdata, setNftdata] = useState([
  ]);

  const handleBuyTemplateClick = (index: number) => {
    setSelectedIndex(index); // Simpan indeks item yang dipilih
    setConfirmTransaction(true); // Buka modal konfirmasi
  };

  const proceedToPurchase = () => {
    setConfirmTransaction(false); // Tutup modal konfirmasi
    setIsWaitingModalOpen(true); // Buka modal "Waiting for Approval"
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsWaitingModalOpen(false);
      setIsSuccessModalOpen(true);
      setNftdata((prevData) =>
        prevData.map((item, i) =>
          i === selectedIndex
            ? { ...item, total: Math.min(item.total + 1, item.max) } // Pastikan tidak melebihi max
            : item
        )
      );
    }, 3000); // Menunggu 3 detik
  };

  const handleCloseModal = () => {
    setIsSuccessModalOpen(false);
  };




  return (
    <section className="pt-8 lg:pt-25 bg-[url('')] bg-center bg-cover relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mt-10 flex w-full flex-col justify-center gap-10 text-white sm:mt-0 lg:gap-16">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between text-start items-center sm:items-start">
            <div className="flex flex-col gap-2.5 text-center sm:text-left">
              <h2 className="text-[28px] font-semibold text-indigo-600 leading-[39px] lg:text-[38px] lg:leading-[45px]">
                Discover More NFTs
              </h2>
              <p className="text-base font-normal text-gray-700 leading-[22px] lg:text-[22px] lg:leading-[35px]">
                Explore new trending NFTs templates
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button className="rounded-[20px] text-indigo-600 border-2 border-[#A259FF] px-[30px] py-[12px] text-sm font-semibold transition-all duration-300 hover:bg-indigo-600 hover:text-white">
                See ALL
              </button>
            </div>
          </div>

          {/* NFT Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nftdata.map((data, i) => {
              const progressPercentage = Math.min(
                (data.total / data.max) * 100,
                100
              ); // Hitung progress secara dinamis

              return (
                <div
                  key={i}
                  className="relative flex flex-col rounded-[20px] shadow-lg bg-[#3B3B3B] transition-transform transform hover:scale-105 overflow-hidden"
                >
                  {/* Card Image */}
                  <div className="bg-indigo-600">
                    <img
                      src={data.img}
                      alt="NFT Image"
                      className="w-full h-[700px] object-cover rounded-t-[20px]"
                    />
                  </div>
                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className="text-[22px] font-semibold leading-[30px] text-white">
                      {data.title1}
                    </h3>
                    <div className="">
                      {/* Progress bar */}
                      <div className="w-full max-w-full bg-gray-700 rounded-full h-4">
                        <div
                          className="bg-red-500 h-4 rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-300 font-bold">
                        {data.total}/{data.max}
                      </p>
                    </div>
                    <div className="mt-5 flex justify-between text-white">
                      <div className="flex flex-col items-start">
                        <p className="text-sm text-white">Price</p>
                        <p className="text-1xl font-bold text-white">
                          0.00005 ckBTC
                        </p>
                      </div>
                      <div className="flex flex-col items-start">
                        <p className="text-sm text-white">Highest Bid</p>
                        <p className="text-1xl font-bold text-white">
                          0.05235 ckBTC
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Button */}
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-[20px] px-6 py-2 text-sm font-semibold transition-all duration-300"
                    onClick={() => handleBuyTemplateClick(i)} // Pass the index
                    disabled={isLoading}
                  >
                    {isLoading && selectedIndex === i
                      ? "Processing..."
                      : "Buy Template"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>



      {confirmTransaction && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full text-center">
            <DotLottieReact
              src="https://lottie.host/59ab056d-3871-4819-b2b3-178d8eb66cec/OnhcUQjkIZ.lottie"
              loop
              autoplay
            />
            <h2 className="text-xl font-semibold text-indigo-600 mt-4">
              Do you want to proceed with purchasing the NFT template?
            </h2>

            <div className="mt-6 flex justify-center gap-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300"
                onClick={() => setConfirmTransaction(false)} // Menutup modal
              >
                No
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
                onClick={proceedToPurchase} // Melanjutkan ke pembelian
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Waiting for Approval */}
      {isWaitingModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold text-center text-indigo-600">
              <DotLottieReact
                src="https://lottie.host/59ab056d-3871-4819-b2b3-178d8eb66cec/OnhcUQjkIZ.lottie"
                loop
                autoplay
              />
              Waiting for approval...
            </h2>
          </div>
        </div>
      )}

      {/* Modal Success */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <DotLottieReact
              src="https://lottie.host/efcfdc78-bd97-4519-880a-20d643115423/2ZGcqoFILK.lottie"
              loop
              autoplay
            />
            <h2 className="text-xl font-semibold text-center text-green-600 text-indigo-600">
              Success! You have successfully purchased the template.
            </h2>
            <div className="mt-4 text-center">
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <br></br>  <br></br>  <br></br>
    </section>
  );
}
