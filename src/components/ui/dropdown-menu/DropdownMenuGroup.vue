<style scoped>
@import '../../../assets/main.css';
</style>

<script setup lang="ts">
import { DropdownMenuGroup, type DropdownMenuGroupProps } from 'radix-vue'

const props = defineProps<DropdownMenuGroupProps>()
</script>

<template>
  <DropdownMenuGroup v-bind="props">
    <slot />
  </DropdownMenuGroup>
</template>
