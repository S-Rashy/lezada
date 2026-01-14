import HomeLayout from "@/homeLayout/HomeLayout.vue";
import HomePage from "@/pages/HomePage.vue";

export default [
    {
        path: '/',
        name: 'Home',
        component: HomeLayout, 
        children: [
            {path: '', name: 'HomePage', component: HomePage},
        ]
    }
]