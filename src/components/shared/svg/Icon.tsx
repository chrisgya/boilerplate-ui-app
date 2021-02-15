import SvgPaht from './SvgPath';
import cs from 'classnames';

interface Iprop {
    icon: string;
    onClick?: () => void;
    customClass?: string;
}


const Icon = ({ icon, onClick, customClass }: Iprop) => {
    return (
        <svg onClick={onClick} className={cs(customClass ? customClass : "w-5 h-5")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <SvgPaht icon={icon} />
        </svg>
    )
}

export default Icon
