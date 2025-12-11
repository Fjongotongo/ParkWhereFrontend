const statsUrl = "https://parkwhererest20251203132035-gdh2hyd0c9ded8ah.germanywestcentral-01.azurewebsites.net/api/parkwhere/stats";

Vue.createApp({
    data() {
        return {
            stats: {
                totalCars: 0,
                topModels: [],  // This will now hold the transformed top models
                carsByFueltype: {}
            }
        };
    },

    methods: {
        async loadStats() {
            try {
                const response = await axios.get(statsUrl);
                console.log("Full API response:", response.data);

                // Process the API response to create 'topModels' from 'brands'
                const topModels = Object.entries(response.data.brands)
                    .map(([brand, brandData]) => {
                        // Extract the first model from the 'models' object for each brand
                        const model = Object.keys(brandData.models)[0];
                        return {
                            brand: brand,
                            model: model,
                            count: brandData.count
                        };
                    })
                    .sort((a, b) => b.count - a.count)  // Sort models by count in descending order
                    .slice(0, 5);  // Get only the top 5 models

                // Update Vue data with the processed response
                this.stats = {
                    totalCars: response.data.totalCars,
                    topModels: topModels,
                    carsByFueltype: response.data.carsByFueltype
                };

                console.log("Top 5 processed models:", topModels);
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
