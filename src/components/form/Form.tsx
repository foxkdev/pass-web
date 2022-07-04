import { Component } from "react";
import { connect } from "react-redux";
import { Params } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { Secret } from "../../store/slices/secrets";
import InputForm from "../inputs/inputForm";

export interface FormProps {
    dispatch: AppDispatch;
    types: any;
    type: string;
    item: any;
}

class Form extends Component<FormProps> {
    constructor(props: FormProps) {
        super(props);
        this.state = props.item;
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
                return <InputForm
                            key={field.key}
                            inputName={field.key}
                            name={field.name}
                            type={field.type} 
                            secret={field.secret} 
                            encrypted={field.encrypted} 
                            canCopy={field.canCopy} 
                            onCopy={this.onCopy} 
                            value={section === 'global' ? item[field.key] : item[section][field.key]}
                            onChange={this.onInputChange}
                        />
            })
        }
    }

    onInputChange = (name: string, value: any) => {
        if(name.includes('.')) {        
            const [section, key] = name.split('.')
            this.setState({
                [section]: {
                    [key]: value
                }
            })
        } else {
            this.setState({
                [name]: value
            })
        }

    }
    submitForm = (event: any) => {
        event.preventDefault();
        console.log(this.state);
    }
    render() {
        const {} = this.props
        return (
            <form onSubmit={this.submitForm}>
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
        );
    }
}

export default connect((state: RootState) => {
    return {
        types: state.secrets.types
    }
})(Form)