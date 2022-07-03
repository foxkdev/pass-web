import { Component, Fragment } from "react";
import { Secret } from "../../../store/slices/secrets";
export interface SecretProps {
    item: Secret;
}


export function getSecretContentFieldsFromForm(event: any) {
    return {
        value: event.target.value?.value,
    }
}
class SecretContent extends Component<SecretProps> {
    copy(value: any) {
        navigator.clipboard.writeText(value);
    }
    render() {
        const { item } = this.props;
        return (
            <Fragment>
                <div className="grid grid-cols-6 gap-6">
                    <label htmlFor="company-website" className="text-capitalize col-span-1 text-sm font-medium text-gray-700 flex items-center justify-end">
                        Value:
                    </label>
                    <div className="col-span-3 mt-1 flex rounded-md">
                        <input
                        type="password"
                        name="value"
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 w-full rounded-md p-3 sm:text-sm border border-gray-300"
                        defaultValue={item.content.value}
                        />
                        <span className="cursor-pointer flex items-center ml-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-700"
                        onClick={() => this.copy(item.content.value)}
                        >
                            Copy
                        </span>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default SecretContent;