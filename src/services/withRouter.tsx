import { useParams, useNavigate } from "react-router-dom"

export function withRouter(Component: any) {
    function ComponentWithRouter(props: any) {
        let params = useParams()
        const navigate = useNavigate()
        return <Component {...props} params={params} navigate={navigate} />
    }
    return ComponentWithRouter
}