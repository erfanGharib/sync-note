import { Response } from "express";
import { createHttpError } from "./createHttpError.js";

export const catchServiceErrors = (res: Response, errTitle: string | null, fn: () => void) => {
    try {
        fn();
    } 
    catch(err) {
        const _errTitle = errTitle ? { title: errTitle } : {};
        console.log(err);
        return res.status(500).send(createHttpError(500, {
            ..._errTitle,
            errors: err
        }));
    }
}