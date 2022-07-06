import mainLayout from "../layouts/mainLayout";
import CreateSecretView from "../views/CreateSecretView/CreateSecretView";
import SecretsListView from "../views/SecretsListView/SecretsListView";
import SecretDetailView from "../views/secretDetailView/SecretDetailView";

const routes = [
    { path: '/', exact: true, component: mainLayout, childrens:
        [
            { path: '/', exact: true, component: SecretsListView, childrens: []},
            { path: '/create/:type', exact: true, component: CreateSecretView, childrens: []},
            { path: '/:id', exact: true, component: SecretDetailView, childrens: []}
        ]
    },
    
];

export default routes;