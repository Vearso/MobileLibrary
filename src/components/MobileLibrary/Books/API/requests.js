import {API_KEY, VOLUMES_URL, ID_URL} from "./constants";
/*  max_results=30
*   projection=lite*/

export const getVolumes = (successCallback, search, searchBy) => {
    fetch(`${VOLUMES_URL}${searchBy}:${search}&max_results=40&key=${API_KEY}`
    )
        .then(response => response.json())
        .then(result => {
            let data =[];
            for (let item of result.items) {
                data = [...data, {
                    id: item.id,
                    authors: item.volumeInfo.authors || 'No authors available',
                    title: item.volumeInfo.title || 'No title available',
                    genre: item.volumeInfo.categories || 'No genre available',
                    description: item.volumeInfo.description || 'No description available',
                    imageLinks: item.volumeInfo.imageLinks || 'No image available',
                    read: false,
                    favorite: false,
                }];
            }
            successCallback(data);
        })
        .catch(err => console.warn(err));
}
export const getVolumeByID = (successCallback,id) => {
    fetch(`${ID_URL}${id}`)
        .then(r => r.json())
        .then(result => {
            let data = {
                id: result.id,
                authors: result.volumeInfo.authors || 'No authors available',
                title: result.volumeInfo.title || 'No title available',
                genre: result.volumeInfo.categories || 'No genre available',
                description: result.volumeInfo.description || "No description available",
                imageLinks: result.volumeInfo.imageLinks || "No photo available",
                read: false,
                favorite: false,
            };
            if(result && typeof successCallback === 'function'){
                successCallback(data)
            }
        })
}
export const getGenre = (successCallback, genre) => {
    fetch()
}
export const getFavorites = (successCallback) => {

}