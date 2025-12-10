const baseUrl = "https://parkwhererest20251203132035-gdh2hyd0c9ded8ah.germanywestcentral-01.azurewebsites.net/api/parkwhere";

Vue.createApp({
    data() {
        return {
            parkingSpotAmountWest: null,
            latestUpdate: null,
            previousParkingAmount: null,
            timeoutId: null,

            eventsChart: null // chart instance
        };
    },

    methods: {
        async getParkingSpotAmount() {
            try {
                const response = await axios.get(baseUrl);
                const newAmount = response.data;

                this.parkingSpotAmountWest = newAmount;

                if (newAmount !== this.previousParkingAmount) {
                    this.latestUpdate = new Date().toLocaleTimeString('en-GB', {
                        hour12: false,
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    });
                    this.previousParkingAmount = newAmount;
                }

                 if (this.parkingSpotAmountWest < 10 && !this.alerted) {
                alert(`There are only ${this.parkingSpotAmountWest} parking spots left in the West parking lot!`);
                this.alerted = true; 

                } else if (this.parkingSpotAmountWest >= 10) {
                this.alerted = false; 
                
      }
            } catch (ex) {
                console.error("Error fetching parking spots:", ex.message);
            } finally {

                
                this.timeoutId = setTimeout(() => {
                    this.getParkingSpotAmount();
                }, 2000);
            }
        },
        },
        mounted() {
        this.getParkingSpotAmount();
        this.loadEventsPerHour();   // Load chart once when page loads
    },

    beforeUnmount() {
        clearTimeout(this.timeoutId);
    }
}).mount("#app");
