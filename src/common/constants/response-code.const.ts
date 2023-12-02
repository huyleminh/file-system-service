export const HTTP_CODE = {
    ok: 200,
    badRequest: 400,
    created: 201,
    noContent: 204,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    internalServerError: 500,
} as const;

export const RESPONSE_CODE = {
    // 400: BAD REQUEST
    validationError: 4001,

    // 401: UNAUTHORIZED

    // 403: FORBIDDEN
} as const;
