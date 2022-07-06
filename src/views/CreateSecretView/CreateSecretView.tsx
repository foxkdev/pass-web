import { Component, Fragment } from "react";
import { connect, useSelector } from "react-redux";
import SecretsListSidebar from "../../components/secretsSidebar/SecretsSidebar";
import { AppDispatch, RootState } from "../../store";
import { createSecretThunk, getSecretDecryptedThunk, getSecretsThunk, getSecretThunk, getSecretTypesThunk, Secret, updateSecretThunk } from "../../store/slices/secrets";
import { Params, useParams, useNavigate } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import SecretDetail from "../secretDetailView/SecretDetailView";
import Form from "../../components/form/Form";
import { withRouter } from "../../services/withRouter";
export interface CreateSecretViewProps {
    isLoading: boolean;
    dispatch: AppDispatch;
    params: Params;
    navigate: any;
    errors: Array<any>;
}
class CreateSecretView extends Component<CreateSecretViewProps> {  
    onSave = async (item: any) => {
        const {dispatch} = this.props

        const {payload: secret}: any = await dispatch(createSecretThunk(item))
        this.props.navigate(`/${secret.id}`)
    }
    render() {
        const { errors, params } = this.props
        return (
            <Fragment>
                <div className="bg-gray-300 p-3">
                    <span className="text-xl font-bold text-gray-700 flex items-center">
                        Create Secret {params.type}
                    </span>
                </div>
                <Form type={params.type as string} item={{}} onSave={this.onSave}/>
            </Fragment>
        )
    }
}

export default connect((state: RootState) => {
    return {
        isLoading: state.secrets.isLoading,
        errors: state.secrets.errors,
    }
})(withRouter(CreateSecretView))