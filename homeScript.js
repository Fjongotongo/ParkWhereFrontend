const baseUrl = "https://parkwhererest20251203132035-gdh2hyd0c9ded8ah.germanywestcentral-01.azurewebsites.net/api/parkwhere";

Vue.createApp({
    data() {
        return {
            parkingSpotAmountWest: null,
            latestUpdate: null,
            intervalId: null
        };
    },

    methods: {
        async getParkingSpotAmount() {
            try {
                const response = await axios.get(baseUrl);
                this.parkingSpotAmountWest = response.data; // update based on API
                // Update timestamp immediately after fetching
                this.latestUpdate = new Date().toLocaleTimeString('en-GB', {
                hour12: false,      // 24-hour format
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
             });
            } catch (ex) {
                console.error("Error fetching parking spots:", ex.message);
            }
        }
    },

    mounted() {
        // Fetch immediately
        this.getParkingSpotAmount();
        
        this.intervalId = setInterval(() => {
            this.getParkingSpotAmount();
        });
    },

    beforeUnmount() {
        clearInterval(this.intervalId);
    }
}).mount("#app");
