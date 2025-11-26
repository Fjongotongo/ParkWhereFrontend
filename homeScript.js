const baseUrl = "indsæt api"

Vue.createApp({
    data(){
        return{
            parkingSpotAmountWest: 97,
            parkingSpotAmountSouth: 22,
            parkingSpotAmountNorth: 140,

            latestUpdate: "14:30"
        }
    },

    methods:{
        async getParkingSpotAmount(){
            try {
                response = await axios.get(baseUrl)
                this.parkingSpotAmount = response.data //skal rettes når api er klar
            }
            catch {
                alert(ex.message)
            }
        },
    }
}).mount("#app")
