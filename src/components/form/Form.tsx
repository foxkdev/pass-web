import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Params } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { Secret } from "../../store/slices/secrets";
import InputForm from "../inputs/inputForm";
import TokenModal from "../tokenModal/tokenModal";

export interface FormProps {
    dispatch: AppDispatch;
    types: any;
    type: string;
    item: any;
    token: string | null;
    onSave: (item: any) => void;
}

interface FormState {
    modal: {
        isOpen: boolean;
        mode: string;
    },
    item: {
        id: string | null;
        global: object;
        content: object;
        flags: object;
    };
    token: string | null;
}
class Form extends Component<FormProps, FormState> {
    item: any;
    constructor(props: FormProps) {
        super(props);
        this.item = {
            id: null,
            global: {},
            flags: {},
            content: {}
        };
        this.state = {
            modal: {
                isOpen: false,
                mode: 'encrypt',
            },
            item: {
                id: null,
                global: {},
                content: {},
                flags: {},
            },
            token: props.token,
        };
    }

    get type(){
        const { types, type } = this.props
        return types[type] || null;
    }
    onCopy = (item: Secret) => {
        console.log('onCopy')
    }
    getInputs = (section: string) => {
        const { item } = this.props
        if(this.type) {
            return this.type[section].map((field: any) => {
                const key = field.key.split('.')[1];
                return <InputForm
                            key={field.key}
                            inputName={field.key}
                            name={field.name}
                            type={field.type} 
                            secret={field.secret} 
                            encrypted={field.encrypted} 
                            canCopy={field.canCopy} 
                            onCopy={this.onCopy} 
                            value={item[section] ? item[section][key] : null}
                            onChange={this.onInputChange}
                        />
            })
        }
    }

    onInputChange = (name: string, value: any) => {
        const [section, key] = name.split('.')
        this.item[section][key] = value

    }
    submitForm = (event: any) => {
        event.preventDefault();
        if(this.state.token) {
            this.onToken(this.state.token)
        } else {
            this.setState({ modal: { isOpen: true, mode: this.state.modal.mode }})
        }
        
    }

    closeModal = () => {
        this.setState({ modal: { isOpen: false, mode: this.state.modal.mode }})
    }
    onToken = (token: string) => {
        this.closeModal();
        console.log('token', token)
        console.log('state', this.state)
        this.setState({token: token})
        console.log(this.item);
        this.props.onSave({...this.item, token: token, type: this.props.type})
    }
    render() {
        const {item, type} = this.props
        return (
            <Fragment>
                <form onSubmit={this.submitForm}>
                    <input type="hidden" name="id" value={item?.id} />
                    <input type="hidden" name="type" value={type} />
                    <div className="sm:overflow-hidden">
                        <div className="bg-white space-y-3">
                            <div className="bg-gray-100 p-3 grid grid-cols-6">
                                <span className="grid-span-1 text-md font-bold text-gray-700 flex items-center justify-end">
                                    General Information
                                </span>
                            </div>
                            {this.getInputs('global')}
                        </div>
                        <div className="bg-white space-y-3">
                            <div className="bg-gray-100 p-3 grid grid-cols-6">
                                <span className="grid-span-1 text-md font-bold text-gray-700 flex items-center justify-end">
                                    Flags
                                </span>
                            </div>
                            {this.getInputs('flags')}
                        </div>

                        <div className="bg-white space-y-3">
                            <div className="bg-gray-100 p-3 grid grid-cols-6">
                                <span className="grid-span-1 text-md font-bold text-gray-700 flex items-center justify-end">
                                    Content Encrypted
                                </span>
                            </div>
                            {this.getInputs('content')}
                        </div>

                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type="submit"
                                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${false === true ? 'cursor-not-allowed bg-gray-400 hover:bg-gray-400' : 'hover:bg-indigo-700'}`}
                            >
                                Save
                            </button>
                            </div>
                    </div>
                </form>
                <TokenModal open={this.state.modal.isOpen} mode={this.state.modal.mode} onClose={this.closeModal} onToken={this.onToken} errors={[]}/>
            </Fragment>
        );
    }
}

export default connect((state: RootState) => {
    return {
        types: state.secrets.types,
        token: state.secrets.token,
    }
})(Form)