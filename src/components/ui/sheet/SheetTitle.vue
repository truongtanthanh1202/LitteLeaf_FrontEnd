<style scoped>
@import '../../../assets/main.css';
</style>

<script setup lang="ts">
import { DialogTitle, type DialogTitleProps } from 'radix-vue'
import { cn } from '../../../lib/utils'

const props = defineProps<DialogTitleProps & { class?: string }>()
</script>

<template>
  <DialogTitle
    :class="cn('text-3xl font-semibold text-foreground', props.class)"
    v-bind="props"
  >
    <slot />
  </DialogTitle>
</template>
