
import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
  KeyboardEvent,
  ChangeEvent,
} from "react";

import linkfinitylogo from '../assets/linkfintyasset/logo.png';

import web3image from '../assets/linkfintyasset/web3.png';

import linkfinty from '../assets/linkfintyasset/linkfinty.png';

import kotak2 from '../assets/linkfintyasset/Z3haohI.png';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { useNavigate } from 'react-router-dom';


import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const LandingPage = () => {

  const navigate = useNavigate();

  // Mobile State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  // Fungsi untuk memuat warna dari localStorage saat halaman dimuat
  useEffect(() => {
    const savedColor = localStorage.getItem('primary-color');
    if (savedColor) {
      document.documentElement.style.setProperty('--primary-color', savedColor);
    }
  }, []);

  // Toggle visibility dari color picker
  const toggleColorPicker = () => {
    setPickerVisible(!isPickerVisible);
  };

  // Mengganti warna dan menyimpannya di localStorage
  const changeColor = (color: string): void => {
    const root = document.documentElement;

    const colorMap: { [key: string]: string } = {
      yellow: '#aab200',
      red: '#ff2121',
      green: '#1bc400',
      orange: '#f9a007',
      blue: '#006bc4',
      pink: '#c400bc',
      ungu: '#9000c4',

    };

    if (color in colorMap) {
      const selectedColor = colorMap[color];
      root.style.setProperty('--primary-color', selectedColor);

      // Simpan warna ke localStorage
      localStorage.setItem('primary-color', selectedColor);
    }

    setPickerVisible(false); // Sembunyikan color picker setelah pemilihan
  };


  return (
    <>

      <Helmet>
        <title>Landing Page | My App</title>
        <meta name="description" content="Welcome to the Landing Page of My App." />
      </Helmet>

      <div className="website-content ">

        <div className="elements">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>

        <div className="col">
          <img src={kotak2} alt="" className="rotated-image" />
          <img src={kotak2} alt="" className="rotated-image" />
        </div>


        <div className="phaton"></div>


        <nav className="navbar flex items-center justify-between p-4 bg-gray-800 text-white fixed top-0 left-0 w-full z-50">
          <div className="navbar-toggle" onClick={toggleMenu} role="button">
            &#9776;
          </div>

          {/* Wrapper untuk logo dan text */}
          <div className="flex items-center justify-center w-full md:w-auto">
            <div className="mr-2">
              <img src={linkfinitylogo} alt="Logo" className="w-12 h-12" />
            </div>
            <div className="text-xl font-bold">LinkFinity</div>
          </div>

          <div className={`navbar-menu ${isMenuOpen ? 'open' : ''} `}>
            <a href="#" className="custom-font">Home</a>
            <a href="#" className="custom-font">About</a>
            <a href="#" className="custom-font">Feature</a>
            <a href="#" className="custom-font" onClick={toggleColorPicker}>Change Color</a>
            {isPickerVisible && (
              <div className="color-picker-popup">
                <div className="color-box" data-color="yellow" onClick={() => changeColor('yellow')}></div>
                <div className="color-box" data-color="red" onClick={() => changeColor('red')}></div>
                <div className="color-box" data-color="green" onClick={() => changeColor('green')}></div>
                <div className="color-box" data-color="orange" onClick={() => changeColor('orange')}></div>
                <div className="color-box" data-color="blue" onClick={() => changeColor('blue')}></div>
                <div className="color-box" data-color="pink" onClick={() => changeColor('pink')}></div>
                <div className="color-box" data-color="ungu" onClick={() => changeColor('ungu')}></div>
              </div>
            )}
          </div>
        </nav>
        <div className="home">
          <div className="container-fluid">

            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 text-center md:text-left">

                <p className="title text-center mb-2">
                  <b>
                    Chainstrom <span style={{ color: 'white' }}>LinkFinity</span>
                  </b>



                </p>

                <div className="text-white text-center text-3xl font-bold">
                  Customize branding, personalize connections, enhance reach, and simplify the digital experience.
                  <div className="relative inline-grid grid-cols-1 grid-rows-1 gap-16 overflow-hidden space-x-5">

                    <span className="animate-word col-span-full row-span-full">Event</span>
                    <span className="animate-word-delay-1 col-span-full row-span-full">Wallet</span>
                    <span className="animate-word-delay-2 col-span-full row-span-full">Social Media</span>
                    <span className="animate-word-delay-3 col-span-full row-span-full">Gaming</span>
                    <span className="animate-word-delay-4 col-span-full row-span-full">E-Commerce</span>
                  </div>
                </div>
                <p className="desc text-center ">
                </p>
                <div className="button-container flex flex-row gap-4 justify-center">
                  <button className="glow-on-hover mt-4 setfont" onClick={() => navigate('/app')} type="button">Launch</button>
                  <button className="glow-on-hover mt-4 setfont" type="button">Docs</button>
                </div>

                <div className="stats-cards flex justify-around mt-4">
                  <div className="item text-center m-2 flex flex-col items-center">
                    <i className="bx bx-user text-4xl ">  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ebebeb" className="w-10 h-10">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    </i>
                    <p className="number text-2xl">+3330</p>
                    <p className="info">Members</p>
                  </div>
                  <div className="item text-center m-2 flex flex-col items-center">
                    <i className="bx bx-package text-4xl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ebebeb" className="w-10 h-10">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                    </svg>
                    </i>
                    <p className="number text-2xl">+510</p>
                    <p className="info">Created Bio</p>
                  </div>
                  <div className="item text-center m-2 flex flex-col items-center">
                    <i className="bx bx-cart-add text-4xl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ebebeb" className="w-10 h-10">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                    </svg>
                    </i>
                    <p className="number text-2xl">+158k</p>
                    <p className="info">Traffic</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 align-self-center">
                <img
                  className="imge"
                  src={linkfinitylogo}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>



        <section className="relative pt-48 pb-20 lg:pt-80 ">

          <div className="relative xl:container m-auto px-6 md:px-12 lg:px-6 ">
            <header>
              <h1 className="sm:mx-auto sm:w-10/12 md:w-2/3 font-black text-blue-900 text-4xl text-center sm:text-5xl md:text-6xl xl:text-7xl dark:text-white">
                Simplify Your Digital <br className="lg:block hidden" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-color)] to-red-600 dark:from-[var(--primary-color)] dark:to-red-400">
                  Ecosystem
                </span>.

              </h1>



            </header>
            <div className="lg:flex lg:flex-row-reverse">
              <div className="relative mt-8 md:mt-16 space-y-8 sm:w-10/12 md:w-2/3 lg:ml-0 sm:mx-auto text-center lg:text-left lg:mr-auto lg:w-7/12">

                <p className="sm:text-lg text-white lg:w-11/12">
                  LinkFinity is a Link Bio platform that brings a new way to share your entire digital ecosystem. From events, wallet, gaming, e-commerce, to social media and digital wallets, we bring it all together in one Web3-connected link.<br></br><br></br>
                  No more worrying about multiple links and different platforms. LinkFinity connects all your digital elements in a single bio link that makes it easy for followers to access your world with a single click.
                </p>

                <span className="block font-semibold text-gray-500 dark:text-gray-400">
                  🔥🌟all your digital services, in one link from.
                </span>
                <div className="grid grid-cols-3 space-x-4 md:space-x-6 md:flex md:justify-center lg:justify-start">
                  <a

                    className="p-4 border dark:bg-[var(--primary-color)] bg-[var(--primary-color)] dark:border-[var(--primary-color)] rounded-full duration-300 hover:shadow-lg dark:hover:border-opacity-30 hover:shadow-opacity-20"
                  >
                    <div className="flex justify-center space-x-4">
                      <svg className="w-[32px] h-[32px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8H5m12 0a1 1 0 0 1 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z" />
                      </svg>

                    </div>

                  </a>
                  <a

                    className="p-4 border dark:bg-[var(--primary-color)] bg-[var(--primary-color)] dark:border-[var(--primary-color)] rounded-full duration-300 hover:shadow-lg dark:hover:border-opacity-30 hover:shadow-opacity-20"
                  >
                    <div className="flex justify-center space-x-4">
                      <svg
                        className="w-[32px] h-[32px] text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 122.88 91.26"
                        fill="none"
                      >
                        <g>
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.85,45.46h6.65l2.39,12.65l3.5-12.65h6.6l3.53,12.67l2.41-12.67h6.62l-5,22.68h-6.87L30.7,53.86 l-3.95,14.28h-6.86L14.85,45.46L14.85,45.46z M8.32,0h106.24c4.58,0,8.32,3.74,8.32,8.32v74.62c0,4.57-3.74,8.32-8.32,8.32H8.32 C3.74,91.26,0,87.51,0,82.94V8.32C0,3.74,3.74,0,8.32,0L8.32,0z M117.97,23.29H5.29v60.46c0,0.64,0.25,1.2,0.67,1.63 c0.42,0.42,0.99,0.67,1.63,0.67h108.04c0.64,0,1.2-0.25,1.63-0.67c0.43-0.43,0.67-0.99,0.67-1.63V23.29H117.97L117.97,23.29z M106.64,9.35c2.27,0,4.11,1.84,4.11,4.11s-1.84,4.11-4.11,4.11c-2.27,0-4.11-1.84-4.11-4.11S104.38,9.35,106.64,9.35L106.64,9.35z M78.8,9.35c2.27,0,4.11,1.84,4.11,4.11s-1.84,4.11-4.11,4.11c-2.27,0-4.11-1.84-4.11-4.11S76.53,9.35,78.8,9.35L78.8,9.35z M92.72,9.35c2.27,0,4.11,1.84,4.11,4.11s-1.84,4.11-4.11,4.11c-2.27,0-4.11-1.84-4.11-4.11S90.45,9.35,92.72,9.35L92.72,9.35z M78.3,45.46h6.65l2.39,12.65l3.5-12.65h6.6l3.53,12.67l2.41-12.67h6.62l-5,22.68h-6.87l-3.98-14.28L90.2,68.14h-6.86L78.3,45.46 L78.3,45.46z M46.58,45.46h6.65l2.39,12.65l3.5-12.65h6.6l3.53,12.67l2.41-12.67h6.62l-5,22.68h-6.87l-3.98-14.28l-3.95,14.28 h-6.86L46.58,45.46L46.58,45.46z"
                          />
                        </g>
                      </svg>

                    </div>

                  </a>
                  <a

                    className="p-4 border dark:bg-[var(--primary-color)] bg-[var(--primary-color)] dark:border-[var(--primary-color)] rounded-full duration-300 hover:shadow-lg dark:hover:border-opacity-30 hover:shadow-opacity-20"
                  >
                    <div className="flex justify-center space-x-4">
                      <svg
                        className="w-[32px] h-[32px] text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 112.88 131.26"
                        fill="none"
                      >
                        <g>
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.87,14.69h22.66L24.5,14.3V4.13C24.5,1.86,26.86,0,29.76,0c2.89,0,5.26,1.87,5.26,4.13V14.3l-0.03,0.39 h38.59l-0.03-0.39V4.13C73.55,1.86,75.91,0,78.8,0c2.89,0,5.26,1.87,5.26,4.13V14.3l-0.03,0.39h24.11c1.03,0,1.87,0.84,1.87,1.87 v19.46c0,1.03-0.84,1.87-1.87,1.87H1.87C0.84,37.88,0,37.04,0,36.01V16.55C0,15.52,0.84,14.69,1.87,14.69L1.87,14.69z M71.6,74.59 c2.68-0.02,4.85,2.14,4.85,4.82c-0.01,2.68-2.19,4.87-4.87,4.89l-11.76,0.08l-0.08,11.77c-0.02,2.66-2.21,4.81-4.89,4.81 c-2.68-0.01-4.84-2.17-4.81-4.83l0.08-11.69L38.4,84.54c-2.68,0.02-4.85-2.14-4.85-4.82c0.01-2.68,2.19-4.88,4.87-4.9l11.76-0.08 l0.08-11.77c0.02-2.66,2.21-4.82,4.89-4.81c2.68,0,4.83,2.16,4.81,4.82l-0.08,11.69L71.6,74.59L71.6,74.59L71.6,74.59z M0.47,42.19 h109.08c0.26,0,0.46,0.21,0.46,0.46l0,0v79.76c0,0.25-0.21,0.46-0.46,0.46l-109.08,0c-0.25,0-0.46-0.21-0.46-0.46V42.66 C0,42.4,0.21,42.19,0.47,42.19L0.47,42.19L0.47,42.19z M8.84,50.58h93.84c0.52,0,0.94,0.45,0.94,0.94v62.85 c0,0.49-0.45,0.94-0.94,0.94H8.39c-0.49,0-0.94-0.42-0.94-0.94v-62.4c0-1.03,0.84-1.86,1.86-1.86L8.84,50.58L8.84,50.58z M78.34,29.87c2.89,0,5.26-1.87,5.26-4.13V15.11l-0.03-0.41H73.11l-0.03,0.41v10.16c0,2.27,2.36,4.13,5.25,4.13L78.34,29.87 L78.34,29.87z M29.29,29.87c2.89,0,5.26-1.87,5.26-4.13V15.11l-0.03-0.41H24.06l-0.03,0.41v10.16c0,2.27,2.36,4.13,5.25,4.13V29.87 L29.29,29.87z"
                          />
                        </g>
                      </svg>

                    </div>

                  </a>
                </div>
              </div>
              <div className="mt-12 md:mt-0 lg:w-7/12 flex justify-center items-center">
                <div className="relative w-full">
                  <div
                    aria-hidden="true"
                    className="absolute scale-75 md:scale-150 inset-0 m-auto w-full h-full md:w-96 md:h-96 rounded-full rotate-45 bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color)] blur-3xl"
                  ></div>
                  <svg data-v-418b1cd4="" width="630" height="650" viewBox="0 0 430 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative w-full"><circle data-v-418b1cd4="" cx="218.072" cy="118.132" r="98.6164" fill="url(#paint0_radial_16927_5720)"></circle> <g data-v-418b1cd4="" filter="url(#filter0_f_16927_5720)"><path data-v-418b1cd4="" fillRule="evenodd" clipRule="evenodd" d="M183.374 19.5176L182.471 20.1564L155.022 39.5587L154.119 40.1975L155.063 41.4751L183.745 80.2799L184.69 81.5575L186.538 82.1963L242.669 101.599L244.517 102.237L245.42 101.599L272.869 82.1963L273.773 81.5575L272.828 80.2799L244.146 41.4751L243.201 40.1975L241.353 39.5587L185.222 20.1564L183.374 19.5176ZM239.586 42.7527L266.38 79.0023L240.739 97.1271L188.305 79.0023L161.511 42.7527L187.152 24.6279L239.586 42.7527ZM277.691 147.504L276.787 148.143L249.339 167.545L248.435 168.184L249.379 169.461L278.062 208.266L279.006 209.544L280.854 210.183L336.985 229.585L338.833 230.224L339.737 229.585L367.185 210.183L368.089 209.544L367.145 208.266L338.462 169.461L337.518 168.184L335.67 167.545L279.539 148.143L277.691 147.504ZM333.903 170.739L360.697 206.989L335.056 225.113L282.621 206.989L255.827 170.739L281.468 152.614L333.903 170.739ZM275.541 84.1505L276.445 83.5117L278.293 84.1505L334.424 103.553L336.272 104.192L337.216 105.469L365.898 144.274L366.843 145.552L365.939 146.19L338.491 165.593L337.587 166.232L335.739 165.593L279.608 146.19L277.76 145.552L276.816 144.274L248.133 105.469L247.189 104.192L248.093 103.553L275.541 84.1505ZM359.451 142.996L332.657 106.747L280.222 88.6221L254.581 106.747L281.375 142.996L333.81 161.121L359.451 142.996ZM184.331 83.5117L183.427 84.1505L155.979 103.553L155.075 104.192L156.02 105.469L184.702 144.274L185.646 145.552L187.494 146.19L243.625 165.593L245.473 166.232L246.377 165.593L273.825 146.19L274.729 145.552L273.785 144.274L245.102 105.469L244.158 104.192L242.31 103.553L186.179 84.1505L184.331 83.5117ZM240.543 106.747L267.337 142.996L241.696 161.121L189.261 142.996L162.467 106.747L188.108 88.6221L240.543 106.747ZM91.037 84.1505L91.9407 83.5117L93.7887 84.1505L149.92 103.553L151.768 104.192L152.712 105.469L181.395 144.274L182.339 145.552L181.435 146.19L153.987 165.593L153.083 166.232L151.235 165.593L95.1041 146.19L93.2561 145.552L92.3118 144.274L63.6293 105.469L62.6849 104.192L63.5886 103.553L91.037 84.1505ZM174.947 142.996L148.153 106.747L95.718 88.6221L70.077 106.747L96.8709 142.996L149.306 161.121L174.947 142.996ZM90.2976 19.5176L89.3939 20.1564L61.9456 39.5587L61.0419 40.1975L61.9862 41.4751L90.6688 80.2799L91.6132 81.5575L93.4612 82.1963L149.592 101.599L151.44 102.237L152.344 101.599L179.792 82.1963L180.696 81.5575L179.752 80.2799L151.069 41.4751L150.125 40.1975L148.277 39.5587L109.928 26.3032L92.1457 20.1564L90.2976 19.5176ZM94.0749 24.6279L110.01 30.136L146.51 42.7527L173.304 79.0023L147.663 97.1271L95.2279 79.0023L68.434 42.7527L94.0749 24.6279ZM184.664 148.125L185.568 147.486L187.416 148.125L243.547 167.528L245.395 168.166L246.339 169.444L275.022 208.249L275.966 209.526L275.063 210.165L247.614 229.567L246.711 230.206L244.863 229.567L188.732 210.165L186.884 209.526L185.939 208.249L157.257 169.444L156.312 168.166L157.216 167.528L184.664 148.125ZM268.574 206.971L241.78 170.721L189.345 152.597L163.704 170.721L190.498 206.971L242.933 225.096L268.574 206.971Z" fill="url(#paint1_radial_16927_5720)"></path> <path data-v-418b1cd4="" fillRule="evenodd" clipRule="evenodd" d="M183.374 19.5176L182.471 20.1564L155.022 39.5587L154.119 40.1975L155.063 41.4751L183.745 80.2799L184.69 81.5575L186.538 82.1963L242.669 101.599L244.517 102.237L245.42 101.599L272.869 82.1963L273.773 81.5575L272.828 80.2799L244.146 41.4751L243.201 40.1975L241.353 39.5587L185.222 20.1564L183.374 19.5176ZM239.586 42.7527L266.38 79.0023L240.739 97.1271L188.305 79.0023L161.511 42.7527L187.152 24.6279L239.586 42.7527ZM277.691 147.504L276.787 148.143L249.339 167.545L248.435 168.184L249.379 169.461L278.062 208.266L279.006 209.544L280.854 210.183L336.985 229.585L338.833 230.224L339.737 229.585L367.185 210.183L368.089 209.544L367.145 208.266L338.462 169.461L337.518 168.184L335.67 167.545L279.539 148.143L277.691 147.504ZM333.903 170.739L360.697 206.989L335.056 225.113L282.621 206.989L255.827 170.739L281.468 152.614L333.903 170.739ZM275.541 84.1505L276.445 83.5117L278.293 84.1505L334.424 103.553L336.272 104.192L337.216 105.469L365.898 144.274L366.843 145.552L365.939 146.19L338.491 165.593L337.587 166.232L335.739 165.593L279.608 146.19L277.76 145.552L276.816 144.274L248.133 105.469L247.189 104.192L248.093 103.553L275.541 84.1505ZM359.451 142.996L332.657 106.747L280.222 88.6221L254.581 106.747L281.375 142.996L333.81 161.121L359.451 142.996ZM184.331 83.5117L183.427 84.1505L155.979 103.553L155.075 104.192L156.02 105.469L184.702 144.274L185.646 145.552L187.494 146.19L243.625 165.593L245.473 166.232L246.377 165.593L273.825 146.19L274.729 145.552L273.785 144.274L245.102 105.469L244.158 104.192L242.31 103.553L186.179 84.1505L184.331 83.5117ZM240.543 106.747L267.337 142.996L241.696 161.121L189.261 142.996L162.467 106.747L188.108 88.6221L240.543 106.747ZM91.037 84.1505L91.9407 83.5117L93.7887 84.1505L149.92 103.553L151.768 104.192L152.712 105.469L181.395 144.274L182.339 145.552L181.435 146.19L153.987 165.593L153.083 166.232L151.235 165.593L95.1041 146.19L93.2561 145.552L92.3118 144.274L63.6293 105.469L62.6849 104.192L63.5886 103.553L91.037 84.1505ZM174.947 142.996L148.153 106.747L95.718 88.6221L70.077 106.747L96.8709 142.996L149.306 161.121L174.947 142.996ZM90.2976 19.5176L89.3939 20.1564L61.9456 39.5587L61.0419 40.1975L61.9862 41.4751L90.6688 80.2799L91.6132 81.5575L93.4612 82.1963L149.592 101.599L151.44 102.237L152.344 101.599L179.792 82.1963L180.696 81.5575L179.752 80.2799L151.069 41.4751L150.125 40.1975L148.277 39.5587L109.928 26.3032L92.1457 20.1564L90.2976 19.5176ZM94.0749 24.6279L110.01 30.136L146.51 42.7527L173.304 79.0023L147.663 97.1271L95.2279 79.0023L68.434 42.7527L94.0749 24.6279ZM184.664 148.125L185.568 147.486L187.416 148.125L243.547 167.528L245.395 168.166L246.339 169.444L275.022 208.249L275.966 209.526L275.063 210.165L247.614 229.567L246.711 230.206L244.863 229.567L188.732 210.165L186.884 209.526L185.939 208.249L157.257 169.444L156.312 168.166L157.216 167.528L184.664 148.125ZM268.574 206.971L241.78 170.721L189.345 152.597L163.704 170.721L190.498 206.971L242.933 225.096L268.574 206.971Z" fill="url(#paint2_linear_16927_5720)"></path></g> <path data-v-418b1cd4="" fillRule="evenodd" clipRule="evenodd" d="M185.898 22.9325L240.785 41.9048L268.832 79.8493L241.992 98.8215L187.105 79.8493L159.058 41.9048L185.898 22.9325ZM157.814 41.4746L185.262 22.0723L241.393 41.4746L270.076 80.2794L242.628 99.6818L186.497 80.2794L157.814 41.4746ZM280.215 150.919L335.102 169.891L363.148 207.836L336.308 226.808L281.422 207.836L253.375 169.891L280.215 150.919ZM252.131 169.461L279.579 150.059L335.71 169.461L364.393 208.266L336.944 227.668L280.813 208.266L252.131 169.461ZM333.856 105.899L278.97 86.9266L252.13 105.899L280.177 143.843L335.063 162.816L361.903 143.843L333.856 105.899ZM278.334 86.0664L250.886 105.469L279.568 144.274L335.699 163.676L363.147 144.274L334.465 105.469L278.334 86.0664ZM186.855 86.9266L241.741 105.899L269.788 143.843L242.948 162.816L188.062 143.843L160.015 105.899L186.855 86.9266ZM158.771 105.469L186.219 86.0664L242.35 105.469L271.032 144.274L243.584 163.676L187.453 144.274L158.771 105.469ZM149.352 105.899L94.4652 86.9266L67.6253 105.899L95.6721 143.843L150.559 162.816L177.399 143.843L149.352 105.899ZM93.8293 86.0664L66.381 105.469L95.0636 144.274L151.195 163.676L178.643 144.274L149.96 105.469L93.8293 86.0664ZM92.8219 22.9325L109.982 28.8643L147.708 41.9048L175.755 79.8493L148.915 98.8215L94.0287 79.8493L65.982 41.9048L92.8219 22.9325ZM64.7377 41.4746L92.186 22.0723L109.969 28.2191L148.317 41.4746L177 80.2794L149.551 99.6818L93.4203 80.2794L64.7377 41.4746ZM242.978 169.874L188.092 150.901L161.252 169.874L189.298 207.818L244.185 226.79L271.025 207.818L242.978 169.874ZM187.456 150.041L160.007 169.443L188.69 208.248L244.821 227.651L272.269 208.248L243.587 169.443L187.456 150.041Z" fill="url(#paint3_radial_16927_5720)"></path> <path data-v-418b1cd4="" fillRule="evenodd" clipRule="evenodd" d="M185.898 22.9325L240.785 41.9048L268.832 79.8493L241.992 98.8215L187.105 79.8493L159.058 41.9048L185.898 22.9325ZM157.814 41.4746L185.262 22.0723L241.393 41.4746L270.076 80.2794L242.628 99.6818L186.497 80.2794L157.814 41.4746ZM280.215 150.919L335.102 169.891L363.148 207.836L336.308 226.808L281.422 207.836L253.375 169.891L280.215 150.919ZM252.131 169.461L279.579 150.059L335.71 169.461L364.393 208.266L336.944 227.668L280.813 208.266L252.131 169.461ZM333.856 105.899L278.97 86.9266L252.13 105.899L280.177 143.843L335.063 162.816L361.903 143.843L333.856 105.899ZM278.334 86.0664L250.886 105.469L279.568 144.274L335.699 163.676L363.147 144.274L334.465 105.469L278.334 86.0664ZM186.855 86.9266L241.741 105.899L269.788 143.843L242.948 162.816L188.062 143.843L160.015 105.899L186.855 86.9266ZM158.771 105.469L186.219 86.0664L242.35 105.469L271.032 144.274L243.584 163.676L187.453 144.274L158.771 105.469ZM149.352 105.899L94.4652 86.9266L67.6253 105.899L95.6721 143.843L150.559 162.816L177.399 143.843L149.352 105.899ZM93.8293 86.0664L66.381 105.469L95.0636 144.274L151.195 163.676L178.643 144.274L149.96 105.469L93.8293 86.0664ZM92.8219 22.9325L109.982 28.8643L147.708 41.9048L175.755 79.8493L148.915 98.8215L94.0287 79.8493L65.982 41.9048L92.8219 22.9325ZM64.7377 41.4746L92.186 22.0723L109.969 28.2191L148.317 41.4746L177 80.2794L149.551 99.6818L93.4203 80.2794L64.7377 41.4746ZM242.978 169.874L188.092 150.901L161.252 169.874L189.298 207.818L244.185 226.79L271.025 207.818L242.978 169.874ZM187.456 150.041L160.007 169.443L188.69 208.248L244.821 227.651L272.269 208.248L243.587 169.443L187.456 150.041Z" fill="url(#paint4_linear_16927_5720)"></path> <path data-v-418b1cd4="" d="M147.638 61.0758L156.726 61.0758M147.922 61.0759L147.922 70.1641" stroke="white" strokeWidth="0.568015"></path> <path data-v-418b1cd4="" d="M147.638 179.223L156.726 179.223M147.922 179.223L147.922 170.135" stroke="white" strokeWidth="0.568015"></path> <path data-v-418b1cd4="" d="M288.506 61.0758L279.418 61.0758M288.222 61.0759L288.222 70.1641" stroke="white" strokeWidth="0.568015"></path> <path data-v-418b1cd4="" d="M288.506 179.223L279.418 179.223M288.222 179.223L288.222 170.135" stroke="white" strokeWidth="0.568015"></path> <g data-v-418b1cd4="" filter="url(#filter1_i_16927_5720)"><path data-v-418b1cd4="" d="M303.485 73.3664C288.09 60.256 286.238 37.1479 299.348 21.7531C312.459 6.3582 335.567 4.50628 350.962 17.6167C366.357 30.7271 368.209 53.8352 355.098 69.2301C341.988 84.6249 318.88 86.4769 303.485 73.3664Z" fill="url(#paint5_radial_16927_5720)"></path></g> <circle data-v-418b1cd4="" cx="218.224" cy="119.616" r="45.7993" fill="url(#paint6_linear_16927_5720)"></circle> <circle data-v-418b1cd4="" cx="218.224" cy="119.616" r="45.7993" fill="url(#paint7_radial_16927_5720)"></circle> <circle data-v-418b1cd4="" cx="218.224" cy="119.616" r="45.7993" fill="url(#paint8_radial_16927_5720)"></circle> <g data-v-418b1cd4="" filter="url(#filter2_f_16927_5720)"><circle data-v-418b1cd4="" cx="218.224" cy="119.615" r="54.6852" fill="url(#paint9_linear_16927_5720)"></circle> <circle data-v-418b1cd4="" cx="218.224" cy="119.615" r="54.6852" fill="url(#paint10_radial_16927_5720)"></circle></g> <defs data-v-418b1cd4=""><filter data-v-418b1cd4="" id="filter0_f_16927_5720" x="41.9726" y="0.448151" width="345.186" height="248.846" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood data-v-418b1cd4="" floodOpacity="0" result="BackgroundImageFix"></feFlood> <feBlend data-v-418b1cd4="" mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend> <feGaussianBlur data-v-418b1cd4="" stdDeviation="9.53471" result="effect1_foregroundBlur_16927_5720"></feGaussianBlur></filter> <filter data-v-418b1cd4="" id="filter1_i_16927_5720" x="290.609" y="8.87695" width="73.2275" height="73.2285" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood data-v-418b1cd4="" floodOpacity="0" result="BackgroundImageFix"></feFlood> <feBlend data-v-418b1cd4="" mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend> <feColorMatrix data-v-418b1cd4="" in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix> <feOffset data-v-418b1cd4=""></feOffset> <feGaussianBlur data-v-418b1cd4="" stdDeviation="7.70514"></feGaussianBlur> <feComposite data-v-418b1cd4="" in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite> <feColorMatrix data-v-418b1cd4="" type="matrix" values="0 0 0 0 0.844 0 0 0 0 0.5125 0 0 0 0 1 0 0 0 0.56 0"></feColorMatrix> <feBlend data-v-418b1cd4="" mode="normal" in2="shape" result="effect1_innerShadow_16927_5720"></feBlend></filter> <filter data-v-418b1cd4="" id="filter2_f_16927_5720" x="116.102" y="17.4928" width="204.244" height="204.245" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood data-v-418b1cd4="" floodOpacity="0" result="BackgroundImageFix"></feFlood> <feBlend data-v-418b1cd4="" mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend> <feGaussianBlur data-v-418b1cd4="" stdDeviation="23.7184" result="effect1_foregroundBlur_16927_5720"></feGaussianBlur></filter> <radialGradient data-v-418b1cd4="" id="paint0_radial_16927_5720" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(218.032 118.213) rotate(-29.0939) scale(87.4804 80.2126)"><stop data-v-418b1cd4="" offset="0.0001" stopColor="#F5F5F5" stopOpacity="0.4"></stop> <stop data-v-418b1cd4="" offset="0.539562" stopColor="#959595" stopOpacity="0.3"></stop> <stop data-v-418b1cd4="" offset="1" stopOpacity="0"></stop></radialGradient> <radialGradient data-v-418b1cd4="" id="paint1_radial_16927_5720" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(207.13 138.57) rotate(-39.4745) scale(193.914 128.927)"><stop data-v-418b1cd4="" offset="0.0693272" stopColor="#3646D2"></stop> <stop data-v-418b1cd4="" offset="1" stopColor="#CF36D2" stopOpacity="0"></stop></radialGradient> <linearGradient data-v-418b1cd4="" id="paint2_linear_16927_5720" x1="150.234" y1="192.305" x2="285.432" y2="110.968" gradientUnits="userSpaceOnUse"><stop data-v-418b1cd4="" offset="0.28125" stopColor="white"></stop> <stop data-v-418b1cd4="" offset="1" stopColor="white" stopOpacity="0"></stop></linearGradient> <radialGradient data-v-418b1cd4="" id="paint3_radial_16927_5720" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(218.304 119.29) rotate(-40.9792) scale(240.252 221.706)"><stop data-v-418b1cd4="" offset="0.265303" stopColor="#BEFFDC"></stop> <stop data-v-418b1cd4="" offset="0.686977" stopColor="#CF36D2" stopOpacity="0"></stop></radialGradient> <linearGradient data-v-418b1cd4="" id="paint4_linear_16927_5720" x1="105.058" y1="208.877" x2="328.237" y2="104.062" gradientUnits="userSpaceOnUse"><stop data-v-418b1cd4="" offset="0.28125" stopColor="white"></stop> <stop data-v-418b1cd4="" offset="1" stopColor="white" stopOpacity="0"></stop></linearGradient> <radialGradient data-v-418b1cd4="" id="paint5_radial_16927_5720" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(347.253 21.5529) rotate(128.56) scale(78.5804 69.9856)"><stop data-v-418b1cd4="" stopColor="#182069"></stop> <stop data-v-418b1cd4="" offset="0.723958" stopColor="#202DA2"></stop> <stop data-v-418b1cd4="" offset="0.880208" stopColor="#FFE7D1"></stop></radialGradient> <linearGradient data-v-418b1cd4="" id="paint6_linear_16927_5720" x1="218.224" y1="75.635" x2="172.425" y2="149.131" gradientUnits="userSpaceOnUse"><stop data-v-418b1cd4="" stopColor="#7ABFFF"></stop> <stop data-v-418b1cd4="" offset="0.270542" stopColor="#A5D4FF"></stop> <stop data-v-418b1cd4="" offset="0.72557" stopColor="#A5DEFF" stopOpacity="0"></stop></linearGradient> <radialGradient data-v-418b1cd4="" id="paint7_radial_16927_5720" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(218.224 116.066) rotate(137.414) scale(49.4768 91.7818)"><stop data-v-418b1cd4="" stopColor="#000AFF"></stop> <stop data-v-418b1cd4="" offset="1" stopColor="white" stopOpacity="0"></stop></radialGradient> <radialGradient data-v-418b1cd4="" id="paint8_radial_16927_5720" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(218.224 119.616) rotate(90) scale(43.9807)"><stop data-v-418b1cd4="" offset="0.223958" stopColor="#A5FBFF"></stop> <stop data-v-418b1cd4="" offset="0.385417" stopColor="#86A1FF" stopOpacity="0.7"></stop> <stop data-v-418b1cd4="" offset="0.729167" stopColor="#8F00D2" stopOpacity="0.29"></stop> <stop data-v-418b1cd4="" offset="1" stopColor="#120698" stopOpacity="0"></stop></radialGradient> <linearGradient data-v-418b1cd4="" id="paint9_linear_16927_5720" x1="218.224" y1="67.1011" x2="163.539" y2="154.856" gradientUnits="userSpaceOnUse"><stop data-v-418b1cd4="" stopColor="#7ABFFF"></stop> <stop data-v-418b1cd4="" offset="0.270542" stopColor="#A5D4FF"></stop> <stop data-v-418b1cd4="" offset="0.72557" stopColor="#A5DEFF" stopOpacity="0"></stop></linearGradient> <radialGradient data-v-418b1cd4="" id="paint10_radial_16927_5720" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(218.224 119.615) rotate(90) scale(40.4788 37.6398)"><stop data-v-418b1cd4="" stopColor="#98E6FF"></stop> <stop data-v-418b1cd4="" offset="1" stopColor="white" stopOpacity="0"></stop></radialGradient></defs></svg>
                  {/* <Image
                    src="/garuda.png"
                    width={1320}
                    height={1280}
                    alt="Illustration of globalization"
                    className="relative w-full"
                  /> */}
                </div>
              </div>
            </div>
          </div>

        </section>

      </div>


      <section className="relative section-background ">

        <div className="container px-6 py-10">
          <div className="lg:flex lg:items-center">
            <div className="w-full space-y-12 lg:w-1/2">
              <div>
                <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
                  explore our LinkFinity <br /> Web3-Enabled Features
                </h1>
                <div className="mt-2">
                  <span className="inline-block w-40 h-1 rounded-full bg-[var(--primary-color)] transition-colors duration-300 hover:bg-opacity-80"></span>
                  <span className="inline-block w-3 h-1 ml-1 rounded-full bg-[var(--primary-color)] transition-colors duration-300 hover:bg-opacity-80"></span>
                  <span className="inline-block w-1 h-1 ml-1 rounded-full bg-[var(--primary-color)] transition-colors duration-300 hover:bg-opacity-80"></span>
                </div>

              </div>

              <div className="md:flex md:items-start md:-mx-4">
                <span className="inline-block p-2 text-[var(--primary-color)] bg-[var(--primary-color)] bg-opacity-10 rounded-xl md:mx-4 dark:text-[var(--primary-color)] dark:bg-[var(--primary-color)]">
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 5 9 4V3m5 2 1-1V3m-3 6v11m0-11a5 5 0 0 1 5 5m-5-5a5 5 0 0 0-5 5m5-5a4.959 4.959 0 0 1 2.973 1H15V8a3 3 0 0 0-6 0v2h.027A4.959 4.959 0 0 1 12 9Zm-5 5H5m2 0v2a5 5 0 0 0 10 0v-2m2.025 0H17m-9.975 4H6a1 1 0 0 0-1 1v2m12-3h1.025a1 1 0 0 1 1 1v2M16 11h1a1 1 0 0 0 1-1V8m-9.975 3H7a1 1 0 0 1-1-1V8" />
                  </svg>

                </span>

                <div className="mt-4 md:mx-4 md:mt-0">
                  <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Layered Security</h1>
                  <p className="mt-3 sm:text-lg text-white lg:w-11/12">
                    Protects accounts and information with advanced encryption technology, reduces the risk of hacking or data leakage, and provides a higher level of security than traditional solutions.
                  </p>
                </div>
              </div>

              <div className="md:flex md:items-start md:-mx-4">
                <span className="inline-block p-2 text-[var(--primary-color)] bg-[var(--primary-color)] bg-opacity-10 rounded-xl md:mx-4 dark:text-[var(--primary-color)] dark:bg-[var(--primary-color)]">
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M8.737 8.737a21.49 21.49 0 0 1 3.308-2.724m0 0c3.063-2.026 5.99-2.641 7.331-1.3 1.827 1.828.026 6.591-4.023 10.64-4.049 4.049-8.812 5.85-10.64 4.023-1.33-1.33-.736-4.218 1.249-7.253m6.083-6.11c-3.063-2.026-5.99-2.641-7.331-1.3-1.827 1.828-.026 6.591 4.023 10.64m3.308-9.34a21.497 21.497 0 0 1 3.308 2.724m2.775 3.386c1.985 3.035 2.579 5.923 1.248 7.253-1.336 1.337-4.245.732-7.295-1.275M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                  </svg>

                </span>

                <div className="mt-4 md:mx-4 md:mt-0">
                  <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Decentralization</h1>
                  <p className="mt-3 sm:text-lg text-white lg:w-11/12">
                    Enjoy freedom without control and give you full control over your data.
                  </p>
                </div>
              </div>

              <div className="md:flex md:items-start md:-mx-4">
                <span className="inline-block p-2 text-[var(--primary-color)] bg-[var(--primary-color)] bg-opacity-10 rounded-xl md:mx-4 dark:text-[var(--primary-color)] dark:bg-[var(--primary-color)]">
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961" />
                  </svg>

                </span>


                <div className="mt-4 md:mx-4 md:mt-0">
                  <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Multichain</h1>
                  <p className="mt-3 sm:text-lg text-white lg:w-11/12">
                    Bringing blockchain interoperability and flexibility to a more dynamic Web3 ecosystem.
                  </p>
                </div>


              </div>

              <div className="md:flex md:items-start md:-mx-4">
                <span className="inline-block p-2 text-[var(--primary-color)] bg-[var(--primary-color)] bg-opacity-10 rounded-xl md:mx-4 dark:text-[var(--primary-color)] dark:bg-[var(--primary-color)]">
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 0 1 1-1h11.586a1 1 0 0 1 .707.293l2.414 2.414a1 1 0 0 1 .293.707V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z" />
                    <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M8 4h8v4H8V4Zm7 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>

                </span>


                <div className="mt-4 md:mx-4 md:mt-0">
                  <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Onchain</h1>
                  <p className="mt-3 sm:text-lg text-white lg:w-11/12">
                    Increase trust through full transparency in every transaction. With Onchain, all data is recorded directly on the ICP blockchain.
                  </p>
                </div>



              </div>


            </div>





            <div className="hidden lg:flex lg:items-center lg:w-1/2 lg:justify-center">
              <DotLottieReact
                src="https://lottie.host/a586177f-e0c2-41bc-9690-ce8fd56d1c60/IrjovkJQTK.lottie"
                loop
                autoplay
                className="w-[1050px] h-[1050px]"
              />
            </div>
          </div>

          <hr className="border-gray-200 my-12 dark:border-gray-700" />

          {/* Grid Section */}
          {/* <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
            <div className="flex items-center justify-center col-span-1 md:col-span-2 lg:col-span-1">
              <svg
                className="h-12 text-gray-500 fill-current dark:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 266 100"
              >
                <path fill="none" d="M0 0h266v100H0z"></path>
                <path d="..." />
              </svg>
            </div>
          </div> */}
        </div>



      </section>

      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight dark:text-white text-gray-900 sm:text-5xl lg:text-balance">Analytics and Growth</p>
            <p className="mt-6 text-lg/8 text-gray-600 dark:text-white">LinkFinity not only offers you the ease of sharing content, but also gives you the tools to analyze your bio performance. View statistics on visitors, clicks, and interactions right from your dashboard. With this data, you can design better strategies to increase your audience reach and engagement. Keep growing with LinkFinity and achieve greater success!</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16 ">
              <div className="relative pl-16">
                <dt className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                  <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-xl dark:text-white dark:bg-[var(--primary-color)]">
                    <svg className="w-12 h-12 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4.5V19a1 1 0 0 0 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.207M20 9v3.207" />
                    </svg>

                  </div>
                  Visitor Tracking
                </dt>
                <dd className="mt-2 sm:text-lg text-white lg:w-11/12">Get information about who is visiting your bio link and where they are coming from.</dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                  <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg rounded-xl dark:text-white dark:bg-[var(--primary-color)]">
                    <svg className="w-12 h-12 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z" />
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z" />
                    </svg>

                  </div>
                  Performance Report
                </dt>
                <dd className="mt-2 sm:text-lg text-white lg:w-11/12">Analyze click data, time spent on page, and more to understand your audience's behavior.</dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                  <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg rounded-xl dark:text-white dark:bg-[var(--primary-color)]">
                    <svg className="w-12 h-12 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3v4a1 1 0 0 1-1 1H5m4 10v-2m3 2v-6m3 6v-3m4-11v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z" />
                    </svg>


                  </div>
                  Traffic Optimization
                </dt>
                <dd className="mt-2 sm:text-lg text-white lg:w-11/12">Customize content and strategies based on analytics data to attract more visitors and increase engagement.</dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                  <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg rounded-xl dark:text-white dark:bg-[var(--primary-color)]">
                    <svg className="w-12 h-12 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5 3 3L17.273 7 20 9.667" />
                    </svg>

                  </div>
                  Growth Insights
                </dt>
                <dd className="mt-2 sm:text-lg text-white lg:w-11/12">Identify audience growth and interaction trends to plan long-term development steps and strengthen your digital presence.</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <footer className="bg-drak-200 p-10 font-[sans-serif] tracking-wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:flex lg:items-center">
            <a href="#">
              <img src={linkfinty} alt="logo" className="w-52" />
            </a>
          </div>

          <div className="lg:flex lg:items-center">
            <ul className="flex space-x-6">
              <li>
                <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" className="fill-gray-300 hover:fill-white w-7 h-7" viewBox="0 0 24 24">
                    <path fillRule="evenodd"
                      d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7v-7h-2v-3h2V8.5A3.5 3.5 0 0 1 15.5 5H18v3h-2a1 1 0 0 0-1 1v2h3v3h-3v7h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"
                      clipRule="evenodd" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" className="fill-gray-300 hover:fill-white w-7 h-7" viewBox="0 0 24 24">
                    <path fillRule="evenodd"
                      d="M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5zm-2.5 8.2v5.3h-2.79v-4.93a1.4 1.4 0 0 0-1.4-1.4c-.77 0-1.39.63-1.39 1.4v4.93h-2.79v-8.37h2.79v1.11c.48-.78 1.47-1.3 2.32-1.3 1.8 0 3.26 1.46 3.26 3.26zM6.88 8.56a1.686 1.686 0 0 0 0-3.37 1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 1.57v8.37H5.5v-8.37h2.77z"
                      clipRule="evenodd" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="fill-gray-300 hover:fill-white w-7 h-7"
                    viewBox="0 0 24 24">
                    <path
                      d="M22.92 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.83 4.5 17.72 4 16.46 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.9 20.29 6.16 21 8.58 21c7.88 0 12.21-6.54 12.21-12.21 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Email</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Phone</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Address</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Information</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Terms &amp; Conditions</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>

        <p className='text-gray-300 text-sm mt-10'>© LinkFinity. All rights reserved.
        </p>
      </footer>


    </>
  );
}

export default LandingPage;


