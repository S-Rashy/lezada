import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
// router.beforeEach((to, from, next) => {

//   // const authenticated = useAuthStore().isAuthenticated;

//   if (to.meta.requiresAuth && !authenticated) {
//     next({ name: "auth-page" });
//     return;
//   }

//   if (to.meta.requiresGuest && authenticated) {
//     next({ name: "dashboard-page" });
//     return;
//   }

//   next();
// });

export default router
