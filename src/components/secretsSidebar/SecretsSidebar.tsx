import { Component } from "react";
import { AppDispatch } from "../../store";
import { Secret } from "../../store/slices/secrets";
import SecretsSidebarItem from "./SecretsSidebarItem";
export interface SecretsSidebarProps {
    isLoading: boolean;
    items: Array<Secret>;
    onSelectSecret: any;
    currentItem: Secret | null;
}
class SecretsSidebar extends Component<SecretsSidebarProps> {
    render() {
        const { isLoading, items, onSelectSecret, currentItem} = this.props
        return (
            <div className="flex-initial w-72 bg-gray-600 h-full fixed">
                <div className="w-100 text-white text-xl p-5 font-semibold bg-gray-900">
                    Passwords &amp; Secrets
                </div>
                <div className="flex flex-col h-full overflow-auto">
                {items.map((item) => (
                    <SecretsSidebarItem key={item.id} item={item} onSelectSecret={onSelectSecret} currentItem={currentItem} />
                ))}
                </div>
                
            </div>
        )
    }
}

export default SecretsSidebar;

