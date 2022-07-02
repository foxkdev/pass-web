import { Component } from "react";
import { connect, useSelector } from "react-redux";
import SecretsListSidebar from "../../components/secretsList/secretsListSidebar";
import { AppDispatch, RootState } from "../../store";
import { getSecretDecryptedThunk, getSecretsThunk, getSecretThunk, Secret, updateSecretThunk } from "../../store/slices/secrets";
import { Params, useParams } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import SecretDetail from "../../components/secretDetail/secretDetail";
export interface SecretsListViewProps {
    isLoading: boolean;
    items: Array<Secret>;
    dispatch: AppDispatch;
    currentItem: Secret | null;
    params: Params;
    isDecrypted: boolean;
    errors: Array<any>;
}
class SecretsListView extends Component<SecretsListViewProps> {
    mounted = false;
    componentDidMount() {
        if (this.mounted) return; this.mounted = true;
        this.fetchItems()
        this.fetchCurrentItem()
    }
    fetchItems = () => {
        const {dispatch} = this.props
        dispatch(getSecretsThunk())
    }
    fetchCurrentItem = () => {
        const {params, dispatch} = this.props
        if(params.id) {
            dispatch(getSecretThunk(params.id))
        }
    }
    onSelectSecret = (item: any) => {
        const {dispatch} = this.props
        dispatch(getSecretThunk(item.id))

    }
    decryptItem = (item: Secret, token: string) => {
        const { dispatch } = this.props
        dispatch(getSecretDecryptedThunk({id: item.id, token}))
    }
    saveItem = (item: Secret, token: string) => {
        const { dispatch } = this.props
        dispatch(updateSecretThunk({...item, token}))
    }
    
    render() {
        const { isLoading, items, currentItem, isDecrypted, errors } = this.props
        return (
            <div className="flex w-full h-screen">
                <SecretsListSidebar items={items} isLoading={isLoading} onSelectSecret={this.onSelectSecret} currentItem={currentItem} />
                <div className="flex-initial w-3/4">
                    {isLoading ? <div>Loading...</div> : null}
                    {!isLoading && currentItem ? <SecretDetail item={currentItem} onDecryptItem={this.decryptItem} onSaveItem={this.saveItem} isDecrypted={isDecrypted} errors={errors} /> : null}
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
})(withRouter(SecretsListView))

function withRouter(Component: any) {
    function ComponentWithRouter(props: any) {
        let params = useParams()
        return <Component {...props} params={params} />
    }
    return ComponentWithRouter
}