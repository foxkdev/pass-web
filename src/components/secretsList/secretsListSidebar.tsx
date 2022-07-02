import { Component } from "react";
import { AppDispatch } from "../../store";
import { Secret } from "../../store/slices/secrets";
import SecretsListSidebarItem from "./secretListSidebarItem";
export interface SecretsListSidebarProps {
    isLoading: boolean;
    items: Array<Secret>;
    onSelectSecret: any;
    currentItem: Secret | null;
}
class SecretsListSidebar extends Component<SecretsListSidebarProps> {
    render() {
        const { isLoading, items, onSelectSecret, currentItem} = this.props
        return (
            <div className="flex-initial w-1/4 bg-gray-600 h-full">
                <div className="w-100 text-white text-xl p-5 font-semibold bg-gray-900">
                    Passwords &amp; Secrets
                </div>
                {items.map((item) => (
                    <SecretsListSidebarItem key={item.id} item={item} onSelectSecret={onSelectSecret} currentItem={currentItem} />
                ))}
            </div>
        )
    }
}

export default SecretsListSidebar;

