<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Bot, Sun, Moon, User2 } from 'lucide-vue-next'

import { signInWithGoogle } from '../../api/user'
import { auth, db } from '../../lib/firebase'
import { signOut, onAuthStateChanged, type User } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import Message from '../Message.vue'
import Input from '../Input.vue'
import WelcomeMessage from '../WelcomeMessage.vue'
import ChatHistory from '../ChatHistory.vue'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu'
import { sendPrompt } from '../../api/ai'

//ChatBox
export interface Message {
  text: string
  sender: 'user' | 'ai'
}

const messages = ref<Message[]>([])
const chatId = ref<string | null>(null)
const aiThinking = ref(false)

onMounted(() => {
  const unsubscribe = onAuthStateChanged(auth, userState => {
    user.value = userState

    if (!user.value) {
      messages.value = []
      chatId.value = null
    }
  })

  return unsubscribe
})

async function handleSend(text: string) {
  messages.value.push({ text, sender: 'user' })

  aiThinking.value = true
  const aiMessage = await sendPrompt(text)
  aiThinking.value = false

  messages.value.push({ text: aiMessage, sender: 'ai' })

  if (user.value) {
    if (!chatId.value) {
      chatId.value = `${user.value.uid}_${Date.now()}`
    }
    const chatRef = doc(db, 'chats', chatId.value)

    try {
      const existingChat = await getDoc(chatRef)
      const title = messages.value[0]?.text || ''

      if (!existingChat.exists()) {
        await setDoc(chatRef, {
          userId: user.value.uid,
          chatId: chatId.value,
          messages: messages.value,
          title,
        })
      } else {
        await updateDoc(chatRef, {
          messages: messages.value,
          title,
        })
      }
    } catch (error) {
      console.error('Error saving chat:', error)
    }
  }
}

const onChatSelected = (selectedChat: { messages: Message[]; id: string }) => {
  messages.value = selectedChat.messages
  chatId.value = selectedChat.id
}

function handleClearChat() {
  messages.value = []
}

function formatMessage(message: string) {
  let formattedMessage = message
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />')

  return formattedMessage
}

//ThemeToggler
const isDarkMode = ref(localStorage.getItem('darkMode') === 'true')
function toggleDarkMode() {
  const root = document.querySelector(':root')
  root?.classList.toggle('dark')
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', String(isDarkMode.value))
}

onMounted(() => {
  if (isDarkMode.value) {
    const root = document.querySelector(':root')
    root?.classList.add('dark')
  }
})

onUnmounted(() => {
  const root = document.querySelector(':root')
  root?.classList.remove('dark')
})

//UserAvatar
const user = ref<User | null>(null)
onMounted(() => {
  const unsubscribe = onAuthStateChanged(auth, userState => {
    user.value = userState
  })
  return unsubscribe
})

async function handleSignInWithGoogle() {
  try {
    await signInWithGoogle()
    user.value = auth.currentUser
  } catch (error) {
    console.error(error)
  }
}

async function handleSignOut() {
  try {
    await signOut(auth)
    user.value = null
  } catch (error) {
    console.error(error)
  }
}

function handleClick() {
  if (user.value) {
    handleSignOut()
  } else {
    handleSignInWithGoogle()
  }
}
</script>

<template>
  <header class="bg-background sticky top-0 z-40 w-full border-b border-none">
    <div id="navbar-wrapper">
      <nav style="background-color: white">
        <router-link to="/" id="logo-title">
          <img
            id="logo"
            src="../../assets/images/icons/little_leaf.png"
            alt="logo"
          />
          <div id="title">Little Leaf</div>
        </router-link>

        <div
          style="position: relative; margin: auto; width: 20%; display: flex"
        ></div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost">
              <User2 class="font-bold h-15 w-15" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem @click="handleClick">
              {{ user ? 'Sign out' : 'Sign in with Google' }}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  </header>
  <main>
    <section class="flex justify-center mt-6 border-none">
      <div class="md:w-[70vw] mb-2">
        <div
          class="flex flex-col gap-4 mx-4 mb-32"
          style="background-color: white"
        >
          <WelcomeMessage
            @send-prompt="handleSend"
            v-if="messages.length === 0"
          />
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="[
              'p-2 rounded-md',
              message.sender === 'user'
                ? 'bg-primary text-white dark:text-black'
                : 'bg-secondary',
              message.sender === 'user' ? 'self-end' : 'self-start',
            ]"
          >
            <div v-html="formatMessage(message.text)"></div>
          </div>
          <div v-if="aiThinking" class="self-start p-2 rounded-md bg-secondary">
            <span class="animate-ping">.</span>
            <span class="animate-ping delay-150">.</span>
            <span class="animate-ping delay-300">.</span>
          </div>
          <ChatHistory @chat-selected="onChatSelected" />
          <Input @send="handleSend" @clear-chat="handleClearChat" />
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@import '../../assets/main.css';
@import '../../assets/sass/style.scss';
@import url('https://fonts.googleapis.com/css2?family=Dongle:wght@700&family=Fruktur&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap');

#navbar-wrapper {
  width: 100%;
  height: $navbar-height;
  z-index: 5;
}

nav {
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0 1.5rem;

  i {
    font-size: 2.5rem;
  }

  #logo-title {
    margin-left: 20px;
    display: flex;
    align-items: center;

    #title {
      font-size: 2.3rem;
      font-family: 'Roboto', sans-serif;
      font-weight: 800;
      margin-left: 1rem;
      color: #f5f3f3;
      text-shadow: 2px 0 0 #000, -2px 0 0 #000, 0 2px 0 #000, 0 -2px 0 #000,
        1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;
    }
  }

  img {
    height: 4rem;
  }
}
</style>
