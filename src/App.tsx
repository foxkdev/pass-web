import { Component, createElement, ReactNode } from 'react'
import './App.scss'
import { BrowserRouter, Route, RouteProps, Routes } from 'react-router-dom'
import routesConfig from './config/routes'

class App extends Component {
  get routes(): JSX.Element[] {
    const routes = routesConfig.map((route) => {
      const routeProps: RouteProps = {
        path: route.path,
        element: createElement(route.component),
        
      }
      return <Route key={route.path} caseSensitive {...routeProps} />
    })
    return routes;
  }

  render(): ReactNode {
    return (
      <BrowserRouter>
        <Routes>
          {this.routes}
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
