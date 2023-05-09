import axios from "axios";
const key = '28720978-48527d1c9d73f1bfd555e68c2'; 

async function fetchPictures(name, page) {
    return  await axios.get(`https://pixabay.com/api/?q=${name}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`).then(
        response => {
            console.log("responce", response)
            console.log("responce.ok", response.data.total)
            
            if (response.data.total > 0) {                
                return response;
            }
            return Promise.reject(new Error(`Не знайшлась картинка за запитом ${name}`),);
        }
    ) 
}

export const api = {
    fetchPictures,
}

export default api;