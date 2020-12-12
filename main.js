
const urlCountries = 'https://restcountries.eu/rest/v2/all';
const urlNBU = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

Vue.createApp({
    data() {
        return {
            countries: [],
            NBU: [],
            search: '',
            sort: 'none',
        }
    },
    computed: {
        rateList() {
            let result = this.NBU;
            let copyResult = JSON.parse(JSON.stringify(result));

            if (this.sort !== 'none') {

                if (this.sort) {
                    result.sort((a, b) => a.rate > b.rate ? 1 : -1);

                } else {
                    result.sort((a, b) => a.rate > b.rate ? -1 : 1);
                }

            }

            if (this.search !== '') {

                result = copyResult;
                let filteredResult = [];

                for (let i = 0; i < result.length; i++) {

                    let res = result[i].Country.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()));
                    result[i].Country = res;

                    if (result[i].Country.length !== 0) {
                        filteredResult.push(result[i]);
                    }

                }

                result = filteredResult;

            }

            return result;
        },

    },
    async mounted() {
        let countryInfo = await fetch(urlCountries);
        countryInfo = await countryInfo.json();

        let NBUinfo = await fetch(urlNBU);
        NBUinfo = await NBUinfo.json();

        this.countries = countryInfo;
        this.NBU = NBUinfo;

        for (let currency of NBUinfo) {
            let countname = [];

            for (let country of countryInfo) {
                let countriesNameAndFlag = {};

                if (currency.cc === country.currencies[0].code) {

                    let countryName = country.name;
                    let flag = country.flag;

                    countriesNameAndFlag = {
                        name: countryName,
                        flag: flag,
                    };

                countname.push(countriesNameAndFlag);
                
                }
            }

            currency['Country'] = countname;
        }

    }
}).mount('#app');
