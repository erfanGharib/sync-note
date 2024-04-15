import { NextFunction, Request, Response } from "express";
import * as Yup from 'yup';
import { createHttpError } from "../utils/createHttpError.js";

type T_ValidateReqBody = (schema: Yup.ObjectShape) => T_ValidateReqBodyReturn;
type T_ValidateReqBodyReturn = (req: Request, res: Response, next: NextFunction) => void;

export const validateReqBody: T_ValidateReqBody = (schema) => {
    return (req, res, next) => {
        if(!schema) 
            throw Error('no property bound to `this` in `validateReqBody`');
        
        Yup
        .object(schema)
        .validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(({ errors }) => {
            res.status(400).send(createHttpError(400, { errors }))
        })
    }
}