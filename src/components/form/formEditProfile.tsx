import React, { useState, ChangeEvent } from "react";

interface FormProps {
    page: {
        bgType: string;
        bgColor: string;
        bgImage: string;
        avatar: string;
        displayName: string;
        location: string;
        bio: string;
        tags: string[];
    };
    saveBaseSettings: (event: React.FormEvent<HTMLFormElement>) => void;
}

interface RadioTogglersProps {
    defaultValue: string;
    options: { value: string; icon: string; label: string }[];
    onChange: (val: string) => void;
}

interface SubmitButtonProps {
    children: React.ReactNode;
}


import { toast } from 'react-toastify';

const Form: React.FC<FormProps> = ({ page, saveBaseSettings }) => {
    const [bgType, setBgType] = useState(page.bgType || "color");
    const [bgColor, setBgColor] = useState(page.bgColor || "#ffffff");
    const [bgImage, setBgImage] = useState(page.bgImage || "");
    const [avatar, setAvatar] = useState(page.avatar || "");


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const form = event.target as HTMLFormElement;

        const formData = {
            bgType,
            bgColor,
            bgImage,
            avatar,
            displayName: (form.elements.namedItem('displayName') as HTMLInputElement).value,
            location: (form.elements.namedItem('location') as HTMLInputElement).value,
            bio: (form.elements.namedItem('bio') as HTMLTextAreaElement).value,
            tags,
        };

        toast.success("Successfully!")
        console.log("Data yang disubmit:", formData);
        saveBaseSettings(event);
    };
    

    const handleCoverImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setBgImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setAvatar(reader.result as string);
            reader.readAsDataURL(file);
        }
    };
    

    const RadioTogglers: React.FC<RadioTogglersProps> = ({ defaultValue, options, onChange }) => (
        <div className="flex gap-4 justify-center">
            {options.map((option) => (
                <label
                    key={option.value}
                    className="flex items-center gap-2 cursor-pointer relative group"
                >
                    <input
                        type="radio"
                        name="bgType"
                        value={option.value}
                        checked={defaultValue === option.value}
                        onChange={() => onChange(option.value)}
                        className="hidden"
                    />
                    <div
                        className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ease-in-out ${defaultValue === option.value ? 'border-blue-500' : 'border-gray-300'
                            } bg-white flex justify-center items-center`}
                    >
                        <div
                            className={`w-3 h-3 rounded-full bg-orange-500 transition-all duration-300 ease-in-out ${defaultValue === option.value ? 'scale-100' : 'scale-0'
                                }`}
                        />
                    </div>
                    <i
                        className={`${option.icon} text-xl transition-all duration-200 ${defaultValue === option.value ? 'text-orange-500' : 'text-white'
                            }`}
                    />
                    {/* <span
            className={`text-gray-700 transition-all duration-200 text-lg font-bold ${
              defaultValue === option.value ? 'text-white' : 'text-gray-700'
            }`}
          >
            {option.label}
          </span> */}
                </label>
            ))}
        </div>
    );


    const SubmitButton: React.FC<SubmitButtonProps> = ({ children }) => (
        <button
            type="submit"
            className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 flex gap-2 items-center justify-center"
        >
            {children}
        </button>
    );


    const [tags, setTags] = useState(page.tags || []);
    const [tagInput, setTagInput] = useState("");

    const handleAddTag = () => {
        if (tagInput && !tags.includes(tagInput)) {
            setTags([...tags, tagInput]);
            setTagInput("");
        }
    };

    const handleRemoveTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-xl">
            <div
                className="py-4 min-h-[300px] flex justify-center items-center bg-cover bg-center rounded-lg"
                style={bgType === "color" ? { backgroundColor: bgColor } : { backgroundImage: `url(${bgImage})` }}
            >

            </div>
            <div className="flex justify-center mt-[-72px] mb-2">
                <div className="relative w-[128px] h-[128px]">
                    <div className="overflow-hidden rounded-full border-4 border-white shadow-lg">
                        <img className="w-full h-full object-cover" src={avatar} alt="avatar" />
                    </div>

                    <label
                        htmlFor="avatarIn"
                        className="absolute bottom-0 -right-2 bg-white p-2 rounded-full shadow-lg cursor-pointer"
                    >
                        <i className="fas fa-cloud-arrow-up text-xl"></i>
                    </label>
                    <input
                        onChange={handleAvatarImageChange}
                        id="avatarIn"
                        type="file"
                        className="hidden"
                    />

                </div>
            </div>
            <h1 className="text-gray-700 text-lg font-bold text-center block">@linkfinity</h1>


            <div className="bg-indigo-600 rounded-lg p-4 mt-2">
                <RadioTogglers
                    defaultValue={bgType}
                    options={[
                        { value: "color", icon: "fas fa-palette", label: "Color" },
                        { value: "image", icon: "fas fa-image", label: "Image" },
                    ]}
                    onChange={(val) => setBgType(val)}
                />

                {bgType === "color" && (
                    <div className="bg-gray-200 shadow-md rounded-lg mt-4 p-4">
                        <div className="flex gap-2 justify-center">
                            <span className="text-gray-700 text-gray-700 transition-all duration-200 text-lg font-bold">Background color:</span>
                            <input
                                type="color"
                                name="bgColor"
                                onChange={(ev) => setBgColor(ev.target.value)}
                                defaultValue={page.bgColor}
                                className="border-none rounded-lg cursor-pointer"
                            />
                        </div>
                    </div>
                )}
                {bgType === "image" && (
                    <div className="flex justify-center mt-4">
                        <label className="bg-white shadow-md px-4 py-2 rounded-lg flex gap-2 cursor-pointer">
                            <input type="hidden" name="bgImage" value={bgImage} />
                            <input
                                type="file"
                                onChange={handleCoverImageChange}
                                className="hidden"
                            />
                            <div className="flex gap-2 items-center">
                                <i className="fas fa-cloud-arrow-up text-gray-700"></i>
                                <span>Change image</span>
                            </div>
                        </label>
                    </div>
                )}
            </div>
            <div className="p-0 mt-6">
                <label className="block mb-1" htmlFor="nameIn">Display name</label>
                <input
                    type="text"
                    id="nameIn"
                    name="displayName"
                    defaultValue={page.displayName}
                    placeholder="John Doe"
                    className="w-full border p-2 mb-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label className="block mb-1" htmlFor="locationIn">Location</label>
                <input
                    type="text"
                    id="locationIn"
                    name="location"
                    defaultValue={page.location}
                    placeholder="Somewhere in the world"
                    className="w-full border p-2 mb-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label className="block mb-1" htmlFor="bioIn">Bio</label>
                <textarea
                    name="bio"
                    defaultValue={page.bio}
                    id="bioIn"
                    placeholder="Your bio goes here..."
                    className="w-full border p-2 mb-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                 {/* Input for Tags */}
                 <label className="block mb-1" htmlFor="tagsIn">Tags</label>
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        id="tagsIn"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Add a tag"
                        className="flex-1 border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="button"
                        onClick={handleAddTag}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
                    >
                        Add
                    </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center gap-2 shadow-sm"
                        >
                            {tag}
                            <button
                                type="button"
                                onClick={() => handleRemoveTag(tag)}
                                className="text-red-500 hover:text-red-700"
                            >
                                &times;
                            </button>
                        </span>
                    ))}
                </div>

                <div className="flex justify-center mt-6">
                    <SubmitButton>
                        <i className="fas fa-save"></i>
                        <span>Save</span>
                    </SubmitButton>
                </div>

            </div>
        </form>
    );
};

export default Form;
