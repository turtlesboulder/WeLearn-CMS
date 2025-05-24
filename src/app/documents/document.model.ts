export default class Document{
    public id:string;
    public name:string;
    public description:string | null;
    public url:string;
    public children: Document[] | null;

    constructor(id:string, name:string, url:string, description:string = null, children: Document[] = null){
        this.id = id;
        this.name = name;
        this.description = description;
        this.url = url;
        this.children = children;
    }
}