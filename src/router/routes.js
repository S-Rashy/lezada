import Login from '@/components/authComps/Login.vue'
import ResetP from '@/components/authComps/ResetP.vue'
import SignUp from '@/components/authComps/SignUp.vue'
import AuthLayout from '@/layouts/authLayout/AuthLayout.vue'
import HomeLayout from '@/layouts/homeLayout/HomeLayout.vue'
import About from '@/pages/About.vue'
import Account from '@/pages/Account.vue'
import CartPage from '@/pages/CartPage.vue'
import Checkout from '@/pages/Checkout.vue'
import HomePage from '@/pages/HomePage.vue'
import ProdDetails from '@/pages/ProdDetails.vue'
import WishlistPage from '@/pages/WishlistPage.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: HomeLayout,
    children: [
      { path: '', name: 'HomePage', component: HomePage },
      { path: "product/:id", name: "ProductDetails", component: ProdDetails},
      { path: "about", name: "AboutPage", component: About},
      { path: 'wishlist', name: 'WishlistPage', component: WishlistPage, meta: { requiresAuth: true },},
      { path: 'cart', name: 'CartPage', component: CartPage, meta: { requiresAuth: true } },
      { path: 'checkout', name: 'CheckoutPage', component: Checkout, meta: { requiresAuth: true } },
      { path: 'account', name: 'Account', component: Account, meta: { requiresAuth: true } },
      {
        path: 'auth',
        name: 'AuthPage',
        component: AuthLayout,
        meta: { requiresGuest: true },
        redirect: "/auth/login",
        children: [
          { path: 'login', name: 'Login', component: Login },
          { path: 'register', name: 'SignUp', component: SignUp },
          { path: 'reset-password', name: 'ResetPassword', component: ResetP },
        ],
      },
    ],
  },
]
