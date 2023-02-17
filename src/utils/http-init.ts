/**
 * Create a axios instance with default configuration
 */

import axios from "axios";

// Define the base URL for the axios instance
const baseURL = 'https://jsonplaceholder.typicode.com'


// Create the axios instance
export default axios.create({
    baseURL: baseURL,
    headers: {
        'Content-type': 'application/json'
    }
})