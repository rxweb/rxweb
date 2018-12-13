import {  image,prop, } from "@rxweb/reactive-form-validators"

export class UserInfo {

	@prop()
	imageType: string;

	@prop()
	profilePhoto: string;

	@prop()
	signature: string;

	@prop()
	identityCard: string;

	@prop()
	drivinglicense: string;

	@prop()
	aadharCard: string;

	@prop()
	residenceProof: string;

}
