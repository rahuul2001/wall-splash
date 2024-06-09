import axios from 'axios'

const API_KEY = '44300926-240a53122114a66d20773211a'

const apiUrl = `https://pixabay.com/api?key=${API_KEY}`



const formatUrl = (params) => {
    let url = apiUrl + "&per_page=25&safesearch=true&editors_choice=true"
    if(!params){
        return url;
    }
    let paramKeys = Object.keys(params)
    paramKeys.map(key => {
        let value = key=='q' ? encodeURIComponent(params[key]) : params[key];
        url += `&${key}=${value}`;
    })

    // console.log('Final URL: ', url)

    return url;
}



export const apiCall = async (params) => {
    try{
        const response = await axios.get(formatUrl(params))
        const { data } = response
        return { success: true, data }
    }
    catch(err){
        console.log('Error occured: ', err)
        return { success: false, msg: err.message}
    }
} 