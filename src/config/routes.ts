import CreateSecretView from "../views/CreateSecretView/CreateSecretView";
import SecretsListView from "../views/SecretsListView/SecretsListView";

const routes = [
    { path: '/', exact: true, component: SecretsListView},
    { path: '/create/:type', exact: true, component: CreateSecretView},
    { path: '/:id', exact: true, component: SecretsListView}
];

export default routes;