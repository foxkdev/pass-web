import { Component } from "react";
import { Link } from "react-router-dom";
import faviconService from "../../services/favicon.service";
import { withRouter } from "../../services/withRouter";
import { Secret } from "../../store/slices/secrets";
import SecretIcon from "../secretIcon/secretIcon";
export interface SecretsSidebarItemProps {
    item: Secret;
    currentItem: Secret | null;
    navigate: any;
}
class SecretsSidebarItem extends Component<SecretsSidebarItemProps> {
    onClickItem = () => {
        const {item, navigate} = this.props
        navigate(item.id)
        
    }

    get isItemSelected() {
        const { item, currentItem } = this.props
        return currentItem && item.id === currentItem.id
    }

    get info() {
        const {item} = this.props
        switch(item.type) {
            case 'LOGIN':
                return item.flags?.website || ''
            case 'SECRET':
                return item.flags?.environment || ''
        }
    }
    render() {
        const { item } = this.props
        return (
            <Link to={{pathname: `/${item.id}` }} key={item.id} onClick={this.onClickItem} className={`item w-100 text-white m-2 p-3 flex items-center hover:bg-gray-900 rounded-md cursor-pointer ${this.isItemSelected ? 'bg-gray-900': ''}`}>
                {item.icon ? (<img src={item.icon} />) : <SecretIcon type={item.type} />}
                <div className="mx-3 text-sm flex flex-col w-full h-10">
                    <span className="text-sm w-full h-1/2">{item.name}</span>
                    <span className="text-sm w-full h-1/2">{this.info }</span>
                </div>
            </Link>
        )
    }
}

export default withRouter(SecretsSidebarItem);

