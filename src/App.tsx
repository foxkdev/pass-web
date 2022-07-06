import { Component, createElement, ReactNode } from 'react'
import './App.scss'
import { BrowserRouter, Route, RouteProps, Routes } from 'react-router-dom'
import routesConfig from './config/routes'

class App extends Component {
  getRoute(route: any) {
    return (
        <Route key={route.path} path={route.path} element={createElement(route.component)} caseSensitive>
            {route.childrens && route.childrens.map((child: any) => {
                return this.getRoute(child)
              })
            }
        </Route>);
  }
  get routes(): JSX.Element[] {
    const routes = routesConfig.map((route) => {
      return this.getRoute(route);
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
