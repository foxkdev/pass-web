import { Component } from "react";
import { connect, useSelector } from "react-redux";
import SecretsListSidebar from "../../components/secretsList/secretsListSidebar";
import { AppDispatch, RootState } from "../../store";
import { getSecretDecryptedThunk, getSecretsThunk, getSecretThunk, getSecretTypesThunk, Secret, updateSecretThunk } from "../../store/slices/secrets";
import { Params, useParams } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import SecretDetail from "../../components/secretDetail/secretDetail";
import Form from "../../components/form/Form";
export interface CreateSecretViewProps {
    isLoading: boolean;
    items: Array<Secret>;
    dispatch: AppDispatch;
    currentItem: Secret | null;
    params: Params;
    isDecrypted: boolean;
    errors: Array<any>;
}
class CreateSecretView extends Component<CreateSecretViewProps> {
    mounted = false;
    componentDidMount() {
        if (this.mounted) return; this.mounted = true;
        this.fetchItems()
    }
    fetchItems = () => {
        const {dispatch} = this.props
        dispatch(getSecretTypesThunk())
        dispatch(getSecretsThunk())
    }

    onSelectSecret = (item: any) => {
        const {dispatch} = this.props
        dispatch(getSecretThunk(item.id))

    }
    
    render() {
        const { isLoading, items, currentItem, isDecrypted, errors, params } = this.props
        return (
            <div className="flex w-full h-screen">
                <SecretsListSidebar items={items} isLoading={isLoading} onSelectSecret={this.onSelectSecret} currentItem={currentItem} />
                <div className="flex-initial w-3/4">
                    Create
                    <Form type={params.type as string} item={{name: 'test', flags: {website: 'localhost'}, content: { urls: []}}}/>
                </div>
            </div>
        )
    }
}

export default connect((state: RootState) => {
    return {
        isLoading: state.secrets.isLoading,
        items: state.secrets.secrets,
        currentItem: state.secrets.currentItem,
        isDecrypted: state.secrets.isDecrypted,
        errors: state.secrets.errors,
    }
})(withRouter(CreateSecretView))

function withRouter(Component: any) {
    function ComponentWithRouter(props: any) {
        let params = useParams()
        return <Component {...props} params={params} />
    }
    return ComponentWithRouter
}