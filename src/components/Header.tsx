import { IntrusionPrevention } from "@carbon/icons-react";
import React from "react";
import EnterCodeModal from "./enterCodeModal";
import { useDispatch } from "react-redux";
import { triggerEnterCode } from "@/redux/notiSlice";
import { useRouter } from "next/navigation";


 
export const EnterCode = ({onClick}: {onClick: React.MouseEventHandler<HTMLParagraphElement> | undefined}) => {
    return <div className="text-white flex items-center justify-between">
        <IntrusionPrevention width={16} height={16} />
        <p className="px-2 body-compact-01 text-white">View your saved report?</p>
        <p className="text-link cursor-pointer hover:underline body-compact-01" onClick={onClick}>Enter code</p>
    </div>
}

const Header = (props: HeaderProps) => {
    const {enterCode} = props;
    const dispatch = useDispatch();
    const router = useRouter();
    return <React.Fragment>
        <div className="background py-3 px-8 flex items-center justify-between sticky top-0 left-0 z-10">
        <img className="h-10 cursor-pointer" onClick={() => router.push("/")} src={"/icons/logo.svg"} alt="logo"/>
        {enterCode && <EnterCode onClick= {() => {dispatch(triggerEnterCode(true))}}/>}
    </div>
    <EnterCodeModal/>
    </React.Fragment>
}

interface HeaderProps {
     enterCode?: boolean;
}

export default Header;