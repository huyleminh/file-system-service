import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import * as Joi from "joi";
import { RequestValidationException } from "src/common/exceptions";
import { GetFolderItemsQueryDto } from "../dtos/requests";

const getFolderItemsSchema = Joi.object<GetFolderItemsQueryDto>({
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
}).options({ allowUnknown: true, stripUnknown: true });

@Injectable()
export class GetFolderItemsValidationPipe implements PipeTransform<any, GetFolderItemsQueryDto> {
    transform(query: any, _metadata: ArgumentMetadata): GetFolderItemsQueryDto {
        const result = getFolderItemsSchema.validate(query, { convert: true });

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
