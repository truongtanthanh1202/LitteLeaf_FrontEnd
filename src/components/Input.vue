<style scoped>
@import '../assets/main.css';
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { Send, PlusCircle } from 'lucide-vue-next'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useToast } from 'vue-toastification'

const message = ref('');
const isUserSignedIn = ref(false);
const toast = useToast();

const emit = defineEmits(['send', 'clear-chat']);

onAuthStateChanged(auth, (userState) => {
  isUserSignedIn.value = !!userState;
});

function handleSendClick() {
  if (isUserSignedIn.value) {
    if (message.value.trim() !== '') {
      emit('send', message.value.trim())
      message.value = ''
    }
  } else {
    toast.error('Please sign in to send a message.')
  }
}

function handleClearChat() {
  emit('clear-chat');
}

function handleKeyPress(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    handleSendClick();
  }
}

</script>

<template>
  <div class="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50% md:w-[64vw]">
    <div class="mx-auto sm:max-w-2xl sm:px-4 md:w-[64vw]">
      <div class=" space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4 md:w-[64vw]">
        <div class="relative">
          <div class="flex items-center">
            <Button className="mr-4" size="icon" @click="handleClearChat">
              <PlusCircle class="h-10 w-10" />
            </Button>
            <Textarea v-model="message" @keypress="handleKeyPress" tabindex="0" rows="1" placeholder="Type a message..."
              spellcheck="false" class="w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none" />
            <Button @click="handleSendClick" className="ml-4" size="icon">
              <Send class="h-10 w-10" />
            </Button>
          </div>
          <footer className="mt-auto">
            <div className="mx-auto w-full max-w-screen-xl p-2">
              <span className="text-center block text-sm text-muted-foreground">
                I can make mistakes. Consider checking important information.
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>