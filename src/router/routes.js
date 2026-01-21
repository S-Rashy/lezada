import Login from '@/components/authComps/Login.vue'
import ResetP from '@/components/authComps/ResetP.vue'
import SignUp from '@/components/authComps/SignUp.vue'
import AuthLayout from '@/layouts/authLayout/AuthLayout.vue'
import HomeLayout from '@/layouts/homeLayout/HomeLayout.vue'
import HomePage from '@/pages/HomePage.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: HomeLayout,
    children: [
      { path: '', name: 'HomePage', component: HomePage },
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
