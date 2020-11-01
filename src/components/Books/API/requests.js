import {PROXY_URL, API_KEY, VOLUMES_URL, ID_URL} from "./constants";
/*  max_results=30
*   projection=lite*/

export const getVolumesByAuthor = (successCallback, search) => {
    fetch(`${VOLUMES_URL}inauthor:${search}&max_results=40&key=${API_KEY}`
    )
        .then(response => response.json())
        .then(result => {
            let data =[];
            for (let item of result.items) {
                data = [...data, {
                    id: item.id,
                    authors: item.volumeInfo.authors,
                    title: item.volumeInfo.title,
                    genre: item.volumeInfo.categories,
                    description: item.volumeInfo.description,
                    imageLinks: item.volumeInfo.imageLinks,
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
                authors: result.volumeInfo.authors,
                title: result.volumeInfo.title,
                genre: result.volumeInfo.categories,
                description: result.volumeInfo.description,
                imageLinks: result.volumeInfo.imageLinks,
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