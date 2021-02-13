import SvgPaht from './SvgPath';

interface Iprop {
    icon: string;
    onClick?: () => void;
}


const Icon = ({ icon, onClick }: Iprop) => {
    return (
        <svg onClick={onClick} className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <SvgPaht icon={icon} />
        </svg>
    )
}

export default Icon
