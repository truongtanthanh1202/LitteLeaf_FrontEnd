<template>
  <Video :mutedSound="mutedSound" :roomName="roomName" />
  <PomodoroClock v-if="displayPomodoroClock" />
  <NavBar bgColor="rgba(21, 21, 21, 0.43)" />
  <SideBar bgColor="rgba(21, 21, 21, 0.43)" textColor="#f5f3f3" />
  <ChatArea v-if="displayChatArea" :roomName="roomName" />
  <div id="control-buttons">
    <i
      @click="togglePomodoroClock"
      id="clock-icon"
      title="Pomodoro Clock"
      class="far fa-clock"
    ></i>
    <i
      v-if="mutedSound"
      class="fas fa-volume-mute"
      title="On volume"
      @click="toggleSound"
    ></i>
    <i
      v-else
      @click="toggleSound"
      title="Off volume"
      class="fas fa-volume-up"
    ></i>
    <i @click="toggleChatArea" title="Chat room" class="fas fa-comments"></i>
  </div>
</template>

<script>
import NavBar from '../../components/layout/NavBar.vue'
import SideBar from '../../components/layout/SideBar.vue'
import Video from '../../views/room/Video.vue'
import PomodoroClock from '../../views/room/PomodoroClock.vue'
import ChatArea from './ChatArea.vue'
import { roomApi } from '../../infrastructure/apiServices'

export default {
  name: 'RoomPage',
  components: { ChatArea, PomodoroClock, Video, SideBar, NavBar },
  data() {
    return {
      mutedSound: true,
      displayPomodoroClock: false,
      displayChatArea: false,
      roomName: '',
    }
  },

  created() {
    roomApi
      .getRoomInfo(this.$route.params.id)
      .then(({ data }) => {
        this.roomName = data.data['name']
      })
      .catch(err => console.log(err))
  },

  methods: {
    toggleSound() {
      this.mutedSound = !this.mutedSound
    },
    togglePomodoroClock() {
      if (!this.displayPomodoroClock) {
        this.displayChatArea = false
      }
      this.displayPomodoroClock = !this.displayPomodoroClock
    },
    toggleChatArea() {
      if (this.displayPomodoroClock) {
        alert('Only chat after finishing your session')
        return
      }
      this.displayChatArea = !this.displayChatArea
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/sass/style';
#control-buttons {
  position: fixed;
  bottom: 40vh;
  right: 1rem;

  border-radius: 4px;
  border: 1px solid rgba(59, 59, 59, 0.01);
  background: rgba(59, 59, 59, 0.68);
  backdrop-filter: blur(16px);
  padding: 16px 6px;
  gap: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  i {
    color: white;
    font-size: 1.8rem;
  }

  i:hover {
    color: #ced6e0;
    cursor: pointer;
  }
}
</style>
