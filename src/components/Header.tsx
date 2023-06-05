import { IntrusionPrevention } from "@carbon/icons-react";

 
export const EnterCode = () => {
    return <div className="text-white flex items-center justify-between">
        <IntrusionPrevention width={24} height={24} />
        <p className="px-2 body-compact-02">Review saved results?</p>
        <p className="text-link cursor-pointer hover:underline body-compact-02">Enter code</p>
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