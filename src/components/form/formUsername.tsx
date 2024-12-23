import React, { useState, useEffect } from "react";
// import { useProfileService } from "../../services/getUsernameLink";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UsernameForm: React.FC = () => {

  const navigate = useNavigate();
  
  //   const { saveProfile } = useProfileService();
  const [desiredUsername, setDesiredUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      //   saveProfile(
      //     event,
      //     desiredUsername,
      //     (username) => {
      //       //console.log("Username saved successfully:", username);
      //       setError(null);
      //     },
      //     (errMessage) => {
      //       //console.error("Error saving username:", errMessage);
      //       setError(errMessage);
      //     }
      //   ).finally(() => {
      //     setIsLoading(false);
      //   });
      navigate("/editprofile");
      toast.success("Username successfully!")
      setIsLoading(false);
    }, 2500);
  };


  return (
    <div className="max-w-lg mx-auto mt-12 bg-white shadow-lg rounded-lg p-8 relative">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Animasi Lottie */}
        <div className="flex justify-center mb-4">
          <div className="transform transition-transform duration-500 hover:scale-110">
            <DotLottieReact
              src="https://lottie.host/03520a34-7692-490b-9d4d-f6203755753a/DHQ369GRdQ.lottie"
              loop
              autoplay
              className="w-40 h-40"
            />
          </div>
        </div>

        {/* Judul Form */}
        <h1 className="text-3xl font-extrabold text-center text-indigo-600">
          Grab Your Username
        </h1>

        {/* Deskripsi Form */}
        <p className="text-center text-gray-600">
          Choose a unique username to create your bio link
        </p>

        {/* Input Username */}
        <input
          name="username"
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-center text-gray-700 placeholder-gray-500"
          value={desiredUsername}
          onChange={(e) => {
            const filteredValue = e.target.value.replace(/[^a-z0-9]/g, "").toLowerCase();
            setDesiredUsername(filteredValue);
          }}
          type="text"
          placeholder="Enter your username"
          disabled={isLoading}
        />
        {/* Error Handling */}
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-600 p-3 rounded-lg text-sm shadow-sm">
            {error}
          </div>
        )}

        {/* Tombol Submit */}
        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center transition-all ${isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C6.48 0 2 4.48 2 10h2zm2 5.291A7.962 7.962 0 014 12H2c0 2.233.966 4.243 2.514 5.669l1.486-1.378z"
                ></path>
              </svg>
              Claiming Username, Please Wait...
            </>
          ) : (
            "Claim Your Username"
          )}
        </button>
      </form>
    </div>
  );
};

export default UsernameForm;