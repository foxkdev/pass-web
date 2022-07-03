import { Component } from "react";
import { Secret } from "../../store/slices/secrets";
import TokenModal from "../tokenModal/tokenModal";
import LoginContent, { getLoginContentFieldsFromForm } from "./login/loginContent";
import LoginFlags, { getLoginFlagsFieldsFromForm } from "./login/loginFlags";
import SecretContent, { getSecretContentFieldsFromForm } from "./secret/secretContent";
import SecretFlags, { getSecretFlagsFieldsFromForm } from "./secret/secretFlags";
export interface SecretDetailProps {
    item: Secret;
    onDecryptItem: any;
    isDecrypted: boolean;
    errors: Array<any>;
    onSaveItem: any;
}

export interface SecretDetailState {
    tokenModalOpened: boolean;
    tokenModalMode: string;
    item: Partial<Secret>;
}

const contentComponents: any = {
    'LOGIN': LoginContent,
    'SECRET': SecretContent,
}

const flagsComponents: any = {
    'LOGIN': LoginFlags,
    'SECRET': SecretFlags,
}

const contentFields: any = {
    'LOGIN': getLoginContentFieldsFromForm,
    'SECRET': getSecretContentFieldsFromForm,
}

const flagsFields: any = {
    'LOGIN': getLoginFlagsFieldsFromForm,
    'SECRET': getSecretFlagsFieldsFromForm,
}


class SecretDetail extends Component<SecretDetailProps, SecretDetailState> {
    constructor(props: any) {
        super(props);
        this.state = {
            tokenModalOpened: !props.isDecrypted,
            tokenModalMode: 'decrypt',
            item: props.item,
        };
    }
    componentDidUpdate() {
        console.log('update')
    }
    setTokenModal = (opened: boolean, mode: string) => {
        this.setState({
            tokenModalOpened: opened,
            tokenModalMode: mode,
        })
    }

    closeTokenModal = () => {
        this.setTokenModal(false, 'decrypt');
    }
    openTokenModal = (mode: string) => {
        if((mode === 'decrypt' && !this.props.isDecrypted) || mode === 'encrypt') {
            this.setTokenModal(true, mode);
        }
        
    }
    decryptItem = (token: string) => {
        const { item, onDecryptItem, onSaveItem } = this.props
        this.closeTokenModal();
        if(this.state.tokenModalMode === 'decrypt') {
            onDecryptItem(item, token)
        } else {
            onSaveItem(this.state.item, token)
        }
    }
    encryptSecret = (event: any) => {
        const { item } = this.props
        event.preventDefault();
        this.setState({
            item: {
                id: this.props.item.id,
                name: event.target.name?.value,
                content: contentFields[item.type](event),
                flags: flagsFields[item.type](event),
            }
        })
        this.openTokenModal('encrypt');
    }

    getContent = () => {
        const{ item } = this.props
        const ContentComponent = contentComponents[item.type];
        return <ContentComponent item={item} />
    }

    getFlags = () => {
        const{ item } = this.props
        const FlagsComponent = flagsComponents[item.type];
        return <FlagsComponent item={item} />
    }

    render() {
        const { item, errors, isDecrypted } = this.props
        return (
            <div className="">
                <form onSubmit={this.encryptSecret} method="POST">
                    <div className="sm:overflow-hidden">
                        <div className="bg-white space-y-6 p-6">
                            <div className="bg-gray-100 p-3 grid grid-cols-6">
                                <span className="grid-span-1 text-md font-bold text-gray-700 flex items-center justify-end">
                                    General Information
                                </span>
                            </div>
                            <div className="grid grid-cols-6 gap-6 p-6">
                                    <label htmlFor="company-website" className="col-span-1 text-sm font-medium text-gray-700 flex items-center justify-end">
                                        Name:
                                    </label>
                                    <div className="col-span-3 mt-1 flex rounded-md">
                                        <input
                                        type="text"
                                        name="name"
                                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 w-full rounded-md p-3 sm:text-sm border border-gray-300"
                                        defaultValue={item.name}
                                        />
                                    </div>
                            </div>
                            <div className="bg-gray-100 p-3 grid grid-cols-6">
                                <span className="grid-span-1 text-md font-bold text-gray-700 flex items-center justify-end">
                                    Flags
                                </span>
                            </div>
                            {this.getFlags()}

                            <div className="bg-gray-100 p-3 grid grid-cols-6">
                                <span className="grid-span-1 text-md font-bold text-gray-700 flex items-center justify-end">
                                    Content encrypted
                                </span>
                                {!isDecrypted ? (
                                    <a
                                        className="ml-3 cursor-pointer inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => this.openTokenModal('decrypt')}
                                    >
                                        Decrypt
                                    </a>
                                ) : null}
                            </div>
                            { this.getContent() }
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    
                        <button
                            type="submit"
                            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${!this.props.isDecrypted ? 'cursor-not-allowed bg-gray-400 hover:bg-gray-400' : 'hover:bg-indigo-700'}`}
                            disabled={!isDecrypted}
                        >
                            Save
                        </button>
                        </div>
                    </div>
                </form>
                <TokenModal open={this.state.tokenModalOpened} mode={this.state.tokenModalMode} onClose={this.closeTokenModal} onToken={this.decryptItem} errors={errors}/>
            </div>
        )
    }
}

export default SecretDetail;

