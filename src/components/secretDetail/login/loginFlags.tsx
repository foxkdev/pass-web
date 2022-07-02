import { Component, Fragment } from "react";
import { Secret } from "../../../store/slices/secrets";
export interface LoginProps {
    item: Secret;
}
export function getLoginFlagsFieldsFromForm(event: any) {
    return {
        website: event.target.website?.value
    }
}

class LoginFlags extends Component<LoginProps> {
    render() {
        const { item } = this.props;
        return (
            <Fragment>
                <div className="grid grid-cols-6 gap-6">
                    <label htmlFor="company-website" className="text-capitalize col-span-1 text-sm font-medium text-gray-700 flex items-center justify-end">
                        Website:
                    </label>
                    <div className="col-span-3 mt-1 flex rounded-md">
                        <input
                        type="text"
                        name="website"
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 w-full rounded-md p-3 sm:text-sm border border-gray-300"
                        defaultValue={item.flags?.website}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default LoginFlags;