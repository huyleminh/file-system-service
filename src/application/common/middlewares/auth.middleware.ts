import { NextFunction, Request, Response } from "express";

/**
 * @description Checking authentication information
 */
export function authMiddleware(_req: Request, _res: Response, next: NextFunction) {
    next();
}
