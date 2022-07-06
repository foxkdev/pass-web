

import { Component } from "react";
import { connect } from "react-redux";
import SecretsSidebar from "../components/secretsSidebar/SecretsSidebar";
import { AppDispatch, RootState } from "../store";
import { getSecretsThunk, getSecretThunk, getSecretTypesThunk, Secret } from "../store/slices/secrets";
import { Outlet, Params } from "react-router-dom";
import { withRouter } from "../services/withRouter";
export interface MainLayoutProps {
    items: Array<Secret>;
    dispatch: AppDispatch;
    currentItem: Secret | null;
    params: Params;
    errors: Array<any>;
}
class MainLayout extends Component<MainLayoutProps> {
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
    
    render() {
        const { items, currentItem } = this.props
        return (
            <div className="flex w-full h-full">
                <SecretsSidebar items={items} isLoading={false} currentItem={currentItem} />
                <div className="flex-initial w-auto ml-72">
                    <Outlet />
                </div>
            </div>
        )
    }
}

export default connect((state: RootState) => {
    return {
        items: state.secrets.secrets,
        currentItem: state.secrets.currentItem,
        errors: state.secrets.errors,
    }
})(withRouter(MainLayout))