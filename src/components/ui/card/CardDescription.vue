<style scoped>
@import '../../../assets/main.css';
</style>

<script setup lang="ts">
import { cn } from '../../../lib/utils'

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <p :class="cn('text-3xl text-muted-foreground', props.class)">
    <slot />
  </p>
</template>
