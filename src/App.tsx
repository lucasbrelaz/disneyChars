import routes, { IRoutes } from 'config/routes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import loadable, { LoadableClassComponent } from '@loadable/component'
import { useEffect } from 'react'

function MountRoutes(routes: IRoutes[]) {
  return (
    <>
      {routes.map((route: IRoutes) => {
        const Component: LoadableClassComponent<any> = loadable(
          () => import(`./pages/${route.component}.tsx`)
        )
        return (
          <Route key={route.name} element={<Component />} path={route.path}>
            {route.children && MountRoutes(route.children)}
          </Route>
        )
      })}
    </>
  )
}

function App() {
  return <Routes>{MountRoutes(routes)}</Routes>
}

const WrappedApp = () => {
  useEffect(() => {
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', 'pt-BR')
    }
  }, [])

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

export default WrappedApp
