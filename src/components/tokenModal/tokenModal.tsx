import { Component } from "react";
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
export interface TokenModalProps {
    open: boolean;
    onClose: any;
    onToken: any;
    errors: Array<any>;
    mode: string;
}
class TokenModal extends Component<TokenModalProps, { tokenPassword: string | null}> {
    constructor(props: any) {
        super(props);
        this.state = {
            tokenPassword: null
        };
    }
    tokenPasswordChange = (event: any) => {
        this.setState({tokenPassword: event.target.value});
    }

    decrypt = () => {
        if(this.state.tokenPassword && this.state.tokenPassword !== '') {
            this.props.onToken(this.state.tokenPassword)
        }
    }
    get hasErrors() {
        return this.props.errors.length > 0
    }
    
    get isEncryptMode(){
        return this.props.mode === 'encrypt'
    }
    render() {
        const { open, onClose } = this.props
        return (
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onClose}>
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                        <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                        {this.isEncryptMode ? 'Encrypt' : 'Decrypt'} your passwords
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                        Insert your token password to {this.isEncryptMode ? 'encrypt' : 'decrypt'} your passwords and secrets.
                                        </p>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            type="password"
                                            name="token-password"
                                            id="token-password"
                                            className={`flex-1 w-full rounded-md p-3 sm:text-sm border border-gray-300 ${this.hasErrors ? 'border-red-500' : ''}`}
                                            onChange={this.tokenPasswordChange}
                                            autoComplete="off"
                                        />
                                        {this.hasErrors ? <p className="text-red-500 text-sm mt-2">{this.props.errors[0]}</p> : ''}
                                    </div>
                                </div>
                            </div>
                            </div>
                            
                            {this.isEncryptMode ?
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => onClose()}
                                    
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => this.decrypt()}
                                        disabled={!this.state.tokenPassword}
                                    >
                                        Save
                                    </button>
                                </div>
                               : 
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => onClose()}
                                    
                                    >
                                        Not Decrypt
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => this.decrypt()}
                                        disabled={!this.state.tokenPassword}
                                    >
                                        Decrypt
                                    </button>
                                </div>
                                }
                            
                        </Dialog.Panel>
                        </Transition.Child>
                    </div>
                    </div>
                </Dialog>
            </Transition.Root>
        )
    }
}

export default TokenModal;

