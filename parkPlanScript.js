const baseUrl = "http://localhost:5166/api/parkwhere";

const ParkingChart = {
    props: ['config'],
    template: '<div style="height:100%"><canvas ref="c"></canvas></div>',
    mounted() { this.draw(); },
    watch: { 
        config: { 
            handler(v) { this.chart ? (this.chart.data = v.data, this.chart.update('none')) : this.draw(); }, 
            deep: true 
        } 
    },
    methods: {
        draw() {
            if (this.chart) this.chart.destroy();
            this.chart = new Chart(this.$refs.c, this.config);
        }
    }
};

Vue.createApp({
    components: { ParkingChart },
    data: () => ({ count: '...', time: '', mode: 'hourly', config: null, t1: 0, t2: 0 }),
    methods: {
        async refresh(m = this.mode) {
            this.mode = m;
            const hr = m === 'hourly';
            
            const { data } = await axios.get(`${baseUrl}/GetAmountStartParkingEach${hr?'Hour':'Day'}`);
            
            this.config = {
                type: 'bar',
                data: {
                    labels: hr ? Array.from({length:24},(_,i)=>i+':00') : "Mon,Tue,Wed,Thu,Fri,Sat,Sun".split(','),
                    datasets: [{ label: `Vehicles (${m})`, data, backgroundColor: '#36a2eb', borderRadius: 4 }]
                },
                options: { maintainAspectRatio: false, scales: {y:{beginAtZero:true}}, animation: false }
            };
        },
        async tick() {
            const { data } = await axios.get(baseUrl);
            if (this.count !== data) { this.count = data; this.time = new Date().toLocaleTimeString('en-GB'); }
        }
    },
    mounted() {
        this.tick(); this.refresh();
        this.t1 = setInterval(this.tick, 2000);    
        this.t2 = setInterval(this.refresh, 2000);
    },
    beforeUnmount() { clearInterval(this.t1); clearInterval(this.t2); }
}).mount("#app");