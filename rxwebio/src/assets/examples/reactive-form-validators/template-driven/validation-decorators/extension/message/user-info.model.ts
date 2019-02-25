import {  extension, } from   "@rxweb/reactive-form-validators"   

export class UserInfo {

	@extension({extensions:['vcf']  ,message:'You can upload only .vcf files.' }) 
	contactFile: string;
	
	
	

}
