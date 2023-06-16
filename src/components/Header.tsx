import { IntrusionPrevention } from "@carbon/icons-react";

 
export const EnterCode = () => {
    return <div className="text-white flex items-center justify-between">
        <IntrusionPrevention width={16} height={16} />
        <p className="px-2 body-compact-01 text-white">View your saved report?</p>
        <p className="text-link cursor-pointer hover:underline body-compact-01">Enter code</p>
    </div>
}

const Header = (props: HeaderProps) => {
    const {enterCode} = props;
    return <div className="background py-3 px-8 flex items-center justify-between ">
        <img className="h-10" src={"/icons/logo.svg"} alt="logo"/>
        {enterCode && <EnterCode/>}
    </div>
}

interface HeaderProps {
     enterCode?: boolean;
}

export default Header;