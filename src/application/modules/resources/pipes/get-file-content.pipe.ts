import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { GetFileContentQueryDto } from "../dtos/requests";
import * as Joi from "joi";
import { RequestValidationException } from "src/common/exceptions";

const getFileContentSchema = Joi.object<GetFileContentQueryDto>({
    filePath: Joi.string()
        .required()
        .trim()
        .pattern(/^[\/a-zA-Z0-9 _-]+$/)
        .messages({
            "any.required": "File path cannot be empty",
            "string.base": "File path cannot be empty",
            "string.empty": "File path cannot be empty",
            "string.pattern.base": "Invalid file path syntax",
        }),
}).options({ allowUnknown: true, stripUnknown: true });

@Injectable()
export class GetFileContentValidationPipe implements PipeTransform<any, GetFileContentQueryDto> {
    transform(query: any, _metadata: ArgumentMetadata): GetFileContentQueryDto {
        const result = getFileContentSchema.validate(query, { convert: true });

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
