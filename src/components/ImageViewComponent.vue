<script setup>
    import {computed} from 'vue';
    import { state } from '../state'

    //Determine what text and image is displayed using temperature and precipitation data from the weather API calls 
    //and the radio button selection
    const props = defineProps({
        precipitation: Number,
        temperature: Number,
        selected: String, 
    })

    const displayOutfit=({precipitation, temperature, selected})=>{
        let outfitImage = '';
        let outfitDescription = '';
        if(precipitation > 0){
            if(selected == 'On two legs'){
                outfitImage = 'rain_01.svg';
            }
            else {
                outfitImage = 'rain_02.svg';
            }
            outfitDescription = `It's raining outside. Make sure to wear a raincoat or bring an umbrella.`;
        }
        else if (temperature >= 70){
            if(selected == 'On two legs'){
                outfitImage = 'warm_01.svg';
            }
            else {
                outfitImage = 'warm_02.svg';
            }
            outfitDescription = `It's very warm today. Dress lightly and don't forget your sunscreen.`;
        }
        else if ((temperature < 70 && temperature >= 50)){
            if(selected == 'On two legs'){
                outfitImage = 'cool_01.svg';
            }
            else {
                outfitImage = 'cool_02.svg';
            }
            outfitDescription = `It's a little chilly out. The purrfect weather for a light jacket or your favorite sweater.`;
        }
        else if (temperature < 50){
            if(selected == 'On two legs'){
                outfitImage = 'cold_01.svg';
            }
            else {
                outfitImage = 'cold_02.svg';
            }
            outfitDescription = `It's cold today. Make sure you bundle up in a jacket and some cozy mittens. Add a pop of color for extra warmth.`;
        }
        console.log(temperature);
        return {outfitImage, outfitDescription};
    }
    const outfitComputed = computed(() => {
        return displayOutfit(props);
    })

    //Reset precipitation and temperature values to null to return to entry form
    const handleSubmit = () => {
        state.precipitation = null;
        state.temperature = null;
        console.log(state.temperature);
    }
</script>

<template>
    <!-- dynamically display content using outfitImage and outfitDescription -->
    <form @submit.prevent="handleSubmit">
        <div>
            <img
                style="max-width: 25rem; min-width: 15rem; max-height: 18rem; margin: 2rem;"
                :src="'/src/assets/svgs/'+outfitComputed.outfitImage"
            />
        </div>
        <div class="weather-container">
            <h1 style="font-weight: 200;">{{ temperature+"°" }}</h1>
            <h3 style="max-width: 20rem; padding-left: 1.5rem;">{{ outfitComputed.outfitDescription }}</h3>
        </div>
    
        <div>
            <button type="submit" class="button-empty">
                <img src="../assets/svgs/back_arrow.svg"/>
            </button>
        </div>
    </form>
</template>

<style scoped>
</style>
