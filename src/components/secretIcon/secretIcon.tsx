import { Component } from "react";
import LoginLogo from '../../assets/secretTypes/login.png'
import SecretLogo from '../../assets/secretTypes/secret.png'
export interface SecretIconProps {
    type: any;
}
class SecretIcon extends Component<SecretIconProps> {

    get icon() {
        switch(this.props.type) {
            case 'LOGIN':
                return LoginLogo
            case 'SECRET':
                return SecretLogo
        }
    }
    render() {
        return (
            <img src={this.icon} className="w-10" />
        )
    }
}

export default SecretIcon;

