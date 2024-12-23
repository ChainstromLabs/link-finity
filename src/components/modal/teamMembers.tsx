import { useState } from "react";

// 1. Definisikan tipe untuk anggota tim
interface TeamMember {
    name: string;
    role: string;
    image: string;
    bio: string;
    link: string;
}

// 2. Definisikan tipe untuk props komponen
interface TeamMembersModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
}

const TeamMembersModal: React.FC<TeamMembersModalProps> = ({ isModalOpen, closeModal }) => {

    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null); 

    const teamMembers: TeamMember[];
    
    return (
        <>
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full overflow-hidden transition-all duration-300">
                        <div className="p-6">
                            {!selectedMember ? (
                                // List of Team Members
                                <>
                                    <h2 className="text-2xl font-bold text-indigo-800 dark:text-white mb-4">Team Members</h2>
                                    <div className="space-y-4 max-h-[50vh] overflow-y-auto">
                                        {teamMembers.map((member, index) => (
                                            <div
                                                key={index}
                                                onClick={() => setSelectedMember(member)} // Menentukan anggota yang dipilih
                                                className="flex items-center space-x-4 p-3 bg-indigo-50 dark:bg-gray-700 rounded-lg transition-all duration-300 hover:bg-indigo-100 dark:hover:bg-gray-600 cursor-pointer"
                                            >
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="w-12 h-12 rounded-full border-2 border-indigo-800 dark:border-blue-900"
                                                />
                                                <div>
                                                    <h3 className="text-lg font-semibold text-indigo-800 dark:text-white">
                                                        {member.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">{member.role}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                // Tampilan profil anggota yang dipilih
                                <div className="max-h-[60vh] overflow-y-auto p-4">
                                    <div className="relative mt-16 mb-10 max-w-sm mx-auto mt-24">
                                        <div className="rounded overflow-hidden shadow-md bg-white dark:bg-gray-700">
                                            <div className="absolute -mt-20 w-full flex justify-center">
                                                <div className="h-32 w-32">
                                                    <img
                                                        src={selectedMember.image}
                                                        className="rounded-full object-cover h-full w-full shadow-md"
                                                        alt={selectedMember.name}
                                                    />
                                                </div>
                                            </div>
                                            <div className="px-6 mt-16">
                                                <h1 className="font-bold text-3xl text-center mb-1 dark:text-white">
                                                    {selectedMember.name}
                                                </h1>
                                                <p className="text-gray-800 text-sm text-center dark:text-gray-200">
                                                    {selectedMember.role}
                                                </p>
                                                <p className="text-center text-gray-600 text-base pt-3 font-normal dark:text-gray-300">
                                                    {selectedMember.bio}
                                                </p>
                                                <div className="w-full flex justify-center pt-5 pb-5">
                                                    <button
                                                        onClick={() => window.location.href = '/profile'} // Ganti dengan rute atau aksi sesuai kebutuhan
                                                        className="bg-blue-600 text-white px-6 py-3 border-2 border-blue-600 rounded-none hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    >
                                                        <i className="fas fa-user mr-2"></i> View Profile 
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-between p-4">
                            {selectedMember && (
                                <button
                                    onClick={() => setSelectedMember(null)}
                                    className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 cursor-pointer"
                                >
                                    <i className="fas fa-arrow-left mr-2"></i> Back
                                </button>
                            )}
                            <button
                                onClick={closeModal}
                                className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 cursor-pointer"
                            >
                                <i className="fas fa-times mr-2"></i> Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TeamMembersModal;
