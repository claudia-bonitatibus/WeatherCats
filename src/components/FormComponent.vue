<script setup>
import { ref, computed } from 'vue'
import { state } from '../state'

//Call the geocode API to get the location data that corresponds to the zip code entered in the text area
const getLocation = async(locationSearch) =>{
    let showError = '';
    const params = new URLSearchParams();
    params.set('name', locationSearch);
    params.set('count', 1);
    params.set('format', 'json');
    params.set('countryCode', 'US');
    const response = await fetch(`http://localhost:3000/v1/search?${params}`,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP Error Status: ${response.status}`);
    }
    if(response.status == 404){
        showError = 'make sure you entered a valid ZIP code';
    }
    const locationResponse = await response.json();
    // return {locationResponse, showError};
    return (locationResponse);
};
    //TODO: display error in UI when a invalid zip code is entered
    // const errorComputed = computed(() => {
    //     return displayError(props);
    // })

//Call the weather API using the latitude and longitude recieved from the geocode API call
const getWeather = async(latitude, longitude) =>{
    const params = new URLSearchParams();
    params.set('latitude', latitude);
    params.set('longitude', longitude);
    params.set('current', 'temperature_2m,precipitation')
    params.set('temperature_unit', 'fahrenheit')
    const response = await fetch(`http://localhost:3000/v1/forecast?${params}`,{
        method:"GET",
        headers: {
        'Content-Type': 'application/json'
        },
    })
    const weatherResponse = await response.json();
    return weatherResponse;
};
const selected = ref('On two legs')
const locationSearch = ref('')

const handleSubmit = async() => {
    const res = await getLocation(locationSearch.value); 
    const latitude = res.results[0].latitude;
    const longitude = res.results[0].longitude;
    const weather = await getWeather(latitude,longitude);
    state.precipitation = weather.current.precipitation;
    state.temperature = weather.current.temperature_2m;
    state.selected = selected.value;
}
</script>

<template>
    <form  @submit.prevent="handleSubmit" class="card">
        <h2>What Should I Wear Today?</h2>
        <h3 style="margin-top: 2rem;">ZIP Code: <input class="textArea" type="text" v-model="locationSearch" required></h3>
        <!-- <p>{{errorComputed.displayError}}</p> -->
        <h3 style="margin-top: 2rem;">How do cats wear pants? {{ selected }}</h3>
        <div class="radioItem">
            <input type="radio" id="one" value="On two legs" v-model="selected" />
            <label style="padding-left: .5rem;" for="one">On two legs</label>
        </div>
        <div class="radioItem">
            <input type="radio" id="two" value="On four legs" v-model="selected" />
            <label style="padding-left: .5rem;" for="two">On four legs</label>
        </div>
        <div>
            <button class="button" type="submit">Generate Today's Outfit</button>
        </div>
    </form>
</template>
<style scoped>
</style>
