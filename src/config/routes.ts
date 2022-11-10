export interface IRoutes {
  name: string
  path: string
  private: boolean
  component: string
  children?: IRoutes[]
}
const routes: IRoutes[] = [
  {
    name: 'main',
    path: '/',
    private: false,
    component: 'Layout',
    children: [
      {
        name: 'home',
        path: '/',
        component: 'Home',
        private: false,
      },
      // ADICIONAR ROTAS AQUI :)
    ],
  },
]

export default routes
