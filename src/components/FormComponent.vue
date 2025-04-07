<script setup>
import { ref } from 'vue'

const getLocation = async(locationSearch) =>{
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
        throw new Error(`HTTP Error Status: ${response.status} make sure you entered a valid zipcode`);
    }
    const locationResponse = await response.json();
    return locationResponse; 
};

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

const displayWeather = () => {
    getLocation(locationSearch.value)
    .then(res=>{
        const latitude = res.results[0].latitude
        const longitude = res.results[0].longitude
        return getWeather(latitude,longitude)
    })
    .then(console.log) 
}
const selected = ref('On two legs')
const locationSearch = ref('')
</script>

<template>
    <div class="card">
        <h2>What Should I Wear Today?</h2>
        <h3 style="margin-top: 2rem;">Zipcode: <input class="textArea" type="text" v-model="locationSearch" required></h3>
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
            <button class="button" type="submit" @click="displayWeather">Generate Today's Outfit</button>
        </div>
    </div>
</template>


<style scoped>
</style>
