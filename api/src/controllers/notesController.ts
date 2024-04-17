import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { notesFolderPath } from '../../../shared/global.js';
import { T_EditNotes, T_Notes } from '../../../shared/types/T_Notes';
import { createHttpError } from "../utils/createHttpError.js";

const resolvePath = (name: string) => {
    const fileName = `${name.trim()}.txt`;
    const filePath = path.join(notesFolderPath, fileName)
    
    return filePath
}
const catchErrors = (res: Response, errTitle: string, fn: () => void) => {
    try {
        fn();
    } 
    catch(err) {
        console.log(err);
        return res.status(500).send(createHttpError(500, {
            title: errTitle,
            errors: err
        }));
    }
}

export const createNoteController = async ({ body }: { body: T_Notes }, res) => {
    const { text, title } = body;
    const filePath = resolvePath(title)

    if(fs.existsSync(filePath)) 
        return res.status(401).send(createHttpError(401, {
            title: `Create: File already exist with this title \`${title}\``
        }))
    
    catchErrors(res, 'Error creating file', () => {
        fs.writeFileSync(filePath, text);
        return res.status(200).send('Text file created successfully.');
    })
}

export const editNoteController = async ({ body }: { body: T_EditNotes }, res) => {
    const { text, title, oldTitle } = body;

    const newFilePath = resolvePath(title);
    const oldFilePath = resolvePath(oldTitle)
    
    catchErrors(res, 'Error editing file', () => {
        fs.rmSync(oldFilePath);
        fs.writeFileSync(newFilePath, text);
        return res.status(200).send('Text file edited successfully.');
    })
}

export const getNoteController = (req: Request, res: Response) => {
    const removeExt = (fileName: string) => fileName.replace(path.extname(fileName), '');
    const files = fs.readdirSync(notesFolderPath)
    const json  = files.map((val) => {
        const filePath = resolvePath(removeExt(val));
        return {
            title: removeExt(val),
            text: fs.readFileSync(filePath).toString(),
        }
    })
    
    res.send(json);
}

export const deleteNoteController = (req: Request, res: Response) => {
    const filePath = resolvePath(req.body.title)
    
    catchErrors(res, 'Error deleting file', () => {
        fs.rmSync(filePath)
        res.send('Note deleted successfully');
    })
}