import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import * as Joi from "joi";
import { RequestValidationException } from "src/common/exceptions";
import { CreateResourceBodyDto } from "../dtos/requests";

const createResourceSchema = Joi.object<CreateResourceBodyDto>({
    path: Joi.string()
        .required()
        .trim()
        .pattern(/^[\/a-zA-Z0-9 _-]+$/)
        .messages({
            "any.required": "Path cannot be empty",
            "string.base": "Path cannot be empty",
            "string.empty": "Path cannot be empty",
            "string.pattern.base": "Invalid path syntax",
        }),
    name: Joi.string()
        .required()
        .trim()
        .pattern(/^[a-zA-Z0-9 _-]+$/)
        .messages({
            "any.required": "File/Folder name cannot be empty",
            "string.base": "File/Folder name cannot be empty",
            "string.empty": "File/Folder name cannot be empty",
            "string.pattern.base": "Invalid File/Folder name syntax",
        }),
    data: Joi.string().allow("").optional().messages({
        "string.base": "Data type must be a string",
    }),
    // options: Joi.object({
    //     createMissingFolder: Joi.boolean().required().messages({
    //         "any.required": "Unknown option -p",
    //         "boolean.base": "Unknown option -p",
    //     }),
    // }).optional(),
}).options({ allowUnknown: true, stripUnknown: true });

@Injectable()
export class CreateResourceValidationPipe implements PipeTransform<any, CreateResourceBodyDto> {
    transform(body: any, _metadata: ArgumentMetadata): CreateResourceBodyDto {
        const result = createResourceSchema.validate(body, { convert: true });
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
