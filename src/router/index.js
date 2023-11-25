import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/home/HomePage.vue'
import LoginPage from '../views/auth/LoginPage.vue'
import RoomPage from '../views/room/RoomPage.vue'
import ProfilePage from '../views/profile/ProfilePage.vue'
import RegisterPage from '../views/auth/RegisterPage.vue'
import PomodoroClock from '../views/room/PomodoroClock.vue'
import { authApi } from '../infrastructure/apiServices'
import ResetPassword from '../views/auth/ResetPassword.vue'
import ResetPasswordRequest from '../views/auth/ResetPasswordRequest.vue'
import ChatArea from '../views/room/ChatArea.vue'
import ViewSinglePost from '../views/post/ViewSinglePost.vue'
import ChangePassword from '../views/auth/ChangePassword.vue'
import PostEditor from '../views/post/PostEditor.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
      meta: { unProtectedRoute: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterPage,
      meta: { unProtectedRoute: true }
    },
    {
      path: '/change-password',
      name: 'ChangePassword',
      component: ChangePassword
    },
    {
      path: '/reset-password-request',
      name: 'ResetPasswordRequest',
      component: ResetPasswordRequest,
      meta: { unProtectedRoute: true }
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: ResetPassword,
      meta: { unProtectedRoute: true }
    },
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/post/:postid',
      name: 'ViewSinglePost',
      component: ViewSinglePost
    },
    {
      path: '/post/edit/:id',
      name: 'Post Update',
      component: PostEditor
    },
    {
      path: '/post/edit',
      name: 'PostEditor',
      component: PostEditor
    },
    {
      path: '/room/:id',
      name: 'Room',
      component: RoomPage
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfilePage
    },
    {
      path: '/profile/:id',
      name: 'User Profile',
      component: ProfilePage
    },
    {
      path: '/pomodoro',
      name: 'Pomodoro',
      component: PomodoroClock
    },
    {
      path: '/chat',
      name: 'ChatArea',
      component: ChatArea
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta['unProtectedRoute']) {
    next()
  } else {
    authApi
      .jwtValidate()
      .then(() => next())
      .catch(() => next('/login')) //login
  }
})

export default router
