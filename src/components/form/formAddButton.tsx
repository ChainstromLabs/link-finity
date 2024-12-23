import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { toast } from 'react-toastify';

interface TeamMember {
    name: string;
    role: string;
    bio: string;
    profilePicture?: string;
    profileLink?: string;
}


interface Link {
    id: string;
    key: string;
    title: string;
    type: string;
    icon: string;
    url: string;
    teamMembers?: TeamMember[];
    transactionOptions?: {
        ICP?: boolean;
        Solana?: boolean;
        EVM?: boolean;
    };
    nft?: {
        ICP?: boolean;
        Solana?: boolean;
        EVM?: boolean;
    };
}

interface Page {
    links: Link[];
}

interface User {
    id: string;
    name: string;
}

interface PageLinksFormProps {
    page: Page;
    user: User;
}

export default function PageLinksForm({ page, user }: PageLinksFormProps) {
    const [links, setLinks] = useState<Link[]>(page.links || []);


    async function save(ev: React.FormEvent) {
        ev.preventDefault();
    
        const nftCount = links.filter(link => link.type === "nft").length;

        if (nftCount >= 2) {
            console.log("Cannot save: There are two or more links with 'type: nft'.");
            return; 
        }
    
        const dataToSave = JSON.stringify(links, null, 2);
        toast.success("Successfully!")
        console.log("Saved Data:", dataToSave);
        console.log("Saved!");
    }
    
    


    function addNewLink() {
        setLinks((prev) => {
            return [
                ...prev,
                {
                    id: Date.now().toString(),
                    key: Date.now().toString(),
                    title: "",
                    type: "",
                    icon: "",
                    url: "",
                },
            ];
        });
    }
    

    function handleLinkChange(
        keyOfLinkToChange: string,
        prop: keyof Link,
        ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        setLinks((prev) => {
            const newLinks = [...prev];
            const linkToChange = newLinks.find((link) => link.key === keyOfLinkToChange);
    
            if (linkToChange) {
                if (prop === "teamMembers") {
                    linkToChange[prop] = ev.target.value.split(",").map((member) => ({
                        name: member.trim(),
                        role: "",
                        bio: "",
                    }));
                } else if (prop === "transactionOptions" || prop === "nft") {
                    const optionValue = ev.target.value.toLowerCase() === "true";
                    linkToChange[prop] = {
                        ...(linkToChange[prop] || {}),
                        [ev.target.name]: optionValue,
                    };
                } else {
                    linkToChange[prop] = ev.target.value;
                }
            }
    
            return newLinks;
        });
    }
    

    function removeLink(linkKeyToRemove: string) {
        setLinks((prevLinks) =>
            prevLinks.filter((l) => l.key !== linkKeyToRemove)
        );
    }


    function handleIconUpload(keyOfLink: string, ev: React.ChangeEvent<HTMLInputElement>) {
        const file = ev.target.files?.[0];
        if (file) {
            const objectURL = URL.createObjectURL(file);
            setLinks((prevLinks) => {
                const updatedLinks = prevLinks.map((link) => {
                    if (link.key === keyOfLink) {
                        link.icon = objectURL;
                    }
                    return link;
                });
                return updatedLinks;
            });
        }
    }

    const addTeamMember = (key: string) => {
        setLinks((prevLinks) =>
            prevLinks.map((link) =>
                link.key === key
                    ? {
                        ...link,
                        teamMembers: [
                            ...(link.teamMembers || []),
                            { name: "", role: "", bio: "" },
                        ],
                    }
                    : link
            )
        );
    };

    const removeTeamMember = (key: string, memberIndex: number) => {
        setLinks((prevLinks) =>
            prevLinks.map((link) =>
                link.key === key
                    ? {
                        ...link,
                        teamMembers: link.teamMembers?.filter(
                            (_, index) => index !== memberIndex
                        ),
                    }
                    : link
            )
        );
    };

    const handleTeamMemberChange = (
        key: string,
        memberIndex: number,
        field: keyof TeamMember,
        ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (field === "profilePicture" && (ev.target as HTMLInputElement).files) {
            const file = (ev.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    setLinks((prevLinks) =>
                        prevLinks.map((link) =>
                            link.key === key
                                ? {
                                    ...link,
                                    teamMembers: link.teamMembers?.map((member, index) =>
                                        index === memberIndex
                                            ? { ...member, profilePicture: reader.result as string }
                                            : member
                                    ),
                                }
                                : link
                        )
                    );
                };
                reader.readAsDataURL(file);
            }
        } else {
            setLinks((prevLinks) =>
                prevLinks.map((link) =>
                    link.key === key
                        ? {
                            ...link,
                            teamMembers: link.teamMembers?.map((member, index) =>
                                index === memberIndex
                                    ? { ...member, [field]: ev.target.value }
                                    : member
                            ),
                        }
                        : link
                )
            );
        }
    };
    

    const handleTransactionChange = (
        key: string,
        option: string,
        isChecked: boolean
    ) => {
        setLinks((prevLinks) =>
            prevLinks.map((link) =>
                link.key === key
                    ? {
                        ...link,
                        transactionOptions: {
                            ...link.transactionOptions,
                            [option]: isChecked,
                        },
                    }
                    : link
            )
        );
    };




    const handleTransactionChangeNFT = (
        key: string,
        option: string,
        isChecked: boolean
    ) => {
        setLinks((prevLinks) =>
            prevLinks.map((link) =>
                link.key === key
                    ? {
                        ...link,
                        transactionOptions: {
                            ...link.transactionOptions,
                            [option]: isChecked,
                        },
                    }
                    : link
            )
        );
    };

    return (
        <form
            onSubmit={save}
            className="space-y-4 bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md max-w-full sm:max-w-2xl mx-auto"
        >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Customize Branding Your Profile</h2>

            <button
                onClick={addNewLink}
                type="button"
                className="w-full sm:w-auto text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md flex items-center justify-center gap-2 shadow-md"
            >
                <i className="fa fa-plus"></i>
                <span>Add New Link</span>
            </button>

            <div className="space-y-4 mt-4">
                <ReactSortable
                    handle={".handle"}
                    list={links}
                    setList={(newLinks) => setLinks(newLinks as Link[])}
                >
                    {links.map((l) => (
                        <div
                            key={l.key}
                            className="flex flex-wrap sm:flex-nowrap gap-4 items-center mb-4"
                        >
                            {/* Handle Icon */}
                            <div className="handle cursor-grab text-gray-500 hover:text-gray-700">
                                <i className="fa fa-grip-lines text-gray-400"></i>
                            </div>

                            {/* Icon Section */}
                            {!["video-tweet", "single-tweet", "youtube-video"].includes(l.type) && (
                                <div className="bg-gray-200 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center overflow-hidden border-2 border-blue-500 shadow-md hover:border-blue-600 transition-all duration-300">
                                    {l.icon ? (
                                        <img
                                            className="w-full h-full object-cover"
                                            src={l.icon}
                                            alt="icon"
                                        />
                                    ) : (
                                        <i className="fa fa-user text-gray-500 text-lg sm:text-2xl"></i>
                                    )}
                                </div>
                            )}

                            {/* Actions Section */}
                            <div className="mt-2 sm:mt-0 ml-0 sm:ml-4 flex-0 flex sm:flex-row flex-col space-y-2 sm:space-y-0 sm:space-x-4">
                                <div className="flex flex-col items-start sm:items-center gap-2 sm:gap-4">
                                    {!["timeline-tweets", "video-tweet", "single-tweet", "youtube-video"].includes(l.type) && (
                                        <>
                                            <input
                                                onChange={(ev) => handleIconUpload(l.key, ev)}
                                                id={"icon" + l.key}
                                                type="file"
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor={"icon" + l.key}
                                                className="cursor-pointer text-gray-600 hover:text-blue-500 flex items-center gap-1 transition duration-200 ease-in-out"
                                            >
                                                <i className="fa fa-cloud-upload-alt"></i>
                                                <span>Change Icon</span>
                                            </label>
                                        </>
                                    )}

                                    <button
                                        onClick={() => removeLink(l.key)}
                                        type="button"
                                        className="mt-1 sm:mt-0 text-red-500 hover:text-red-600 flex items-center gap-1 transition duration-200 ease-in-out"
                                    >
                                        <i className="fa fa-trash"></i>
                                        <span>Remove Link</span>
                                    </button>
                                </div>
                            </div>

                            {/* Form Fields Section */}
                            <div className="flex-1 space-y-2 sm:space-y-3">
                                <div>
                                    <label className="block text-sm text-gray-600 font-medium">
                                        Title
                                    </label>
                                    <input
                                        value={l.title}
                                        onChange={(ev) => handleLinkChange(l.key, "title", ev)}
                                        type="text"
                                        placeholder="Enter Title"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-600 font-medium">
                                        Type
                                    </label>
                                    <select
                                        value={l.type}
                                        onChange={(ev) => handleLinkChange(l.key, "type", ev)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out text-sm"
                                    >
                                        <option value="">Select Type</option>
                                        <option value="spotify">Spotify</option>
                                        <option value="link">Link</option>
                                        <option value="website">Website (iframe)</option>
                                        <option value="team-members">Team Members</option>
                                        <option value="transaction">Transaction</option>
                                        <option value="nft">NFT</option>
                                        <option value="banner-ad">Banner Ad</option>
                                        <option value="rectangle-ad">Rectangle Ad</option>
                                        <option value="timeline-tweets">Timeline Tweets</option>
                                        <option value="video-tweet">Video Tweet</option>
                                        <option value="single-tweet">Single Tweet</option>
                                        <option value="youtube-video">YouTube Video</option>
                                    </select>
                                </div>

                                {!["team-members", "transaction", "nft"].includes(l.type) && (
                                    <div>
                                        <label className="block text-sm text-gray-600 font-medium">
                                            URL
                                        </label>
                                        <input
                                            value={l.url}
                                            onChange={(ev) => handleLinkChange(l.key, "url", ev)}
                                            type="text"
                                            placeholder="Enter URL"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out text-sm"
                                        />
                                    </div>
                                )}


                                {l.type === "team-members" && (
                                    <div>
                                        <label className="block text-sm text-gray-600 font-medium">
                                            Team Members
                                        </label>
                                        {l.teamMembers?.map((member, memberIndex) => (
                                            <div
                                                key={memberIndex}
                                                className="border border-gray-300 rounded-md p-3 mb-3"
                                            >
                                                <div className="mb-2">
                                                    <label className="block text-xs text-gray-600 font-medium">
                                                        Name
                                                    </label>
                                                    <input
                                                        value={member.name}
                                                        onChange={(ev) =>
                                                            handleTeamMemberChange(l.key, memberIndex, "name", ev)
                                                        }
                                                        type="text"
                                                        placeholder="Enter Name"
                                                        className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out text-xs"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block text-xs text-gray-600 font-medium">
                                                        Role
                                                    </label>
                                                    <input
                                                        value={member.role}
                                                        onChange={(ev) =>
                                                            handleTeamMemberChange(l.key, memberIndex, "role", ev)
                                                        }
                                                        type="text"
                                                        placeholder="Enter Role"
                                                        className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out text-xs"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block text-xs text-gray-600 font-medium">
                                                        Bio
                                                    </label>
                                                    <textarea
                                                        value={member.bio}
                                                        onChange={(ev) =>
                                                            handleTeamMemberChange(l.key, memberIndex, "bio", ev)
                                                        }
                                                        placeholder="Enter Bio"
                                                        className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out text-xs"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block text-xs text-gray-600 font-medium">
                                                        Profile Picture
                                                    </label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(ev) =>
                                                            handleTeamMemberChange(l.key, memberIndex, "profilePicture", ev)
                                                        }
                                                        className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out text-xs"
                                                    />
                                                    {member.profilePicture && (
                                                        <img
                                                            src={member.profilePicture}
                                                            alt="Profile"
                                                            className="mt-2 w-16 h-16 object-cover rounded-full"
                                                        />
                                                    )}
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block text-xs text-gray-600 font-medium">
                                                        Profile Link
                                                    </label>
                                                    <input
                                                        value={member.profileLink}
                                                        onChange={(ev) =>
                                                            handleTeamMemberChange(l.key, memberIndex, "profileLink", ev)
                                                        }
                                                        type="url"
                                                        placeholder="Enter Profile Link"
                                                        className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out text-xs"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    className="text-red-500 hover:text-red-600 text-xs"
                                                    onClick={() => removeTeamMember(l.key, memberIndex)}
                                                >
                                                    Remove Member
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="text-blue-500 hover:text-blue-600 text-xs"
                                            onClick={() => addTeamMember(l.key)}
                                        >
                                            Add Team Member
                                        </button>
                                    </div>
                                )}

                                {l.type === "transaction" && (
                                    <div>
                                        <label className="block text-sm text-gray-600 font-medium">
                                            Transaction Options
                                        </label>
                                        <div className="mt-2 space-y-2">
                                            {/* ICP */}
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={`icp-${l.key}`}
                                                    onChange={(ev) =>
                                                        handleTransactionChange(l.key, "ICP", ev.target.checked)
                                                    }
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                                />
                                                <label
                                                    htmlFor={`icp-${l.key}`}
                                                    className="text-sm text-gray-700 font-medium flex items-center space-x-2"
                                                >
                                                    <i className="fa fa-circle text-indigo-500"></i>
                                                    <span>Internet Protocol Computer</span>
                                                </label>
                                            </div>

                                            {/* Solana */}
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={`solana-${l.key}`}
                                                    onChange={(ev) =>
                                                        handleTransactionChange(l.key, "Solana", ev.target.checked)
                                                    }
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                                />
                                                <label
                                                    htmlFor={`solana-${l.key}`}
                                                    className="text-sm text-gray-700 font-medium flex items-center space-x-2"
                                                >
                                                    <i className="fa fa-circle text-green-500"></i>
                                                    <span>Solana</span>
                                                </label>
                                            </div>

                                            {/* EVM */}
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={`evm-${l.key}`}
                                                    onChange={(ev) =>
                                                        handleTransactionChange(l.key, "EVM", ev.target.checked)
                                                    }
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                                />
                                                <label
                                                    htmlFor={`evm-${l.key}`}
                                                    className="text-sm text-gray-700 font-medium flex items-center space-x-2"
                                                >
                                                    <i className="fa fa-circle text-orange-500"></i>
                                                    <span>EVM</span>
                                                </label>
                                            </div>
                                            <button className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                                                Connect For Linked ICP
                                            </button>
                                            <button className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
                                                Connect For Linked EVM
                                            </button>
                                            <button className="px-6 py-2 bg-purple-500 text-white font-bold rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75">
                                                Connect For Linked SOL
                                            </button>

                                        </div>
                                    </div>
                                )}

                                {l.type === "nft" && (
                                    <div>
                                        <label className="block text-sm text-gray-600 font-medium">
                                            Transaction Options
                                        </label>
                                        <div className="mt-2 space-y-2">
                                            {/* ICP */}
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={`icp-${l.key}`}
                                                    onChange={(ev) =>
                                                        handleTransactionChangeNFT(l.key, "ICP", ev.target.checked)
                                                    }
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                                />
                                                <label
                                                    htmlFor={`icp-${l.key}`}
                                                    className="text-sm text-gray-700 font-medium flex items-center space-x-2"
                                                >
                                                    <i className="fa fa-circle text-indigo-500"></i>
                                                    <span>Internet Protocol Computer</span>
                                                </label>
                                            </div>

                                            {/* Solana */}
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={`solana-${l.key}`}
                                                    onChange={(ev) =>
                                                        handleTransactionChangeNFT(l.key, "Solana", ev.target.checked)
                                                    }
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                                />
                                                <label
                                                    htmlFor={`solana-${l.key}`}
                                                    className="text-sm text-gray-700 font-medium flex items-center space-x-2"
                                                >
                                                    <i className="fa fa-circle text-green-500"></i>
                                                    <span>Solana</span>
                                                </label>
                                            </div>

                                            {/* EVM */}
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={`evm-${l.key}`}
                                                    onChange={(ev) =>
                                                        handleTransactionChangeNFT(l.key, "EVM", ev.target.checked)
                                                    }
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                                />
                                                <label
                                                    htmlFor={`evm-${l.key}`}
                                                    className="text-sm text-gray-700 font-medium flex items-center space-x-2"
                                                >
                                                    <i className="fa fa-circle text-orange-500"></i>
                                                    <span>EVM</span>
                                                </label>
                                            </div>


                                            <button className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                                                Connect For Linked ICP
                                            </button>
                                            <button className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
                                                Connect For Linked EVM
                                            </button>
                                            <button className="px-6 py-2 bg-purple-500 text-white font-bold rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75">
                                                Connect For Linked SOL
                                            </button>



                                        </div>
                                    </div>
                                )}


                            </div>
                        </div>
                    ))}

                </ReactSortable>
            </div>

            <div className="max-w-xs mx-auto mt-6">
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 py-2 px-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all w-full"
                    >
                        <i className="fa fa-save"></i>
                        <span className="text-sm">Save</span>
                    </button>
                </div>
        </form>



    );
}
