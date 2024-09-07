import { computed, ref } from 'vue';
import { createResource} from "frappe-ui";

const BASE_URI = "https://sit.mytra.money/api/method/hub_marketplace/";
const GET_CATEGORIES_URI = BASE_URI + "get_categories"
const GET_TOP_SELLERS_AND_ITEMS_URI = BASE_URI + "get_top_items_sellers"
const GET_ITEMS_URI = BASE_URI + "get_items"
const GET_SELLER_URI = BASE_URI + "get_seller"
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
    const getSeller = createResource({
        url: GET_SELLER_URI,
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
        getSeller
    };
};