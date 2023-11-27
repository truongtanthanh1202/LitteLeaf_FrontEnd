<template>
    <router-link to="/aichatbox">
        <div id="chat">
            <a href="#" role="button">
                <i class="far fa-question-circle"></i>
            </a>
        </div>
    </router-link>
</template>
  
<script>
export default {
    name: "ChatBox",
}
</script>
  
<style lang="scss" scoped>
@import '../../assets/sass/style.scss';

#chat {
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
  