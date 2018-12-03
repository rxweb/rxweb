import { required ,prop } from "@rxweb/reactive-form-validators";

export class FeedbackModel {
    @prop()
    Id:string = "Abc"
    
    @required({message:'feedback is required.' })
    feedback:string;

    @prop()
    uri:string;
}