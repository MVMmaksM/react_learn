import { useDispatch } from "react-redux";
import { store } from "../store";

export const get = async(baseUrl, mapQueryParams)=> {
    const fullUrl = baseUrl + '?' + queryParamsToUrlParams(mapQueryParams);
    const responce = await fetch(fullUrl);
    const responceData = await responce.json();

    return responceData;
}

function queryParamsToUrlParams(mapQueryParams){
    let urlParams = ''
    for (let paramKey in mapQueryParams){
        if(mapQueryParams[paramKey]){
            urlParams = urlParams + `${paramKey}=${mapQueryParams[paramKey]}&`
        }
    }

    return urlParams;
}

async function handleFetchError(responce, url){
    const dispatch = store.dispatch();
    if(!responce.ok){
        const error = `Fetch error: url: ${url}, status: ${responce.status}, status text: ${responce.statusText}`

        if(process.env.NODE_ENV === 'development'){
            console.log(error);
        }

        const resp = await responce.json();

        throw error;
    }
}