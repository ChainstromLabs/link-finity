import { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';

interface ButtonItem {
    key: string;
    label: string;
    color: string;
    icon: string;
    placeholder?: string;
}


import { toast } from 'react-toastify';

export const allButtons: ButtonItem[] = [
    { label: "LinkedIn", key: "linkedin", color: "bg-indigo-600 hover:bg-indigo-700", icon: "fa-linkedin-in" },
    { label: "Twitter", key: "twitter", color: "bg-black hover:bg-zinc-900", icon: "fa-x-twitter" },
    { label: "Instagram", key: "instagram", color: "bg-pink-600 hover:bg-pink-700", icon: "fa-instagram" },
    { label: "YouTube", key: "youtube", color: "bg-red-600 hover:bg-red-700", icon: "fa-youtube" },
    { label: "Facebook", key: "facebook", color: "bg-blue-600 hover:bg-blue-700", icon: "fa-facebook-f" },
    { label: "TikTok", key: "tiktok", color: "bg-black hover:bg-zinc-900", icon: "fa-tiktok" },
    { label: "Snapchat", key: "snapchat", color: "bg-yellow-400 hover:bg-yellow-500", icon: "fa-snapchat" },
    { label: "WhatsApp", key: "whatsapp", color: "bg-green-500 hover:bg-green-700", icon: "fa-whatsapp" },
    { label: "Telegram", key: "telegram", color: "bg-blue-500 hover:bg-blue-700", icon: "fa-telegram" },
    { label: "WeChat", key: "wechat", color: "bg-green-500 hover:bg-green-700", icon: "fa-weixin" },
    { label: "Line", key: "line", color: "bg-green-600 hover:bg-green-700", icon: "fa-line" },
    { label: "Reddit", key: "reddit", color: "bg-orange-500 hover:bg-orange-600", icon: "fa-reddit-alien" },
    { label: "Quora", key: "quora", color: "bg-red-500 hover:bg-red-600", icon: "fa-quora" },
    { label: "Discord", key: "discord", color: "bg-blue-600 hover:bg-blue-700", icon: "fa-discord" },
    { label: "Spotify", key: "spotify", color: "bg-green-500 hover:bg-green-700", icon: "fa-spotify" },
    { label: "SoundCloud", key: "soundcloud", color: "bg-black hover:bg-zinc-900", icon: "fa-soundcloud" },
    { label: "Threads", key: "threads", color: "bg-black hover:bg-zinc-900", icon: "fa-threads" },
    { label: "VK", key: "vk", color: "bg-black hover:bg-zinc-900", icon: "fa-vk" },
    { label: "Medium", key: "medium", color: "bg-black hover:bg-zinc-900", icon: "fa-medium" },
    { label: "GitHub", key: "github", color: "bg-black hover:bg-zinc-900", icon: "fa-github" },
    { label: "Steam", key: "steam", color: "bg-blue-600 hover:bg-blue-900", icon: "fa-steam" }
];


function upperFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function PageButtonsForm({ user, page }: { user: any; page: any }) {
    const pageSavedButtonsKeys = Object.keys(page.buttons);
    const pageSavedButtonsInfo = pageSavedButtonsKeys
        .map((k) => allButtons.find((b) => b.key === k))
        .filter(Boolean) as ButtonItem[];
    const [activeButtons, setActiveButtons] = useState<ButtonItem[]>(pageSavedButtonsInfo);

    function addButtonToProfile(button: ButtonItem) {
        setActiveButtons((prevButtons) => [...prevButtons, button]);
    }

    async function saveButtons(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        toast.success("Successfully!")
        console.log('Settings saved:', Object.fromEntries(formData));
    }

    function removeButton({ key: keyToRemove }: ButtonItem) {
        setActiveButtons((prevButtons) =>
            prevButtons.filter((button) => button.key !== keyToRemove)
        );
    }

    const availableButtons = allButtons.filter(
        (b1) => !activeButtons.find((b2) => b1.key === b2.key)
    );

    function handleSetList(newState: ButtonItem[]) {
        setActiveButtons(newState);
    }

    return (
        <div className="p-4 bg-gray-50 rounded-lg shadow-lg">
            <form onSubmit={saveButtons}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customize Your Social Media</h2>

                <ReactSortable
                    handle=".handle" // Tentukan elemen yang digunakan untuk drag (seperti grip bar)
                    list={activeButtons.map((item, index) => ({ ...item, id: item.key || index }))}
                    setList={(newState) => setActiveButtons(newState.map(({ id, ...rest }) => rest))}
                >
                    {activeButtons.map((b) => (
                        <div key={b.key} className="mb-4 flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                            <i className="fa fa-grip-lines cursor-pointer text-gray-400 handle p-1"></i>

                            <div className={`w-12 h-12 flex justify-center items-center ${b.color} rounded-full`}>
                                <i className={`fab ${b.icon} text-white text-lg`}></i>
                            </div>
                            <span className="ml-3 text-lg font-medium text-gray-700">{upperFirst(b.label)}</span>
                            <div className="flex-1 ml-3">
                                <input
                                    placeholder={b.placeholder}
                                    name={b.key}
                                    defaultValue={page.buttons[b.key]}
                                    type="text"
                                    className="border rounded-lg px-2 py-1 w-full text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                onClick={() => removeButton(b)}
                                type="button"
                                className="ml-3 py-2 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                            >
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>
                    ))}
                </ReactSortable>

                <div className="flex flex-wrap gap-3 mt-4">
                    {availableButtons.map((b) => (
                        <button
                            key={b.key}
                            type="button"
                            onClick={() => addButtonToProfile(b)}
                            className={`flex items-center gap-2 p-2 ${b.color} text-white rounded-lg shadow-md hover:shadow-lg transition-all`}
                        >
                            <i className={`fab ${b.icon} text-base`}></i>
                            <span className="text-sm">{upperFirst(b.label)}</span>
                            <i className="fab fa-plus text-sm"></i>
                        </button>
                    ))}
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
        </div>

    );
}
