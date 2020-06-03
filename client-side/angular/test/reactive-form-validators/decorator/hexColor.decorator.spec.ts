import { hexColor,  ReactiveFormConfig,RxFormBuilder } from '@rxweb/reactive-form-validators';

export class HexcolorInfo {

	@hexColor() 
	color: string;

	//If you want to apply conditional expression of type 'function'
	@hexColor({conditionalExpression:(x,y) =>x.color == "#AFAFAF" }) 
	footerHexCode: string;

	//If you want to apply conditional expression of type 'string'
	@hexColor({conditionalExpression:'x => x.color == "#AFAFAF"' }) 
	headerHexcolorCode: string;

	@hexColor({message:'Please enter the right format of hexcode for body like "#AFAFAF"' }) 
	bodyHexcolorCode: string;

}




  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "hexColor": "Invalid Hex Color format",
        }
      });
    });

    describe('hexColorDecorator', () => {

	
	  it('should not error in countryName property with null value.',
        () => {
        let formGroup = formBuilder.formGroup(HexcolorInfo);
        expect(formGroup.controls.color.errors).toBeNull();
     });

	 it('should not error in countryName property with null value.',
        () => {
		let hexcolorInfo = new HexcolorInfo();
        hexcolorInfo.color = undefined;
        let formGroup = formBuilder.formGroup(hexcolorInfo);
        expect(formGroup.controls.color.errors).toBeNull();
     });

    it("Should not error, hexColor decorator  Conditional Expression with type 'function'",
        () => {
		let hexcolorInfo = new HexcolorInfo();
		hexcolorInfo.color = '#AFAFAF';
        let formGroup = formBuilder.formGroup(hexcolorInfo);
        formGroup.controls.footerHexCode.setValue('#008083');
        expect(formGroup.controls.footerHexCode.errors).toBeNull();
     });

    it('footerHexCode value should be "#008083".',
        () => {
        let hexcolorInfo = new HexcolorInfo();
        hexcolorInfo.footerHexCode = '#008083';
        let formGroup = formBuilder.formGroup(hexcolorInfo);
        expect(formGroup.controls.footerHexCode.value).toEqual('#008083');
     });
    it("Should not error, hexColor decorator  Conditional Expression with type 'function'",
        () => {
		let hexcolorInfo = new HexcolorInfo();
		hexcolorInfo.color = '#e33514';
        let formGroup = formBuilder.formGroup(hexcolorInfo);
        formGroup.controls.footerHexCode.setValue('#08083');
        expect(formGroup.controls.footerHexCode.errors).toBeNull();
     });



    it("Should error, hexColor decorator Conditional Expression with type 'function'",
        () => {
		let hexcolorInfo = new HexcolorInfo();
		hexcolorInfo.color = '#AFAFAF';
        let formGroup = formBuilder.formGroup(hexcolorInfo);
        formGroup.controls.footerHexCode.setValue('#08083');
        expect(formGroup.controls.footerHexCode.errors).toEqual({'hexColor':{ message: 'Invalid Hex Color format', refValues: [ '#08083' ] } });
     });


    it("Should not error, hexColor decorator  Conditional Expression with type 'string'",
        () => {
		let hexcolorInfo = new HexcolorInfo();
		hexcolorInfo.color = '#AFAFAF';
        let formGroup = formBuilder.formGroup(hexcolorInfo);
        formGroup.controls.headerHexcolorCode.setValue('#008083');
        expect(formGroup.controls.headerHexcolorCode.errors).toBeNull();
     });

    it('headerHexcolorCode value should be "#008083".',
        () => {
        let hexcolorInfo = new HexcolorInfo();
        hexcolorInfo.headerHexcolorCode = '#008083';
        let formGroup = formBuilder.formGroup(hexcolorInfo);
        expect(formGroup.controls.headerHexcolorCode.value).toEqual('#008083');
     });
    it("Should not error, hexColor decorator  Conditional Expression with type 'string'",
        () => {
		let hexcolorInfo = new HexcolorInfo();
		hexcolorInfo.color = '#e33514';
        let formGroup = formBuilder.formGroup(hexcolorInfo);
        formGroup.controls.headerHexcolorCode.setValue('#08083');
        expect(formGroup.controls.headerHexcolorCode.errors).toBeNull();
     });



    it("Should error, hexColor decorator Conditional Expression with type 'string'",
        () => {
		let hexcolorInfo = new HexcolorInfo();
		hexcolorInfo.color = '#AFAFAF';
        let formGroup = formBuilder.formGroup(hexcolorInfo);
        formGroup.controls.headerHexcolorCode.setValue('#08083');
        expect(formGroup.controls.headerHexcolorCode.errors).toEqual({'hexColor':{ message: 'Invalid Hex Color format', refValues: [ '#08083' ] } });
     });



	 it("Should error, hexColor decorator Shows custom message",
        () => {
		let hexcolorInfo = new HexcolorInfo();
        let formGroup = formBuilder.formGroup(hexcolorInfo);
		formGroup.controls.bodyHexcolorCode.setValue('#08083');
        expect(formGroup.controls.bodyHexcolorCode.errors).toEqual({'hexColor':{ message: 'Please enter the right format of hexcode for body like "#AFAFAF"', refValues: [ '#08083' ] } });
     });



	//end
    });
  });
