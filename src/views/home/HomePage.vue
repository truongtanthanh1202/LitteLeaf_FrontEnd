<template>
  <NavBar bgColor="white" />
  <SideBar />
  <main class="container w-100 p-3">
    <div class="row justify-content-center">
      <div class="col-8 container newsfeed">
        <div class="row justify-content-center">
          <div class="col-10">
            <UpPost></UpPost>
          </div>
        </div>

        <div class="row justify-content-center" style="margin-top: 2em">
          <div class="col-10">
            <Posts :typePosts="{ name: 'HomePage' }"></Posts>
          </div>
        </div>
      </div>

      <div class="follow col-4">
        <Follow></Follow>
      </div>
    </div>
  </main>
</template>

<script>
import SideBar from '../../components/layout/SideBar.vue'
import NavBar from '../../components/layout/NavBar.vue'
import UpPost from '../../components/newsfeed/UpPost.vue'
import Posts from '../../components/newsfeed/Posts.vue'
import Follow from '../../components/newsfeed/Follow.vue'

export default {
  name: 'HomePage',

  components: {
    NavBar,
    SideBar,
    UpPost,
    Posts,
    Follow,
  },
}
</script>

<style lang="scss" scoped>
main {
  margin-top: 2em;
}

$breakpoint-tablet: 775px;
@media (max-width: $breakpoint-tablet) {
  .follow {
    display: none;
  }

  .newsfeed {
    width: 100%;
  }
}
</style>
