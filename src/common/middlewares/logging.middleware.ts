import { NextFunction, Request, Response } from "express";


export function loggingMiddleware(request: Request, response: Response, next: NextFunction) {
    console.log("LOG: ", request.method, request.url, request.body);
    next();
}