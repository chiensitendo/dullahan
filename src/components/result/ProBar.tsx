import StatusIcon from "../../../public/images/status_icon.svg";
import WarnIcon from "../../../public/images/warn_icon.svg";
import ErrorIcon from "../../../public/images/error_icon.svg";
import { useMemo } from "react";
const Bar =({value}: {value: number})=>{

    const barColor = useMemo(() => {
        if (value >= 100) {
            return "bg-achieved";
        } else if (value >= 0) {
            return "bg-warn";
        }
        return "bg-low";
    },[value]);

    return <div className="h-8 flex w-full bg-background">
        <div className={`h-full ${barColor}`} style={{
            width: value < 0.5 ? '0.5%': value > 100 ? '100%' : `calc(${value/100}*100%`
        }}></div>
    </div>
}

const ProBar = ({value, isUnlimited, actual, expected, replaceText, customUnlimited, month}: {month?: number, value: number, actual: string, expected?: string, isUnlimited?: boolean, replaceText?: string, customUnlimited?: string}) => {
    const renderText = useMemo(() => {
        if (replaceText) return replaceText;
        return `$${actual}`;
    },[actual, replaceText]);
    return <div className="w-full">
        <div className="flex items-center justify-start flex-wrap mb-7">
            <p className="heading-06-05 mr-2" style={{
                fontSize: !replaceText ? undefined: '28px',
                lineHeight: !replaceText ? undefined: '36px',
            }}>{renderText}</p>
            {expected && <div className="result-slash-container flex items-center justify-start">
                <div className="flex items-center justify-center mr-2" style={{
                    paddingBottom: '4px'
                }}>
                <p className="text-primary" style={{
                    fontSize: '42px',
                    fontWeight: '300',
                    fontStyle: 'normal',
                    lineHeight: '54px',
                    
                }}>/</p>
                </div>
                <div><p className="heading-03 text-primary" >${expected}</p>
                <p className="label-02 text-helper" >= ${month} months of expenses</p></div>
            </div>}
        </div>
        {!expected && <div className="pt-8"></div>}
        <div className="flex items-center justify-between mb-2" >
            {!isUnlimited && <p className="body-02">{expected ? `${value}%` : ''}</p>}
            {isUnlimited && <p className="body-02">{!customUnlimited ? 'Unlimited': customUnlimited}</p>}
            {!isUnlimited && value >= 100 && <StatusIcon/>}
            {isUnlimited && replaceText && <StatusIcon/>}
            {!isUnlimited && value > 0 && value < 100 && <WarnIcon/>}
            {((!isUnlimited && !expected) || isNaN(value) ||  (expected && value === 0)) && <ErrorIcon/>}
        </div>
        {(expected) && <Bar value={value}/>}
    </div>
}

export default ProBar;