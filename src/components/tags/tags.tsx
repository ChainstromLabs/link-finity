interface TagButtonProps {
    icon: string; 
    label: string;
    color: string; 
}

const TagButton = ({ icon, label, color }: TagButtonProps) => (
    <span
        className={`${color} text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-md flex items-center gap-1`}
    >
        <i className={`fa-solid ${icon}`}></i> {label}
    </span>
);

export default TagButton;
