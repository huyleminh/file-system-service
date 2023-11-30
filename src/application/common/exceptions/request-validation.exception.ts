import { BaseException } from "src/core/exceptions";
import { HTTP_CODE, RESPONSE_CODE } from "../constants";

export class RequestValidationException extends BaseException {
    /**
     *
     * @param message Client readable message
     * @param errorDetails Validation error object description
     */
    constructor(message: string, errorDetails: any) {
        super(HTTP_CODE.badRequest, "Validation error", RESPONSE_CODE.validationError, {
            error: message,
            errorDetails,
        });
    }
}
