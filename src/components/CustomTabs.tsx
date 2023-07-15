import { memo } from "react";

const Tab = (props: {content: TabProps}) => {
    const {content} = props;
    return <div className="custom_tab py-2 relative hover:cursor-pointer" onClick={() => {
        const element = document.getElementById(content.id);
        if (element !== null) {
          element.scrollIntoView();
        }
    }}>
        <div className="absolute left-0 top-0 h-full" 
        style={{backgroundColor: content.isActive ? '#0F62FE': '#E0E0E0', 
        width: 3}}></div>
        <p style={{fontWeight: content.isActive ? 600: 400}}>{content.name}</p>
    </div>
}

const CustomTabs = memo((props: Props) => {
    const {items, activeTab} = props;
    return <div className="w-full">
        {items.map((item, index) => <Tab content={{
            ...item,
            isActive: activeTab === item.id
        }} key={index}/>)}
    </div>
});

interface Props {
    items: TabProps[];
    activeTab: string;
}

export interface TabProps {
    name: string,
    isActive: boolean
    id: string
}

CustomTabs.displayName = "CustomTabs";
export default CustomTabs;