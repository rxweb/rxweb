import { FormArray  } from "@angular/forms"
import { RxFormBuilder, RxFormGroup, RxFormArray,prop, propObject, propArray } from '@rxweb/reactive-form-validators';
export class ContactMechanism {
    @prop()
    streetAddress: string;

    @prop()
    city: string;
}


export class Facility {
    @prop()
    id: number;

    @prop()
    name: string;

    @propArray() facilityContactMechanisms: FacilityContactMechanism[];
}


export class FacilityContactMechanism {
    @propObject(ContactMechanism) contactMechanism: ContactMechanism;
}
export class Hobby {

    @prop()
    name: string;
}

export class Address {

    @prop()
    name: string;
}

export class User {


    private _firstName: string;

    @prop()
    get firstName() {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    @propObject(Address)
    address: Address;

    @propArray(Hobby)
    hobbies:Hobby[]
}

export class Department {

    @prop({ isPrimaryKey: true })
    departmentId: number;

    @prop()
    departmentName: string;
}

export class WorkHistory {
    @prop({ isPrimaryKey: true })
    id: number;

    @prop()
    name: string;
}
export class Employee{

    @prop({ isPrimaryKey:true })
    employeeId: number;

    @prop()
    employeeName: string;

    @propObject(Department)
    department: Department;

    @propArray(WorkHistory)
    workHistory: WorkHistory[]
}




 describe('modified-value',()=>{
     let formBuilder = new RxFormBuilder();
     beforeEach(() => {});
      it('should pass, should be available firstname value in "modifiedValue" property',()=>{
            let user = new User();
            let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
            userFormGroup.controls.firstName.setValue("Ajay");
            expect((<RxFormGroup>userFormGroup).modifiedValue).toEqual({firstName:'Ajay'});
     })

      it('should pass, a should not be available "firstName" value in "modifiedValue" property', () => {
          let user = new User();
          user.firstName = "Ajay";
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
          expect((<RxFormGroup>userFormGroup).modifiedValue).toEqual({});
      })

      it('should pass', () => {
          let user = new User();
          user.firstName = "Ajay";
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
          expect(userFormGroup.controls.firstName.value).toEqual("Ajay");
          expect((<RxFormGroup>userFormGroup).modifiedValue).toEqual({});
          userFormGroup.controls.firstName.setValue("Ajai");
          expect((<RxFormGroup>userFormGroup).modifiedValue).toEqual({ firstName: 'Ajai' });
          userFormGroup.controls.firstName.setValue("Ajay");
          expect((<RxFormGroup>userFormGroup).modifiedValue).toEqual({});
      })

      it('should pass, Nested formgroup modified value', () => {
          let user = new User();
          user.address = new Address();
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
          let addressFormGroup = <RxFormGroup>userFormGroup.controls.address
          addressFormGroup.controls.name.setValue("St. Road");
          expect((<RxFormGroup>addressFormGroup).modifiedValue).toEqual({ name: 'St. Road' });
          expect((<RxFormGroup>userFormGroup).modifiedValue).toEqual({ address: { name: 'St. Road' } });
      })

      

      it('should pass, Nested FormArray modified value', () => {
          let user = new User();
          user.hobbies = new Array<Hobby>();
          user.hobbies.push(new Hobby());
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
          let hobbiesFormArray = <RxFormArray>userFormGroup.controls.hobbies
          let hobbyFormGroup = <RxFormGroup>hobbiesFormArray.controls[0];
          hobbyFormGroup.controls.name.setValue("Chess");
          expect((<RxFormGroup>hobbyFormGroup).modifiedValue).toEqual({ name: "Chess" });
          expect((<RxFormGroup>userFormGroup).modifiedValue).toEqual({ hobbies: [{name:"Chess"}]});
      })

      it('should pass, should be available employeeName value in "modifiedValue" as well as employeeId property', () => {
          let employee = new Employee();
          employee.employeeId = 1;
          let employeeFormGroup = <RxFormGroup>formBuilder.formGroup(employee);
          employeeFormGroup.controls.employeeName.setValue("Ajay");
          expect((<RxFormGroup>employeeFormGroup).modifiedValue).toEqual({ employeeId:1, employeeName: 'Ajay' });
      })

      it('should pass, Nested formgroup modified value with primary key value', () => {
          let employee = new Employee();
          employee.department = new Department();
          employee.department.departmentId = 1;
          let employeeFormGroup = <RxFormGroup>formBuilder.formGroup(employee);
          let departmentFormGroup = <RxFormGroup>employeeFormGroup.controls.department
          departmentFormGroup.controls.departmentName.setValue("Technical");
          expect((<RxFormGroup>departmentFormGroup).modifiedValue).toEqual({ departmentId:1, departmentName: 'Technical' });
          expect((<RxFormGroup>employeeFormGroup).modifiedValue).toEqual({ department: { departmentId: 1,departmentName: 'Technical' } });
      })

      it('should pass, Nested FormArray modified value with primary key value', () => {
          let employee = new Employee();
          employee.workHistory = new Array<WorkHistory>();
          let workHistory = new WorkHistory();
          workHistory.id = 1;
          employee.workHistory.push(workHistory);
          let employeeFormGroup = <RxFormGroup>formBuilder.formGroup(employee);
          let workHistoryFormArray = <RxFormArray>employeeFormGroup.controls.workHistory
          let workHistoryformGroup = <RxFormGroup>workHistoryFormArray.controls[0];
          workHistoryformGroup.controls.name.setValue("ABC Corp");
          expect((<RxFormGroup>workHistoryformGroup ).modifiedValue).toEqual({id:1, name: "ABC Corp" });
          expect((<RxFormGroup>employeeFormGroup).modifiedValue).toEqual({ workHistory: [{id:1, name: "ABC Corp" }] });
      })


     //bug fix #180
      it('should pass blank modified value object', () => {
          let facility = new Facility();
          facility.name = "Store 1";
          facility.facilityContactMechanisms = new Array<FacilityContactMechanism>();


          let facilityFormGroup = <RxFormGroup>formBuilder.formGroup(facility);

          let contactMechanism = new ContactMechanism();
          contactMechanism.streetAddress = "Lincoln In";
          contactMechanism.city = "New York";

          let facilityContactMechanisms: FormArray = facilityFormGroup.controls.facilityContactMechanisms as FormArray;

          let contactMechanismFormGroup = formBuilder.formGroup(contactMechanism) as RxFormGroup;

          facilityContactMechanisms.push(contactMechanismFormGroup);
          facilityFormGroup.commit();
          expect(facilityFormGroup.modifiedValue).toEqual({});
          contactMechanismFormGroup.controls.streetAddress.setValue("Lincoln");
          expect(facilityFormGroup.modifiedValue).toEqual({ facilityContactMechanisms: [{ streetAddress: "Lincoln" }] });
          contactMechanismFormGroup.controls.streetAddress.setValue("Lincoln In");
          expect(facilityFormGroup.modifiedValue).toEqual({});
      })


})
