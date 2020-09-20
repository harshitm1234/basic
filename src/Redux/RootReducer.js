export const rootReducer = function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "URL_SET": {
            return {
                ...state,
                url: payload.url,
            }
        }
        case "LENGTH_SET": {
            return {
                ...state,
                url: payload.url,
            }
        }
        default : {
            return {
                ...state
            }
        }
    }
};

const initialState = {
    queryLength: 16,
    url: "",
};
