// const [activeTab, setActiveTab] = useState("Posts");
// const [loading, setLoading] = useState(false);

// const handleTabClick = (tab) => {
//     setLoading(true);
//     setTimeout(() => {
//         setActiveTab(tab);
//         setLoading(false);
//     }, 1000);
// };


// const renderContent = () => {
//     if (loading) {
//         return (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {/* Skeleton Card */}
//                 {Array.from({ length: 4 }).map((_, index) => (
//                     <div
//                         key={index}
//                         className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-pulse"
//                     >
//                         {/* Cover Image */}
//                         <div className="relative h-40 bg-gray-300"></div>

//                         {/* Avatar */}
//                         <div className="relative -mt-12 flex justify-center">
//                             <div className="w-24 h-24 rounded-full bg-gray-300 border-4 border-white"></div>
//                             <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-gray-300 rounded-full w-8 h-8"></div>
//                         </div>

//                         {/* Profile Details */}
//                         <div className="px-6 py-4 text-center space-y-3">
//                             <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
//                             <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
//                             <div className="h-4 bg-gray-300 rounded w-full"></div>
//                         </div>

//                         {/* Stats or Featured Badge */}
//                         <div className="px-6 py-2 text-center">
//                             <div className="h-6 bg-gray-300 rounded w-32 mx-auto"></div>
//                         </div>

//                         {/* Action Button */}
//                         <div className="px-6 py-4 text-center">
//                             <div className="h-10 bg-gray-300 rounded-full w-36 mx-auto"></div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//         );
//     }

//     switch (activeTab) {
//         case "Posts":
//             return <div className="text-gray-800">Ini adalah konten *Posts*.</div>;
//         case "About":
//             return <div className="text-gray-800">Ini adalah konten *About*.</div>;
//         case "Gallery":
//             return <div className="text-gray-800">Ini adalah konten *Gallery*.</div>;
//         case "More":
//             return <div className="text-gray-800">Ini adalah konten *More*.</div>;
//         default:
//             return null;
//     }
// };



// <div className="container mx-auto p-4">
// {/* Tabs */}
// <div className="sm:w-fit xs:w-[90%] sm:px-4 py-2 rounded-sm flex md:flex-nowrap xs:flex-wrap md:gap-4 xs:gap-1 justify-center text-black cursor-pointer md:text-lg md:font-semibold xs:text-sm">
//     {["Posts", "About", "Gallery", "More"].map((tab) => (
//         <div
//             key={tab}
//             onClick={() => handleTabClick(tab)}
//             className={`px-4 py-1 rounded-b-md cursor-pointer border-b-2 ${activeTab === tab
//                     ? "border-yellow-600 text-yellow-600"
//                     : "border-transparent hover:border-yellow-600"
//                 }`}
//         >
//             {tab}
//         </div>
//     ))}
// </div>

// {/* Content Section */}
// <div className="mt-6 p-4 border rounded-md bg-white shadow-md">{renderContent()}</div>
// </div>
