import walleticp from '../../assets/linkfintyasset/icpwallet.png';
import walleteth from '../../assets/linkfintyasset/walleteth.png';
import solana from '../../assets/linkfintyasset/solana.png';

interface TypechainItem {
    typechain: 'ICP' | 'SOL' | 'EVM' | string; 
}

const getTypechainDetails = (typechain:string) => {
    switch (typechain) {
        case 'ICP':
            return { fullName: 'Internet Computer Protocol', color: 'bg-fuchsia-100 text-[rgb(255,0,157)]', imgSrc: walleticp };
        case 'SOL':
            return { fullName: 'Solana Blockchain', color: 'bg-violet-100 text-[rgb(186,35,199)]', imgSrc: solana };
        case 'EVM':
            return { fullName: 'Ethereum Virtual Machine', color: 'bg-gray-300 text-[rgb(0,0,0)]', imgSrc: walleteth };
        default:
            return { fullName: typechain, color: 'bg-gray-100 text-gray-600', imgSrc: '' };
    }
};

const TypechainBadge: React.FC<{ item: TypechainItem }> = ({ item }) => {
    const { fullName, color, imgSrc } = getTypechainDetails(item.typechain);
    if (!fullName && !imgSrc) {
        return null; 
    }
    return (
        <span className={`inline-flex items-center ${color} font-semibold text-lg rounded-full px-4 py-1 text-sm shadow-md`}>
            {imgSrc && (
                <img
                    src={imgSrc}
                    alt={`${fullName} Wallet`}
                    className="w-8 h-8 rounded-full mr-2"
                />
            )}
            {fullName}
        </span>
    );
};

export default TypechainBadge;
