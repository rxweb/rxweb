import {  dataUri,prop, } from   "@rxweb/reactive-form-validators"   

export class User {

	@prop()
	scheme: string;

	@prop()
	audioDataUri: string;

	@prop()
	videoDataUri: string;

}
