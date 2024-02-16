import axios from "axios";

export async function getCategories(url, dispatch) {
    try {
        dispatch({ type: "FETCHING_CATEGORIES_DATA" })
        const res = await axios.get(url)
        dispatch({ type: "FETCHED_CATEGORIES_DATA", payload: res.data })

    }
    catch (err) {
        dispatch({ type: "ERROR_CATEGORIES_DATA" })

    }
}

export async function getProducts(url, dispatch) {
    try {
        dispatch({ type: "FETCHING_PRODUCTS_DATA" })
        const res = await axios.get(url)
        dispatch({ type: "FETCHED_PRODUCTS_DATA", payload: res.data })

    }
    catch (err) {
        dispatch({ type: "ERROR_PRODUCTS_DATA" })

    }
}

export async function postCategory(url, data) {
    axios.get(url, data)

}