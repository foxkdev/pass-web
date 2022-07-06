import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getSecretDecryptedThunk, getSecretsThunk, getSecretThunk, getSecretTypesThunk, Secret, updateSecretThunk } from "../../store/slices/secrets";
import { Params } from "react-router-dom";
import { withRouter } from "../../services/withRouter";
export interface SecretsListViewProps {
    isLoading: boolean;
    dispatch: AppDispatch;
    params: Params;
    errors: Array<any>;
}
class SecretsListView extends Component<SecretsListViewProps> {    
    render() {
        const { isLoading, errors } = this.props
        return (
            <Fragment>
                {isLoading ? <div>Loading...</div> : null}
                Dashboard
            </Fragment>
        )
    }
}

export default connect((state: RootState) => {
    return {
        isLoading: state.secrets.isLoading,
        errors: state.secrets.errors,
    }
})(withRouter(SecretsListView))