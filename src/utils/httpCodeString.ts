const HTTP_CODE_STRING = {
    "FETCH_ERROR": 'Lost internet connection',
    "PARSING_ERROR": 'Unable to parse API response. Please check the response format or responseHandler function',
    "TIMEOUT_ERROR": "Request timed out",
    "CUSTOM_ERROR": "A custom error type that you can return from your queryFn where another error might not make sense",
}

export default HTTP_CODE_STRING