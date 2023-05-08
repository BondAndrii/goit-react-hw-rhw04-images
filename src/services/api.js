
const key = '28720978-48527d1c9d73f1bfd555e68c2'; 

async function fetchPictures(name, page) {
    return await fetch(`https://pixabay.com/api/?q=${name}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`)
                .then(response => {
                      if (response.ok) {
                          return response.json();
                      }
                      return Promise.reject(new Error(`Не знайшлась картинка за запитом ${name}`),
                      );
                })
}

const api = {
    fetchPictures,
}

export default api;