
const routes = [
  {
    path: '/',
    component: () => import('layouts/no-app-layout.vue'),
    children: [
      { path: '', name:'school-access',component: () => import('pages/authentication/school-access-page.vue') },
      { path: '/login', name:'sign-in',component: () => import('pages/authentication/signin-page.vue') }
    ]
  },
  {
    path: '/authorized',
    component: () => import('layouts/app-layout.vue'),
    children: [
      { path: '',name:'dashboard-page', component: () => import('pages/IndexPage.vue') },
      { path: '',name:'web-pages-page', component: () => import('pages/manage-web-pages-page.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
