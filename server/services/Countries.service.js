import axios from "axios";

export const getAllCountries = async(req, res) => {
    try {
        const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching countries data.' });
    }
}

export const getOneCountry = async(req, res) => {
    try {
        
        const {data} = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${req.params.code}`);
        const {data : flags} = await axios.get('https://countriesnow.space/api/v0.1/countries/flag/images')
        const {data : populations} = await axios.get('https://countriesnow.space/api/v0.1/countries/population');
        const countryPopulation = populations.data.find((item) => item.country === data.officialName)
        
        const flag = flags.data.find((flag) => flag.name === data.officialName)

        res.status(200).json({borders : data, countryPopulation : countryPopulation?.populationCounts, flag});
    } catch (error) {
        // console.log(error);
        res.status(404).json({ message: 'Country not found.' });
    }
}