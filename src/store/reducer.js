export const initialState = {
    categories: [],
    products: [],
    isCategoriesLoading: true,
    isProductsLoading: true,
}

export function reducer(state, action) {
    switch (action.type) {
        case "FETCHING_CATEGORIES_DATA":
            return {
                ...state,
                isCategoriesLoading: true,
            }
        case "FETCHED_CATEGORIES_DATA":
            return {
                ...state,
                categories: action.payload,
                isCategoriesLoading: false,
            }
        case "ERROR_CATEGORIES_DATA":
            return {
                ...state,
                isCategoriesLoading: false,
            }
        case "FETCHING_PRODUCTS_DATA":
            return {
                ...state,
                isProductsLoading: true,
            }
        case "FETCHED_PRODUCTS_DATA":
            return {
                ...state,
                products: action.payload,
                isProductsLoading: false,
            }
        case "ERROR_PRODUCTS_DATA":
            return {
                ...state,
                isProductsLoading: false,
            }
        default: return state
    }
}