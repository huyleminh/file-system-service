import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import * as Joi from "joi";
import { RequestValidationException } from "src/common/exceptions";
import { DeleteMultipleResourceQueryDto } from "../dtos/requests";

const deleteMultipleRersourceSchema = Joi.object({
    pathList: Joi.string()
        .trim()
        .required()
        .custom((value, helpers) => {
            // value is a string
            let pathList: any;
            try {
                pathList = JSON.parse(value);
            } catch (error) {
                pathList = [];
            }

            if (!Array.isArray(pathList)) {
                throw new Error();
            }

            if (pathList.length === 0) {
                throw new Error();
            }

            for (let path of pathList) {
                if (!/^[\/a-zA-Z0-9 _-]+$/.test(path)) {
                    throw new Error();
                }
            }

            return pathList;
        }, "Path list validation")
        .messages({
            "string.empty": "Path list cannot be empty",
            "any.required": "Path list cannot be empty",
            "any.custom": "Path list must be an array of path",
        }),
}).options({ allowUnknown: true, stripUnknown: true });

@Injectable()
export class DeleteMultipleResourceValidationPipe implements PipeTransform<any, DeleteMultipleResourceQueryDto> {
    transform(query: any, _metadata: ArgumentMetadata): DeleteMultipleResourceQueryDto {
        const result = deleteMultipleRersourceSchema.validate(query, { convert: true });

        if (result.error) {
            const {
                error: { message, details },
            } = result;
            throw new RequestValidationException(message, details);
        }

        const { value } = result;
        return value;
    }
}
