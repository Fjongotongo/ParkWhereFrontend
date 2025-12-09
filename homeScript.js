const baseUrl = "http://localhost:5166/api/parkwhere";

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
            } catch (ex) {
                console.error("Error fetching parking spots:", ex.message);
            } finally {
                this.timeoutId = setTimeout(() => {
                    this.getParkingSpotAmount();
                }, 2000);
            }
        },

        async loadEventsPerHour() {
            try {
                const response = await axios.get(baseUrl + "/events-per-hour");
                const apiData = response.data;

                // Build full 24-hour array
                const counts = Array(24).fill(0);
                apiData.forEach(item => {
                    counts[item.hour] = item.count;
                });

                this.renderChart(counts);
            } catch (ex) {
                console.error("Error fetching hourly events:", ex.message);
            }
        },

        renderChart(counts) {
            const ctx = document.getElementById("eventsChart");

            // Destroy existing chart (important for hot reloads)
            if (this.eventsChart) {
                this.eventsChart.destroy();
            }

            this.eventsChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: [...Array(24).keys()], // 0–23
                    datasets: [{
                        label: "Parking Events Per Hour",
                        data: counts,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: "Event Count"
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: "Hour of Day"
                            }
                        }
                    }
                }
            });
        }
    },

    mounted() {
        this.getParkingSpotAmount();
        this.loadEventsPerHour();   // Load chart once when page loads
    },

    beforeUnmount() {
        clearTimeout(this.timeoutId);
    }
}).mount("#app");
