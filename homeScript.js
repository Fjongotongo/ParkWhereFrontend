const baseUrl = "http://localhost:5166/api/parkwhere"

Vue.createApp({
    data(){
        return{
            parkingSpotAmountWest: null,
            parkingSpotAmountSouth: 22,
            parkingSpotAmountNorth: 140,

            latestUpdate: "14:30"
        }
    },

    methods:{
        async getParkingSpotAmount(){
            try {
                response = await axios.get(baseUrl)
                this.parkingSpotAmountWest = response.data //skal rettes når api er klar
            }
            catch {
                alert(ex.message)
            }
        },
    },
    mounted(){
        this.getParkingSpotAmount()
    }
}).mount("#app")
