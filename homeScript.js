const baseUrl = "https://parkwhererest20251203132035-gdh2hyd0c9ded8ah.germanywestcentral-01.azurewebsites.net/api/parkwhere";

Vue.createApp({
    data() {
        return {
            parkingSpotAmountWest: null,
            latestUpdate: null,
            previousParkingAmount: null,
            timeoutId: null,
            alerted: false,
            eventsChart: null
        };
    },

    methods: {
        async getParkingSpotAmount() {
            try {
                const response = await axios.get(baseUrl);
                
                // Ensure it's a number
                const newAmount = Number(response.data);
                this.parkingSpotAmountWest = newAmount;

                // Update latest update time only when amount changes
                if (newAmount !== this.previousParkingAmount) {
                    this.latestUpdate = new Date().toLocaleTimeString('en-GB', {
                        hour12: false,
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    });
                    this.previousParkingAmount = newAmount;
                }

                // Alert when spots are low
                if (this.parkingSpotAmountWest < 10 && !this.alerted) {
                    alert(`There are only ${this.parkingSpotAmountWest} parking spots left in the West parking lot!`);
                    this.alerted = true;
                } else if (this.parkingSpotAmountWest >= 10) {
                    this.alerted = false;
                }

            } catch (ex) {
                console.error("Error fetching parking spots:", ex.message);
            } finally {
                // Refresh every 2 seconds
                this.timeoutId = setTimeout(() => {
                    this.getParkingSpotAmount();
                }, 2000);
            }
        }
    },

    // Lifecycle hooks
    mounted() {
        this.getParkingSpotAmount();
    },

    beforeUnmount() {
        clearTimeout(this.timeoutId);
    },

    // Computed property for container color
    computed: {
        getParkingColor() {
            if (this.parkingSpotAmountWest === 0) {
                return '#b52c2c'; // red
            } else if (this.parkingSpotAmountWest < 75) {
                return '#c97108'; // orange
            } else {
                return '#3ebb3eff'; // green
            }
        }
    }

}).mount("#app");
