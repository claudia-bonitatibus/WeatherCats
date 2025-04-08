<script setup>
import FormComponent from '@/components/FormComponent.vue'
import ImageViewComponent from '@/components/ImageViewComponent.vue'
import { state } from './state';
</script>

<template>
  <FormComponent v-show=!state.showOutfit() />
  <ImageViewComponent v-show=state.showOutfit() :precipitation="state.precipitation" :temperature="state.temperature" :selected="state.selected" />
</template>

<style scoped>
</style>
