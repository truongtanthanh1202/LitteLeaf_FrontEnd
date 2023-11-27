import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Pusher from 'pusher-js/with-encryption'
import { baseBroadcastUrl } from './env'
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'
import enUS from '@kangc/v-md-editor/lib/lang/en-US'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import hljs from 'highlight.js'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

Pusher.logToConsole = true

window.pusher = new Pusher('3ef48bd1a87852f6ef19', {
  cluster: 'ap1',
  authEndpoint: `${baseBroadcastUrl}`,
  auth: { headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') } },
})

VueMarkdownEditor.lang.use('en-US', enUS)
VueMarkdownEditor.use(vuepressTheme, { Prism })

VMdPreview.use(githubTheme, { Hljs: hljs })

createApp(App)
  .use(router)
  .use(store)
  .use(VueMarkdownEditor)
  .use(VMdPreview)
  .use(Toast, {
    transition: 'Vue-Toastification__bounce',
    position: 'top-center',
    timeout: 10000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: 'button',
    icon: true,
    rtl: false,
  })
  .mount('#app')
