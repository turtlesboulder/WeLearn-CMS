export default class Contact{

    public id:string;
    public name:string;
    public email:string;
    public phone:string;
    public imageUrl:string;
    public group:Contact [] | null;

    constructor(id:string, name:string, email:string, phone:string, imageUrl:string, group:Contact [] | null = null){
        // Usually I like to be explicit rather than use shortcuts
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.imageUrl = imageUrl;
        this.group = group;
    }
}