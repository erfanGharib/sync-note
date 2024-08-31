import { Response } from "express";
import * as Yup from 'yup';
import { create_apiCommandSchema, delete_apiCommandSchema, edit_apiCommandSchema } from "../../../shared/schemas/apiCommandSchema.js";
import { T_ApiCommand } from "../../../shared/types/T_ApiCommand.js";
import { CommandsService } from "../services/commandsService.js";
import { catchServiceErrors } from "../utils/catchServiceErrors.js";
import { createHttpError } from "../utils/createHttpError.js";
import { isJson } from "../utils/isJson.js";

const commandsService = new CommandsService();

type T_Body = {
    body: {
        commands: string
    }
}

const schemas = {
    'create': create_apiCommandSchema,
    'edit': edit_apiCommandSchema,
    'delete': delete_apiCommandSchema,
}

export const commandsController = async ({ body }: T_Body, res: Response) => {
    const promises = []
    const commands = isJson(body.commands) as Array<T_ApiCommand>;
    
    for (let index = 0; index < commands.length; index++) {
        await new Promise((resolve, reject) => {
            const _body = commands[index];
            const schema = schemas[_body.type];
            
            if(!schema) 
                return res.status(400).send(
                    createHttpError(400, { 
                        title: `Invalid Schema Type`, 
                        errors: `Schema type must be \`edit\` || \`create\` || \`delete\`` 
                    })
                )
                
            Yup
            .object(schema)
            .validate(commands[index], { abortEarly: false })
            .then(() => {
                catchServiceErrors(res, null, () => {
                    resolve(commandsService[_body.type](_body.content))
                })
            })
            .catch(({ errors }) => {
                console.log(errors);
                res.status(400).send(createHttpError(400, { errors }))
            })
        })
    }
}