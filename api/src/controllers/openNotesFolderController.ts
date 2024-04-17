import open from "open"
import { notesFolderPath } from "../../../shared/global.js"
import { createHttpError } from "../utils/createHttpError.js"

export const openNotesFolderController = (req, res) => {
    try {
        open(notesFolderPath)
        res.sendStatus(200)
    } catch(err) {
        res.status(500).send(createHttpError(500, { errors: err }))
    }
}