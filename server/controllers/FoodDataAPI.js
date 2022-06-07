import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const getFoodData = async (req,res) => {
    const { query } = req.params;
    const api_key = process.env.FOOD_DATA_APIKEY;
    // const query = 'cheddar cheese'
    // const dataType = ['Survey (FNDDS)']
    const pageSize = 6
    const api_url = 
`https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&pageSize=${encodeURIComponent(pageSize)}&api_key=${encodeURIComponent(api_key)}`

    try {

        axios.get(api_url)
        .then((response)=> {
            res.status(200).json(response.data);
        })

    } catch (error) {
        res.status(404).json({message:error.message})
    }
}


const params = {
    api_key:'BdndmSuoHSDQTOluzcbZspFejauCzw7XPE2ea4do',
    query:'cheddar cheese',
    dataType:['Survey (FNDDS)'],
    pageSize:1,
}

// function getData() {
//     return fetch(api_url)
//     .then(response => response.json())
// }

// getData.then(data => console.log(data.foods[0].foodNutrients))