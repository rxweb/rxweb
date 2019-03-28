import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';

describe('form-data', () => {
    let formbuilder = new RxFormBuilder();

    it('should pass.', () => {
        let userFormGroup: RxFormGroup = <RxFormGroup>formbuilder.group({
            firstName: ['ajay'],
            address: {
                areaName: 'Ahmedabad'
            },
            hobbies: [
                {
                    name: 'Chess'
                }
            ]
        })
        let formData = userFormGroup.toFormData();
        expect(formData.get('firstName')).toEqual('ajay');
        expect(formData.get('address[areaName]')).toEqual('Ahmedabad');
        expect(formData.get('hobbies[0][name]')).toEqual('Chess');
    })
})
