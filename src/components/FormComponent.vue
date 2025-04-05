<script setup>
import { ref } from 'vue'
const selected = ref('')
</script>

<template>
  <h1>What Should I Wear Today?</h1>
  <h3 style="margin-top: 2rem;">Zipcode: <input class="textArea" type="text" required></h3>
  <h3 style="margin-top: 2rem;">How do cats wear pants? {{ selected }}</h3>
  <div style="margin-top: 1rem;">
    <input type="radio" id="one" value="On two legs" v-model="selected" />
    <label style="padding-left: .5rem;" for="one">On two legs</label>
  </div>
  <div style="margin-top: 1rem;">
    <input type="radio" id="two" value="On four legs" v-model="selected" />
    <label style="padding-left: .5rem;" for="two">On four legs</label>
  </div>
  <button class="button" type="submit">Generate Today's Outfit</button>
</template>

<style scoped>
</style>
