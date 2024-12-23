import React, { useEffect, useState } from "react";
import Navbar from "../components/header/nav";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Analtic from "../components/chart/analyticArea";
import AnalticCountry from "../components/chart/analyticCountry";


export default function LandingPage() {


    return (
        <div>
            <Helmet>
                <title>Analytic</title>
            </Helmet>

            <Navbar /> {/* Komponen Navbar */}
            <main
                style={{
                    backgroundColor: "#f0f8ff",
                    minHeight: "100vh",
                    padding: "20px",
                }}
            >
                <main className="">
                    <div className="grid mb-4 pb-10 px-8 mx-4">

                        <div className="grid grid-cols-12 gap-6">
                            <div className="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
                                <div className="col-span-12 mt-8">
                                    <div className="flex items-center h-10 intro-y">
                                        <h2 className="mr-5 text-lg font-medium truncate">Dashboard</h2>
                                    </div>
                                    <div className="grid grid-cols-12 gap-6 mt-5">
                                        <a className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                            href="#">
                                            <div className="p-5">
                                                <div className="flex justify-between">

                                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-7 w-7" >
                                                        <path d="M0 0 C0.75078827 0.00182281 1.50157654 0.00364563 2.27511597 0.00552368 C13.21761547 0.05027143 23.62191026 0.48515561 34.25 3.3125 C34.93191406 3.48410645 35.61382812 3.65571289 36.31640625 3.83251953 C59.00177043 9.5913495 79.40710499 20.22441888 97.25 35.3125 C98.11625 36.03695312 98.9825 36.76140625 99.875 37.5078125 C121.03072338 55.7331823 135.73708646 81.30094695 143.5 107.875 C143.86967896 109.13219849 143.86967896 109.13219849 144.24682617 110.41479492 C147.73314603 122.88625162 148.62900837 135.1829942 148.5625 148.0625 C148.56034485 148.81428528 148.5581897 149.56607056 148.55596924 150.34063721 C148.50557623 161.29165017 148.10236932 171.68094163 145.25 182.3125 C145.05664062 183.075625 144.86328125 183.83875 144.6640625 184.625 C138.70530239 207.87152092 127.94069741 228.18414067 112.25 246.3125 C111.569375 247.11558594 110.88875 247.91867188 110.1875 248.74609375 C103.35666157 256.65759217 95.543982 262.99601834 87.25 269.3125 C89.82957733 271.89207733 92.26786511 272.58297433 95.6875 273.875 C138.59967012 290.63207925 177.93834483 320.05099223 205.25 357.3125 C205.88711914 358.16642334 205.88711914 358.16642334 206.53710938 359.03759766 C213.05268015 367.77841821 218.88588547 376.82336328 224.25 386.3125 C224.6521875 387.01971191 225.054375 387.72692383 225.46875 388.45556641 C246.93242591 426.5787439 256.80058004 468.81667677 256.25 512.3125 C242.72 512.3125 229.19 512.3125 215.25 512.3125 C214.92 505.7125 214.59 499.1125 214.25 492.3125 C213.79039897 488.03524524 213.3010447 483.86077695 212.625 479.625 C212.45387695 478.54468506 212.28275391 477.46437012 212.10644531 476.35131836 C206.60935354 443.73066749 193.60522612 411.53003125 173.25 385.3125 C172.38199281 384.15132264 171.51614482 382.98852844 170.65234375 381.82421875 C166.69979947 376.53512263 162.69932579 371.46825805 157.890625 366.91796875 C156.07346213 365.13974509 154.45402763 363.2534955 152.8125 361.3125 C149.27306554 357.22370765 145.40296396 353.7646974 141.25 350.3125 C140.47269531 349.64734375 139.69539063 348.9821875 138.89453125 348.296875 C136.05722631 345.91027659 133.17277195 343.59283744 130.25 341.3125 C129.68265137 340.86777344 129.11530273 340.42304688 128.53076172 339.96484375 C102.91739617 320.18490671 72.70307656 307.9897802 41.25 301.3125 C40.43789063 301.13315918 39.62578125 300.95381836 38.7890625 300.76904297 C-13.1279011 289.76727901 -70.4158177 302.91197056 -114.92041016 330.66601562 C-119.00484026 333.37186075 -122.88116241 336.30874411 -126.75 339.3125 C-127.91117736 340.18050719 -129.07397156 341.04635518 -130.23828125 341.91015625 C-135.52737737 345.86270053 -140.59424195 349.86317421 -145.14453125 354.671875 C-146.92275491 356.48903787 -148.8090045 358.10847237 -150.75 359.75 C-154.83879235 363.28943446 -158.2978026 367.15953604 -161.75 371.3125 C-162.41515625 372.08980469 -163.0803125 372.86710937 -163.765625 373.66796875 C-166.15222341 376.50527369 -168.46966256 379.38972805 -170.75 382.3125 C-171.19472656 382.87984863 -171.63945312 383.44719727 -172.09765625 384.03173828 C-193.98642519 412.37586492 -207.30205098 446.80110495 -212.5625 482.0625 C-212.67440674 482.80371094 -212.78631348 483.54492188 -212.90161133 484.30859375 C-214.13780819 493.62107917 -214.27883314 502.88916277 -214.75 512.3125 C-228.28 512.3125 -241.81 512.3125 -255.75 512.3125 C-257.02044663 447.51972193 -232.23141838 383.87916967 -187.36181641 336.98291016 C-178.26172749 327.55200916 -169.22377478 318.24056563 -158.75 310.3125 C-158.21117187 309.89726074 -157.67234375 309.48202148 -157.1171875 309.05419922 C-135.52893958 292.45762858 -112.04907118 280.19279862 -86.75 270.3125 C-89.98932855 267.02689532 -93.2994194 263.87489028 -96.75 260.8125 C-100.18819121 257.73435536 -103.52845207 254.61882551 -106.75 251.3125 C-107.31847656 250.78914062 -107.88695312 250.26578125 -108.47265625 249.7265625 C-125.46267938 233.71608345 -136.54271907 210.85460351 -143 188.75 C-143.24645264 187.91186768 -143.49290527 187.07373535 -143.74682617 186.21020508 C-147.23328996 173.73823352 -148.12743363 161.44230703 -148.0625 148.5625 C-148.06067719 147.81171173 -148.05885437 147.06092346 -148.05697632 146.28738403 C-148.01222857 135.34488453 -147.57734439 124.94058974 -144.75 114.3125 C-144.57839355 113.63058594 -144.40678711 112.94867188 -144.22998047 112.24609375 C-138.4711505 89.56072957 -127.83808112 69.15539501 -112.75 51.3125 C-112.02554688 50.44625 -111.30109375 49.58 -110.5546875 48.6875 C-92.3293177 27.53177662 -66.76155305 12.82541354 -40.1875 5.0625 C-39.34936768 4.81604736 -38.51123535 4.56959473 -37.64770508 4.31567383 C-25.17573352 0.82921004 -12.87980703 -0.06493363 0 0 Z M-82.75 79.3125 C-102.47284214 104.08592408 -109.85398681 133.75980081 -106.4453125 165.11523438 C-102.30107187 192.11623073 -86.96859344 216.80814884 -65.72265625 233.72265625 C-40.68832205 251.76346817 -11.18755441 259.34226559 19.546875 254.625 C46.79279426 249.44647287 71.72314797 233.62484698 87.9375 211.125 C104.55270793 186.00898802 111.82103489 156.68249116 106.12060547 126.69067383 C99.84821409 98.96546799 83.58704207 74.20277398 59.76171875 58.44140625 C12.2292209 29.00496857 -45.61252232 37.87082729 -82.75 79.3125 Z " fill="#15CAC9" transform="translate(255.75,-0.3125)" />
                                                    </svg>


                                                    <div
                                                        className="bg-green-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                        <span className="flex items-center">5%</span>
                                                    </div>
                                                </div>
                                                <div className="ml-2 w-full flex-1">
                                                    <div>
                                                        <div className="mt-3 text-3xl font-bold leading-8">15.6k</div>

                                                        <div className="mt-1 text-base text-gray-600">Unique Users 1 Day</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <a className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                            href="#">
                                            <div className="p-5">
                                                <div className="flex justify-between">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-yellow-400"
                                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                    </svg>
                                                    <div
                                                        className="bg-red-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                        <span className="flex items-center">20%</span>
                                                    </div>
                                                </div>
                                                <div className="ml-2 w-full flex-1">
                                                    <div>
                                                        <div className="mt-3 text-3xl font-bold leading-8">84.510</div>

                                                        <div className="mt-1 text-base text-gray-600">Total Clicks</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <a className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                            href="#">
                                            <div className="p-5">
                                                <div className="flex justify-between">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-pink-600"
                                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                                    </svg>
                                                    <div
                                                        className="bg-yellow-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                        <span className="flex items-center">13%</span>
                                                    </div>
                                                </div>
                                                <div className="ml-2 w-full flex-1">
                                                    <div>
                                                        <div className="mt-3 text-3xl font-bold leading-8">94.510</div>

                                                        <div className="mt-1 text-base text-gray-600">Total Visitors</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <a className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                            href="#">
                                            <div className="p-5">
                                                <div className="flex justify-between">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-400"
                                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                                    </svg>
                                                    <div
                                                        className="bg-blue-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                        <span className="flex items-center">30%</span>
                                                    </div>
                                                </div>
                                                <div className="ml-2 w-full flex-1">
                                                    <div>
                                                        <div className="mt-3 text-3xl font-bold leading-8">174.510</div>

                                                        <div className="mt-1 text-base text-gray-600">Total Visitor&Click</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-span-12 mt-5">
                                    <div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
                                        <div className="bg-white shadow-lg p-4"><Analtic /></div>
                                        <div className="bg-white shadow-lg p-4"><AnalticCountry /></div>
                                    </div>
                                </div>
                                {/* <div className="col-span-12 mt-5">
                                    <div className="grid gap-2 grid-cols-1 lg:grid-cols-1">
                                        <div className="bg-white p-4 shadow-lg rounded-lg">
                                            <h1 className="font-bold text-base">Table</h1>
                                            <div className="mt-4">
                                                <div className="flex flex-col">
                                                    <div className="-my-2 overflow-x-auto">
                                                        <div className="py-2 align-middle inline-block min-w-full">
                                                            <div
                                                                className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
                                                                <table className="min-w-full divide-y divide-gray-200">
                                                                    <thead>
                                                                        <tr>
                                                                            <th
                                                                                className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                                <div className="flex cursor-pointer">
                                                                                    <span className="mr-2">PRODUCT NAME</span>
                                                                                </div>
                                                                            </th>
                                                                            <th
                                                                                className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                                <div className="flex cursor-pointer">
                                                                                    <span className="mr-2">Stock</span>
                                                                                </div>
                                                                            </th>
                                                                            <th
                                                                                className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                                <div className="flex cursor-pointer">
                                                                                    <span className="mr-2">STATUS</span>
                                                                                </div>
                                                                            </th>
                                                                            <th
                                                                                className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                                <div className="flex cursor-pointer">
                                                                                    <span className="mr-2">ACTION</span>
                                                                                </div>
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                                        <tr>
                                                                            <td
                                                                                className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                <p>Apple MacBook Pro 13</p>
                                                                                <p className="text-xs text-gray-400">PC & Laptop
                                                                                </p>
                                                                            </td>
                                                                            <td
                                                                                className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                <p>77</p>
                                                                            </td>
                                                                            <td
                                                                                className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                <div className="flex text-green-500">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                                        className="w-5 h-5 mr-1" fill="none"
                                                                                        viewBox="0 0 24 24"
                                                                                        stroke="currentColor">
                                                                                        <path stroke-linecap="round"
                                                                                            stroke-linejoin="round"
                                                                                            stroke-width="2"
                                                                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                    </svg>
                                                                                    <p>Active</p>
                                                                                </div>
                                                                            </td>
                                                                            <td
                                                                                className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                <div className="flex space-x-4">
                                                                                    <a href="#" className="text-blue-500 hover:text-blue-600">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                                            className="w-5 h-5 mr-1"
                                                                                            fill="none" viewBox="0 0 24 24"
                                                                                            stroke="currentColor">
                                                                                            <path stroke-linecap="round"
                                                                                                stroke-linejoin="round"
                                                                                                stroke-width="2"
                                                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                                        </svg>
                                                                                        <p>Edit</p>
                                                                                    </a>
                                                                                    <a href="#" className="text-red-500 hover:text-red-600">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                                            className="w-5 h-5 mr-1 ml-3"
                                                                                            fill="none" viewBox="0 0 24 24"
                                                                                            stroke="currentColor">
                                                                                            <path stroke-linecap="round"
                                                                                                stroke-linejoin="round"
                                                                                                stroke-width="2"
                                                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                                        </svg>
                                                                                        <p>Delete</p>
                                                                                    </a>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </main>

            </main>
        </div>
    );
}
