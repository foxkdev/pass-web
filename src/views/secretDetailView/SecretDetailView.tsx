import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import Form from "../../components/form/Form";
import SecretsListSidebar from "../../components/secretsList/secretsListSidebar";
import { getSecretDecryptedThunk, getSecretsThunk, getSecretThunk, getSecretTypesThunk, Secret, updateSecretThunk } from "../../store/slices/secrets";
import { withRouter } from "../../services/withRouter";
export interface SecretDetailViewProps {
    item: Secret;
    dispatch: AppDispatch;
    isLoading: boolean;
    token: string;
    params: any;
}



class SecretDetailView extends Component<SecretDetailViewProps> {
    componentDidMount() {
        this.fetchCurrentItem();
    }
    componentDidUpdate(prevProps: SecretDetailViewProps) {
        const { params } = this.props;
        if (prevProps.params.id !== params.id) {
            this.fetchCurrentItem();
        }
    }
    fetchCurrentItem = () => {
        const {params, token, dispatch} = this.props
        if(params.id) {
            if(token) {
                dispatch(getSecretDecryptedThunk({ id: params.id, token: token }));
            } else {
                dispatch(getSecretThunk(params.id))
            }
            
        }
    }
    onSave = async (item: any) => {
        const {dispatch} = this.props
        console.log(item);
        // const {payload: secret}: any = await dispatch(createSecretThunk(item))
        // this.props.navigate(`/${secret.id}`)
    }

    render() {
        const { isLoading, item } = this.props
        return (
            <Fragment>
                {isLoading ? <div>Loading...</div> : null}
                {!isLoading && !item ? <div>Not found.</div> : null}
                {!isLoading && item ? (
                    <Fragment>
                        <div className="bg-gray-300 p-3">
                            <span className="text-xl font-bold text-gray-700 flex items-center">
                                Detail Secret {item?.name}
                            </span>
                        </div>
                        <Form type={item?.type.toLowerCase()} item={item} onSave={this.onSave}/>
                    </Fragment>
                ) : null}
            </Fragment>
        )
    }
}
export default connect((state: RootState) => {
    return {
        isLoading: state.secrets.isLoading,
        item: state.secrets.currentItem,
        token: state.secrets.token,
    }
})(withRouter(SecretDetailView))

