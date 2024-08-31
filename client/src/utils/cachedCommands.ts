import { T_ApiCommand } from "../../../shared/types/T_ApiCommand";

export class CachedCommands {
    static name = 'cached-commands'

    constructor() {
        this._checkRecordExistence()
    }

    private _checkRecordExistence() {
        if(
            Array.isArray(
                JSON.parse(
                    localStorage.getItem(CachedCommands.name)
                )
            )
        ) return;

        localStorage.setItem(CachedCommands.name, JSON.stringify([]))
    }
    add(item: T_ApiCommand) {
        // prevent adding duplicate create command
        if(this.getItem(item.content.title)?.item?.type === 'create') return;

        const { title } = item.content;

        if(this.getItem(title).index) 
            throw Error(`CachedCommandsError: Item already exist with this title: \`${title}\``);

        const commandsCp = [...this.get()];
        commandsCp.push(item)

        localStorage.setItem(CachedCommands.name, JSON.stringify(commandsCp))
    }
    edit(item: T_ApiCommand) {
        if(!('oldTitle' in item.content)) 
            throw new Error(`no oldTitle in item: ${item}`);

        this.add(item)
    }
    rem(title: string) {
        if(this.getItem(title)?.item?.type === 'delete') 
            throw new Error(`item already deleted. title: ${title}`);

        this.add({
            type: 'delete',
            content: {
                title
            }
        })
    }
    remAll() {
        localStorage.removeItem(CachedCommands.name)
    }
    get(): Array<T_ApiCommand> {
        return JSON.parse(localStorage.getItem(CachedCommands.name))
    }
    getItem(title: string): { index: number, item: T_ApiCommand } {
        let index = null;
        const commandsCp = [...this.get()];
        const item = commandsCp.filter((val, i) => {
            if(val.content.title === title) {
                index = i;
                return true;
            }
        })

        return {
            index,
            item: item[0]
        }
    }
}