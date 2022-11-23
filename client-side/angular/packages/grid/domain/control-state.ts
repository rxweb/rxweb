export class ControlState {
constructor(){
this.controlId = 1;
}    
controlId: number;

    elements: { [key: string]: any } = {};
}