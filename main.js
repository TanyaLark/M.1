
const urlCountries = 'https://restcountries.eu/rest/v2/all';
const urlNBU = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

Vue.createApp({
    data(){
        return {
            countries: [],
            NBU: [],
            search: '',
            sort: 'none'
        }
    },
    computed: { 
        rateList(){
            let result = this.NBU;

            if (this.sort !== 'none'){

                if(this.sort){
                    result.sort((a, b) => a.rate > b.rate ? 1 : -1);
                     
                }else{
                    result.sort((a, b) => a.rate > b.rate ? -1 : 1);
                }
            }
            return result;
        },
        countryList(){
            let res = this.countries.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()));
            return res;
        }
    },
    async mounted(){
        let countryInfo = await fetch(urlCountries);
            countryInfo = await countryInfo.json();
            console.log(countryInfo)

        let NBUinfo = await fetch(urlNBU);
            NBUinfo = await NBUinfo.json();
            console.log(NBUinfo)

            this.countries = countryInfo;
            this.NBU = NBUinfo;

    }
}).mount('#app');




