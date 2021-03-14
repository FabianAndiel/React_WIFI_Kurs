import axios from 'axios';

export const fetchData = async (url,callback) =>{

    const response = await axios(url);
    callback(response.data);

}
