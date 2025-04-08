import { reactive } from 'vue'

export const state = reactive({
  precipitation: null,
  temperature: null,
  selected: '',
  showOutfit() {
    return this.precipitation !== null && this.temperature !== null && this.selected !== '';
  }
})
