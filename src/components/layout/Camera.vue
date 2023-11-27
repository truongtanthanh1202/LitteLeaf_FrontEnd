<template>
    <router-link to="/camerasnapchat">
        <div id="camera">
            <a href="#" role="button">
                <i class="fas fa-camera"></i>
            </a>
        </div>
    </router-link>
</template>
  
<script>
export default {
    name: "Camera",
}
</script>
  
<style lang="scss" scoped>
@import '../../assets/sass/style.scss';

#camera {
    width: 4rem;
    position: relative;

    i {
        font-size: 2.5rem;
    }

    i:hover {
        color: rgba(0, 0, 0, 0.44);
    }
}
</style>
  