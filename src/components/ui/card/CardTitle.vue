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
  <h1
    :class="
      cn('text-6xl font-semibold leading-none tracking-tighter font-bold', props.class)
    "
  >
    <slot />
  </h1>
</template>
