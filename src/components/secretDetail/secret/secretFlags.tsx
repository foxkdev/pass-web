import { Component, Fragment } from "react";
import { Secret } from "../../../store/slices/secrets";
export interface SecretProps {
    item: Secret;
}
export function getSecretFlagsFieldsFromForm(event: any) {
    return {
        environment: event.target.environment?.value
    }
}

class SecretFlags extends Component<SecretProps> {
    render() {
        const { item } = this.props;
        return (
            <Fragment>
                <div className="grid grid-cols-6 gap-6">
                    <label htmlFor="company-website" className="text-capitalize col-span-1 text-sm font-medium text-gray-700 flex items-center justify-end">
                        Environment:
                    </label>
                    <div className="col-span-3 mt-1 flex rounded-md">
                        <input
                        type="text"
                        name="environment"
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 w-full rounded-md p-3 sm:text-sm border border-gray-300"
                        defaultValue={item.flags?.environment}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default SecretFlags;