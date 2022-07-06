import { Component, useState } from "react";
import { TagsInput } from "react-tag-input-component";
import './inputForm.css';
export interface InputProps {
    name: string,
    type: string,
    secret: boolean,
    encrypted: boolean,
    canCopy: boolean,
    value: any;
    onCopy: any;
    onChange: any;
    inputName: string;
}

export default function InputForm(props: InputProps) {
    const {inputName, name, type, secret, encrypted, canCopy, value, onCopy, onChange} = props
    const typeInput = secret ? 'password' : 'text'
    const setArrayInput = (value: any) => {
        onChange(inputName, value)
    }
    const onChangeInput = (event: any) => {
        onChange(inputName, event.target.value)
    }
    return (
        <div className="grid grid-cols-6 gap-6 p-3">
            <label htmlFor="company-website" className="col-span-1 text-sm font-medium text-gray-700 flex items-center justify-end">
                {name}:
            </label>
            <div className="col-span-3 mt-1 flex rounded-md">
                {type === 'text' ? (
                    <input
                    type={typeInput}
                    name={inputName}
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 w-full rounded-md p-3 sm:text-sm border border-gray-300"
                    defaultValue={value}
                    onChange={onChangeInput}
                    />
                ) : null }
                {type === 'array' && Array.isArray(value) ? (
                    <TagsInput
                    value={value}
                    onChange={setArrayInput}
                    name={inputName}
                    placeHolder="enter urls and press enter"
                    />
                ) : null }
                {type === 'array' && !Array.isArray(value) ? (
                    <TagsInput
                    value={[]}
                    onChange={setArrayInput}
                    name={inputName}
                    placeHolder="enter urls and press enter"
                    />
                ) : null }

                {canCopy ? (
                    <span id={`copy-${name}`} className="cursor-pointer flex items-center ml-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-700"
                    onClick={onCopy}
                    >
                        Copy
                    </span>
                ): null}
            </div>
        </div>
    )
}