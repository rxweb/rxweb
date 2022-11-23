import {  FormControl} from '@angular/forms';

import { IpVersion ,RxwebValidators, ReactiveFormConfig } from '@rxweb/reactive-form-validators';


  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "ip": "ip address allowed",
        }
      });
    });

    describe('ipValidator', () => {

      it('should not error on an empty string.',
        () => {
          expect(RxwebValidators.ip({ version: IpVersion.V4 })(new FormControl(''))).toBeNull();
        });

      it('should not error on null.',
        () => {
          expect(RxwebValidators.ip({ version: IpVersion.V4 })(new FormControl(null))).toBeNull();
        });

      it('should not error on undefined.',
        () => {
          expect(RxwebValidators.ip({ version: IpVersion.V4 })(new FormControl(undefined))).toBeNull();
        });



      it('should not error positive ip v4 numbers.',
        () => {
            expect(RxwebValidators.ip({ version: IpVersion.V4 })(new FormControl("8.8.8.8"))).toBeNull();
        });

      

      it('should error negative ip v4 numbers.',
        () => {
          expect(RxwebValidators.ip({ version: IpVersion.V4 })(new FormControl("100..100.100.100."))).toEqual({ 'ip': { message: "ip address allowed", refValues: ["100..100.100.100."] } });
        });

      it('should not error positive ip v6 numbers.',
        () => {
            expect(RxwebValidators.ip({ version: IpVersion.V6 })(new FormControl('2001:0000:1234:0000:0000:C1C0:ABCD:0876'))).toBeNull();
        });

      it('should error negative ip v6 numbers.',
        () => {
          expect(RxwebValidators.ip({ version: IpVersion.V6 })(new FormControl(':2001:0000:1234:0000:0000:C1C0:ABCD:0876'))).toEqual({ 'ip': { message: "ip address allowed", refValues: [':2001:0000:1234:0000:0000:C1C0:ABCD:0876'] } });
        });

      it('should not error positive ip v4 numbers with valid cidr.',
        () => {
          expect(RxwebValidators.ip({ version: IpVersion.V4,isCidr:true })(new FormControl("8.8.8.8/24"))).toBeNull();
        });

      it('should not error positive ip v4 numbers with invalid cidr.',
        () => {
          expect(RxwebValidators.ip({ version: IpVersion.V4, isCidr: true })(new FormControl("8.8.8.8/34"))).toEqual({ 'ip': { message: "ip address allowed", refValues: ["8.8.8.8/34"] } });
        });

      it('should not error positive ip v6 numbers with valid cidr.',
        () => {
          expect(RxwebValidators.ip({ version: IpVersion.V6, isCidr: true })(new FormControl("2001:4860:4860::8888/32"))).toBeNull();
        });

      it('should not error positive ip v6 numbers with invalid cidr.',
        () => {
          expect(RxwebValidators.ip({ version: IpVersion.V6, isCidr: true })(new FormControl("2001:4860:4860::8888/129"))).toEqual({ 'ip': { message: "ip address allowed", refValues: ["2001:4860:4860::8888/129"] } });
        });

      //end
    });
  });
