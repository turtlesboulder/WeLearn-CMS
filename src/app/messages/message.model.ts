import Contact from "../contacts/contact.model";

export default class Message{
    public id:number;
    public subject:string;
    public msgText:string;
    public sender:Contact;
    
    constructor(id:number, subject:string, msgText:string, sender:Contact){
        this.id = id;
        this.subject = subject;
        this.msgText = msgText;
        this.sender = sender;
    }
}
