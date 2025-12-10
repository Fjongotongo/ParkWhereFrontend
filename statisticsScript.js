const statsUrl = "http://localhost:5166/api/parkwhere/stats";

Vue.createApp({
    data() {
        return {
            stats: {
                totalCars: 0,
                topModels: [],
                carsByFueltype: {}
            }
        };
    },

    methods: {
        async loadStats() {
    try {
        const response = await axios.get(statsUrl);
        console.log("Full API response:", response.data);
        console.log("TopModels array:", response.data.TopModels);
        this.stats = response.data;
    } catch (err) {
        console.error("Error loading statistics:", err);
    }
},
    capitalizeWords(str) {
    if (!str) return '';
    return str.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');


}

    },

    mounted() {
        this.loadStats();
    }
}).mount("#app");
