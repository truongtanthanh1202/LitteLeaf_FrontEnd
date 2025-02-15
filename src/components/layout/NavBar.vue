<template>
  <div id="navbar-wrapper">
    <nav :style="{ background: bgColor }">
      <i id="menu" class="fas fa-bars" @click="toggleSidebar"></i>
      <router-link to="/" id="logo-title">
        <img
          id="logo"
          src="../../assets/images/icons/little_leaf.png"
          alt="logo"
        />
        <div id="title">Little Leaf</div>
      </router-link>

      <div id="search-space">
        <div id="search-box">
          <i class="search-icon fas fa-search"></i>
          <input
            class="search-bar"
            placeholder="Search"
            type="text"
            v-model="nameInForum"
          />
          <UserList
            :usersInfo="usersInfo"
            style="position: absolute; top: 2.5rem"
          />
        </div>
      </div>

      <ChatBox />

      <Camera />

      <Notification />

      <div class="dropdown dropstart">
        <a
          data-toggle="dropdown"
          href="#"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img class="avt" id="avatar" :src="avtURL()" alt="avatar" />
        </a>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li>
            <router-link class="dropdown-item" to="/profile"
              ><i class="fas fa-user"></i>Profile</router-link
            >
          </li>
          <li>
            <router-link class="dropdown-item" to="/change-password"
              ><i class="fas fa-key"></i>Change Password</router-link
            >
          </li>
          <li style="cursor: pointer">
            <div class="dropdown-item" @click="logout">
              <i class="fas fa-sign-out-alt"></i>Logout
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { authApi } from '../../infrastructure/apiServices'
import { profileApi } from '../../infrastructure/apiServices'
import UserList from '../element/UserList.vue'
import ChatBox from './ChatBox.vue'
import Camera from './Camera.vue'
import Notification from './Notification.vue'
import { avatarURL } from '../../infrastructure/apiServices'
import { mapMutations } from 'vuex'

export default {
  name: 'NavBar',
  components: { Notification, UserList, Camera, ChatBox },
  props: ['bgColor'],

  data() {
    return {
      nameInForum: null,
      usersInfo: [],
    }
  },

  methods: {
    ...mapMutations(['toggleSidebar']),

    logout() {
      authApi
        .logout()
        .then(() => {
          localStorage.removeItem('jwt')
          localStorage.removeItem('user_info')
          location.assign('/login')
        })
        .catch(err => console.log(err.response.data.message, err))
    },

    avtURL() {
      const avtID = JSON.parse(localStorage.getItem('user_info'))['avatar_id']
      console.log(avatarURL(avtID))
      return avatarURL(avtID)
    },
  },

  watch: {
    nameInForum() {
      if (this.nameInForum !== '')
        profileApi
          .searchUserByName(this.nameInForum)
          .then(response => {
            this.usersInfo = response.data['data']
            console.log(this.usersInfo[0])
          })
          .catch(err => console.log(err))
      else this.usersInfo = []
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/style.scss';
@import url('https://fonts.googleapis.com/css2?family=Dongle:wght@700&family=Fruktur&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap');

#navbar-wrapper {
  width: 100%;
  height: $navbar-height;
  z-index: 5;
}

nav {
  backdrop-filter: blur(10px);
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem 0 1rem;

  i {
    font-size: 2.5rem;
  }

  #menu {
    margin: 0 2.25rem;
  }

  #menu:hover {
    cursor: pointer;
  }

  #logo-title {
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

  #avatar {
    margin: 0 1.5rem;
  }

  #search-space {
    width: 60%;
    margin: auto;

    #search-box {
      position: relative;
      margin: auto;
      width: 40%;
      border-radius: 10px;
      font-size: 1.5rem;
      padding: 4px 20px;
      align-items: center;
      border-radius: 6px;
      border: 1px solid rgba(43, 43, 43, 0.66);
      background: linear-gradient(
        117deg,
        rgba(255, 255, 255, 0.22) -0.3%,
        rgba(255, 255, 255, 0.2) 81.34%
      );
      backdrop-filter: blur(10px);

      .search-bar {
        border: none;
        border-radius: 5rem;
        background: transparent;
        width: 55%;
      }

      .search-bar:focus {
        outline: none;
      }

      .search-icon {
        font-size: 1.5rem;
        margin-right: 8px;
      }
    }
  }

  #user-list {
    box-shadow: 0.1em 0.1em 3px rgba(0, 0, 0, 0.2);
  }

  img {
    height: 4rem;
  }

  .dropdown-menu {
    transform: translate(-2rem, 4rem) !important;
    padding: 0;

    li {
      width: 18rem;
      font-size: 1.5rem;

      i {
        font-size: 1.5rem;
        color: $main_color1;
        margin-right: 1rem;
      }
    }
  }
}

.avt {
  border-radius: 50%;
}

img {
  aspect-ratio: 1/1;
}
</style>
