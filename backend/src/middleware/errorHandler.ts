import type {Request, Response, NextFunction} from 'express';

export const errorHandler = (err:Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Error in errorHandler middleware", err.message);
    
    const statusCode = res.statusCode != 200 ? res.statusCode : 500
    res.status(statusCode).json({
        message : err.message || "Internal Server Error",
        ...(process.env.NODE_ENV === "development" && {stack: err.stack})  // Include stack trace in development mode for easier debugging
    })
}

//what does this means that if status code is not 200 then use that status code otherwise use 500 which is internal server error