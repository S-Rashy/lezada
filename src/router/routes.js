import Login from '@/components/authComps/Login.vue'
import ResetP from '@/components/authComps/ResetP.vue'
import SignUp from '@/components/authComps/SignUp.vue'
import AuthLayout from '@/layouts/authLayout/AuthLayout.vue'
import HomeLayout from '@/layouts/homeLayout/HomeLayout.vue'
import CartPage from '@/pages/CartPage.vue'
import HomePage from '@/pages/HomePage.vue'
import WishlistPage from '@/pages/WishlistPage.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: HomeLayout,
    children: [
      { path: '', name: 'HomePage', component: HomePage },
      { path: 'wishlist', name: 'WishlistPage', component: WishlistPage },
      { path: 'cart', name: 'CartPage', component: CartPage },
      {
        path: 'account',
        name: 'AuthPage',
        component: AuthLayout,
        children: [
            { path: 'login', name: 'Login', component: Login },
            { path: 'register', name: 'SignUp', component: SignUp },
            { path: 'reset-password', name: 'ResetPassword', component: ResetP },
        ],
      },
    ],
  },
]
