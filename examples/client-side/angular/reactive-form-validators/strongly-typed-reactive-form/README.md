# Strongly Typed Angular Reactive Form
If you are thinking the reactive form code must be readable, extensible and maintainable without writing more business logic in the Component. Expecting the below problems intuitive solution then I would suggest Class Driven Strongly Typed solution would be the best solution.
Here are the problems in Standard Approach:
1. Not able to easily work on Complex Objects.
2. Lots of ValueChange Subscription required.
3. Code is Scattered in multiple areas like for Value Formatting we are writing code in Directive, Value Change Business Logic some of the code we are writing in Component/Service.
4. Putting Multiple ```*ngIf``` for showing the error messages.
5. Writing Some level of business logic in the Template like showing the error messages based upon the form control state changes.
6. Difficult to handle nested objects complexity in the HTML as well as TS code.
7. Not fully strongly typed.
8. As such, there is no plain model object where we can define properties based upon respective data types and directly map it with reactive form.
9. We can’t map the model object value directly with validations to the reactive form while creating a FormGroup.
Manually configure the validators on every respective property(FormControl).
10. If there is a specific need to perform some other operation based on respective FormControl value change then we have to subscribe to the respective value change of FormControl and do the further activity, which is a bit difficult to manage in large forms.
11 Writing too much code to manage cross-field validation and conditional validation, if there are more than one validator on respective FormControl.

#### How Class Approach is beneficial?
As we all are familiar with OOP practices, the class gives us more flexibility and maintainability of the code. few of the benefits I am highlighting below:

1. Decouple our code.
2. Less Code as compared to the current approach as well as interface-driven approach.
3. We can the Custom Decorators and assign the same on the property.
4. The code is readable, maintainable, and extensible.
5. With this approach, we can don't need to write the business logic in the template, like we are putting the ```*ngIf``` with multiple conditions for showing the error messages. I believe the templates are not meant for writing the business logic.
6. Lot more...

**StackBlitz Example** : [**Open**](https://stackblitz.com/edit/strongly-typed-reactive-form?file=src%2Fapp%2Fstrongly-typed-reactive-form%2Fstrongly-typed-reactive-form.component.ts)

## Component
![image](https://user-images.githubusercontent.com/20392302/84733287-73840b00-afbb-11ea-9c8c-c2de3207f1bf.png)


## HTML
![image](https://user-images.githubusercontent.com/20392302/84733000-b7c2db80-afba-11ea-8188-a5a1f8b1dfa8.png)


