import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { textFilesPath } from '../../../shared/global.js';
import { T_Notes } from '../../../shared/types/T_Notes';
import { createHttpError } from "../utils/createHttpError.js";

export const createNoteController = async ({ body }: { body: T_Notes }, res) => {
    const { text, title } = body;
    const fileName = `${title.trim()}.txt`;
    const filePath = path.join(textFilesPath, fileName)

    if(fs.existsSync(filePath)) 
        res.status(401).send(createHttpError(401, {
            title: `Create: File already exist with this title \`${title}\``
        }))
    
    try {
        fs.writeFileSync(filePath, text);
        console.log('Text file created successfully:', fileName);
        res.status(200).send('Text file created successfully.');
    } 
    catch(err) {
        console.log(err);        
        return res.status(500).send(createHttpError(500, {
            title: 'Error creating text file: ' + err
        }));
    }
}

export const getNoteController = (req: Request, res: Response) => {
    const removeExt = (fileName: string) => fileName.replace(path.extname(fileName), '');
    const files = fs.readdirSync(textFilesPath)
    const json  = files.map((val) => ({
        title: removeExt(val),
        text: fs.readFileSync(path.join(textFilesPath, val)).toString(),
    }))

    res.send(json);
}

export const deleteNoteController = (req: Request, res: Response) => {
    const fileName = `${req.body.title.trim()}.txt`;
    
    try {
        fs.rmSync(path.join(textFilesPath, fileName))
        res.send('Note deleted successfully');
    } 
    catch(err) {
        console.log(err);
        res.status(404).send(createHttpError(404, { 
            title: `Delete: File Not Found \`${fileName}\`` 
        }))
    }
}