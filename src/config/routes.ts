import SecretsListView from "../views/SecretsListView/SecretsListView";

const routes = [
    { path: '/', exact: true, component: SecretsListView},
    { path: '/:id', exact: true, component: SecretsListView}
];

export default routes;