import fs from 'fs';
import path from 'path';
import { T_DeleteNote, T_EditNote, T_Note } from '../../../shared/types/T_Note.js';
import { notesFolderPath } from '../global.js';

const resolvePath = (name: string) => {
    const fileName = `${name.trim()}.txt`;
    const filePath = path.join(notesFolderPath, fileName)
    
    return filePath
}

export class NotesService {
    create(body: T_Note) {
        const { text, title } = body;
        const filePath = resolvePath(title)

        if(fs.existsSync(filePath)) 
            throw {
                title: `Create: File already exist with this title \`${title}\``
            }
        
        fs.writeFileSync(filePath, text);
        return 'Text file created successfully.';
    }
    edit(body: T_EditNote) {
        const { text, title, oldTitle } = body;

        const newFilePath = resolvePath(title);
        const oldFilePath = resolvePath(oldTitle)
        
        fs.rmSync(oldFilePath);
        fs.writeFileSync(newFilePath, text);
        return 'Text file edited successfully.';
    }
    delete(body: T_DeleteNote) {
        const filePath = resolvePath(body.title)
        
        fs.rmSync(filePath)
        return 'Note deleted successfully';
    }
    get() {
        const removeExt = (fileName: string) => fileName.replace(path.extname(fileName), '');
        const files = fs.readdirSync(notesFolderPath)
        const json  = files.map((val) => {
            const filePath = resolvePath(removeExt(val));
            return {
                title: removeExt(val),
                text: fs.readFileSync(filePath).toString(),
            }
        })
        
        return json;
    }
}