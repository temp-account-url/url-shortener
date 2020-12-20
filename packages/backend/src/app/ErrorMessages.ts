import { IErrorMessage } from "./interfaces/IErrorMessage";

export const errors: Record<string, IErrorMessage> = {
    critical_error: {
        errorCode: 99,
        message: "Critical error",
    },
    url_not_valid: {
        errorCode: 100,
        message: "Provided URL is not valid",
    },
    auth_data_not_acceptable: {
        errorCode: 101,
        message: "Link with auth data not accepted",
    },
    link_not_found: {
        errorCode: 102,
        message: "Link not found",
    },
    self_link: {
        errorCode: 103,
        message: "Link to this service not accepted",
    },
};
