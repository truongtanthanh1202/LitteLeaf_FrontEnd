<template>
  <div v-if="showSidebar" id="sidebar-wrapper" :style="{ background: bgColor }">
    <router-link class="room" to="/room/1" :style="{ color: textColor }">
      <img
        class="room-img"
        src="../../assets/images/room/beach.jpg"
        alt="room-img"
      />
      <p class="room-name">Beach</p>
    </router-link>
    <router-link class="room" to="/room/2" :style="{ color: textColor }">
      <img
        class="room-img"
        src="../../assets/images/room/city.jpg"
        alt="room-img"
      />
      <p class="room-name">City</p>
    </router-link>
    <router-link class="room" to="/room/3" :style="{ color: textColor }">
      <img
        class="room-img"
        src="../../assets/images/room/fantasy.jpg"
        alt="room-img"
      />
      <p class="room-name">Fantasy</p>
    </router-link>
    <router-link class="room" to="/room/4" :style="{ color: textColor }">
      <img
        class="room-img"
        src="../../assets/images/room/library.jpg"
        alt="room-img"
      />
      <p class="room-name">Library</p>
    </router-link>
    <router-link class="room" to="/room/5" :style="{ color: textColor }">
      <img
        class="room-img"
        src="../../assets/images/room/lofi.jpg"
        alt="room-img"
      />
      <p class="room-name">Lofi</p>
    </router-link>
    <router-link class="room" to="/room/6" :style="{ color: textColor }">
      <img
        class="room-img"
        src="../../assets/images/room/natural.jpg"
        alt="room-img"
      />
      <p class="room-name">Natural</p>
    </router-link>
    <router-link class="room" to="/room/7" :style="{ color: textColor }">
      <img
        class="room-img"
        src="../../assets/images/room/piano.jpg"
        alt="room-img"
      />
      <p class="room-name">Cybepunk</p>
    </router-link>
    <router-link class="room" to="/room/8" :style="{ color: textColor }">
      <img
        class="room-img"
        src="../../assets/images/room/rain.jpg"
        alt="room-img"
      />
      <p class="room-name">Rain</p>
    </router-link>
    <router-link class="room" to="/room/9" :style="{ color: textColor }">
      <img
        class="room-img"
        src="../../assets/images/room/live-study.jpg"
        alt="room-img"
      />
      <p class="room-name">Live Study</p>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SideBar',
  computed: mapState(['showSidebar']),
  props: ['bgColor', 'textColor'],
}
</script>

<style lang="scss" scoped>
#sidebar-wrapper {
  cursor: pointer;
  background-color: #fff;
  backdrop-filter: blur(10px);
  width: 7rem;
  position: fixed;
  text-align: center;
  height: 100%;
}
.room {
  border: none;
  margin-top: 1rem;
  text-decoration: none;
  color: black;
  text-shadow: 0.4px 0.4px #999;
  font-weight: bold;
  background-color: #fff;
}

.room:hover .room-img {
  border-radius: 50%;
}

.room-img {
  width: 5rem;
  border-radius: 45%;
  margin: auto;
}

.room-name {
  text-transform: capitalize;
  font-size: 10px;
  margin: 2px 0 12px 0;
}
</style>
