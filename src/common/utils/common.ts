import { Request, Response } from "express";

function getIncomingRequestInfo(request: Request, response: Response) {
    const { ip, method, originalUrl, httpVersion } = request;
    const userAgent = request.get("user-agent") || "";

    const { statusCode } = response;
    const requestId = response.get("X-Request-Id");
    const contentLength = response.get("content-length");

    return [ip, method, originalUrl, `HTTP ${httpVersion}`, statusCode, contentLength, userAgent, requestId];
}

export function sanitizedPathname(pathname: string) {
    let cleanPath = pathname
        .trim()
        .replace(/(^\/+)/, "/")
        .replace(/(\/+$)/, "/")
        .replace(/(\/+)/, "/");

    while (cleanPath.startsWith("/root/")) {
        cleanPath = cleanPath.replace(/^(\/root\/)/, "/");
    }

    if (cleanPath === "/root" || cleanPath === "/") {
        return "/";
    }

    return cleanPath.replace(/^(\/root\/)/, "/");
}

export const Common = {
    getIncomingRequestInfo,
};
