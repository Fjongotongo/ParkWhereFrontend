const baseUrl = "https://parkwhererest20251203132035-gdh2hyd0c9ded8ah.germanywestcentral-01.azurewebsites.net/api/parkwhere"

Vue.createApp({
    data(){
        return{
            parkingSpotAmountWest: null,

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
