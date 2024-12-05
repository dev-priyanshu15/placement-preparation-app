import { NextFunction, Request, Response } from "express";

/**
 * Higher-order function that wraps an asynchronous request handler to catch and forward errors to the next middleware.
 * @param {Function} theFunc - The asynchronous request handler function to be wrapped.
 * @returns {Function} A new function that wraps the original handler with error catching functionality.
 */
const CatchAsyncError= (theFunc: any) => (req:Request, res:Response, next:NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
}
export default CatchAsyncError;