interface Profile {
    media_social: {
        platform: string;
        link: string;
    }[];
}

const socialLinks = [
    { name: "LinkedIn", key: "linkedin", color: "bg-indigo-600 hover:bg-indigo-700", icon: "fa-linkedin-in" },
    { name: "Twitter", key: "twitter", color: "bg-black hover:bg-zinc-900", icon: "fa-x-twitter" },
    { name: "Instagram", key: "instagram", color: "bg-pink-600 hover:bg-pink-700", icon: "fa-instagram" },
    { name: "YouTube", key: "youtube", color: "bg-red-600 hover:bg-red-700", icon: "fa-youtube" },
    { name: "Facebook", key: "facebook", color: "bg-blue-600 hover:bg-blue-700", icon: "fa-facebook-f" },
    { name: "TikTok", key: "tiktok", color: "bg-black hover:bg-zinc-900", icon: "fa-tiktok" },
    { name: "Snapchat", key: "snapchat", color: "bg-yellow-400 hover:bg-yellow-500", icon: "fa-snapchat" },
    { name: "WhatsApp", key: "whatsapp", color: "bg-green-500 hover:bg-green-700", icon: "fa-whatsapp" },
    { name: "Telegram", key: "telegram", color: "bg-blue-500 hover:bg-blue-700", icon: "fa-telegram" },
    { name: "WeChat", key: "wechat", color: "bg-green-500 hover:bg-green-700", icon: "fa-weixin" },
    { name: "Line", key: "line", color: "bg-green-600 hover:bg-green-700", icon: "fa-line" },
    { name: "Reddit", key: "reddit", color: "bg-orange-500 hover:bg-orange-600", icon: "fa-reddit-alien" },
    { name: "Quora", key: "quora", color: "bg-red-500 hover:bg-red-600", icon: "fa-quora" },
    { name: "Discord", key: "discord", color: "bg-blue-600 hover:bg-blue-700", icon: "fa-discord" },
    { name: "Spotify", key: "spotify", color: "bg-green-500 hover:bg-green-700", icon: "fa-spotify" },
    { name: "SoundCloud", key: "soundcloud", color: "bg-black hover:bg-zinc-900", icon: "fa-soundcloud" },
    { name: "Threads", key: "threads", color: "bg-black hover:bg-zinc-900", icon: "fa-threads" },
    { name: "VK", key: "vk", color: "bg-black hover:bg-zinc-900", icon: "fa-vk" },
    { name: "Medium", key: "medium", color: "bg-black hover:bg-zinc-900", icon: "fa-medium" },
    { name: "GitHub", key: "github", color: "bg-black hover:bg-zinc-900", icon: "fa-github" },
    { name: "Steam", key: "steam", color: "bg-blue-600 hover:bg-blue-900", icon: "fa-steam" }
];

interface SocialButtonProps {
    href: string;
    color: string;
    icon: string;
    name: string;
}

const SocialButton = ({ href, color, icon, name }: SocialButtonProps) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group relative inline-block">
        <button
            className={`px-3 py-1 text-sm text-white rounded-[10px] flex items-center ${color}`}
        >
            <i className={`fab ${icon} text-xl`}></i>
        </button>
        <span className= {`absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none ${color} text-white text-xs font-bold rounded px-2 py-1 `} >
            {name}
        </span>
    </a>
);

interface MediaProps {
    profile: Profile;
}

const Media = ({ profile }: MediaProps) => {
    return (
        <>
            {profile && profile.media_social &&
                socialLinks.map((social) => {
                    const link = profile.media_social.find(item => item.platform === social.key)?.link;
                    return link && link.trim() !== "" ? (
                        <SocialButton
                            key={social.key}
                            href={link}
                            color={social.color}
                            icon={social.icon}
                            name={social.name}
                        />
                    ) : null;
                })}
        </>
    );
};

export default Media;
