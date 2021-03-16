export function safeString(str:string|undefined):string{
    if(str===undefined){
        return "undefined"
    }
    return str
}