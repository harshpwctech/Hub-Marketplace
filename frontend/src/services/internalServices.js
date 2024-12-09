import { computed, ref } from 'vue';
import { createResource} from "frappe-ui";

const BASE_URI = "https://sit.mytra.money/api/method/";
const GET_CATEGORIES_URI = BASE_URI + "hub_marketplace/get_categories"
const GET_TOP_SELLERS_AND_ITEMS_URI = BASE_URI + "hub_marketplace/get_top_items_sellers"
const GET_ITEMS_URI = BASE_URI + "hub_marketplace/get_items"
const GET_ITEM_URI = BASE_URI + "hub_marketplace/get_item"
const GET_SELLER_URI = BASE_URI + "hub_marketplace/get_seller"
const GET_REVIEWS_URI = BASE_URI + "hub_marketplace/get_reviews"
const IN_WISHLIST_URI = BASE_URI + "hub_marketplace/in_wishlist"
const ADD_TO_WISHLIST_URI = BASE_URI + "hub_marketplace/add_to_wishlist"
const REMOVE_FROM_WISHLIST_URI = BASE_URI + "hub_marketplace/remove_from_wishlist"
const ADD_DOC_URI = BASE_URI + "frappe.client.insert"
const GET_DOC_URI = BASE_URI + "frappe.client.get"
const SAVE_DOC_URI = BASE_URI + "frappe.client.save"
const hubCategories = ref([])

export const internalServices = () => {
    const fetchCategories = async () => {
        if (hubCategories.value.length === 0) {
            await getCategories.fetch();
        }
    };
    const getCategories = createResource({
        url: GET_CATEGORIES_URI,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        auto: false
        },
        onSuccess() {
            hubCategories.value = getCategories.data;
        }
    });
    const getTopSellersAndProducts = createResource({
        url: GET_TOP_SELLERS_AND_ITEMS_URI,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        auto: false
        },
        onError(error) {
            if (execute.error && execute.error.response && execute.error.response._server_messages) {
                // Parse the server messages
                const serverMessages = JSON.parse(execute.error.response._server_messages);
                const parsedMessage = JSON.parse(serverMessages[0]); // Assuming there's only one message
                console.log("Server Error Message:", parsedMessage.message);
                // Throw the extracted message
                throw new Error(parsedMessage.message);
            } else {
                throw new Error("Error in executing request");
            }
        }
    });
    const getItems = createResource({
        url: GET_ITEMS_URI,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        auto: false
        },

    });
    const getItem = createResource({
        url: GET_ITEM_URI,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        auto: false
        },

    });
    const getSeller = createResource({
        url: GET_SELLER_URI,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        auto: false
        },

    });
    const getReviews = createResource({
        url: GET_REVIEWS_URI,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        auto: false
        },
    });
    const addDoc = createResource({
        url: ADD_DOC_URI,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        auto: false
        },
    });
    const getDoc = createResource({
        url: GET_DOC_URI,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        auto: false
        },
    });
    const saveDoc = createResource({
        url: SAVE_DOC_URI_DOC_URI,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        auto: false
        },
    });
    const inWishlist = createResource({
        url: IN_WISHLIST_URI,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        auto: false
        },
    });
    const addToWishlist = createResource({
        url: ADD_TO_WISHLIST_URI,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        auto: false
        },
    });
    const removeFromWishlist = createResource({
        url: REMOVE_FROM_WISHLIST_URI,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        auto: false
        },
    });
    
    return {
        fetchCategories,
        hubCategories,
        getTopSellersAndProducts,
        getItems,
        getItem,
        getSeller,
        getReviews,
        addDoc,
        getDoc,
        saveDoc,
        inWishlist,
        addToWishlist,
        removeFromWishlist
    };
};