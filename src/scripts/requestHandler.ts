import axios from 'axios'

const requestBase = 'https://www.thecocktaildb.com/api/json/v1/1/'

export default function(requestRoute: string) {
    const requestPrefix = `${requestBase}${requestRoute}`;
    return async function(arg?: string) {
        const request = !!arg ? `${requestPrefix}=${arg}` : requestPrefix;
        try {
            const response = await axios.get(request)
            return response.data;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.warn(`Server error during get request: ${error}`)
            }
            else {
                console.error(`Unexpected error during get request: ${error}`)
            }
        }
    }
}
