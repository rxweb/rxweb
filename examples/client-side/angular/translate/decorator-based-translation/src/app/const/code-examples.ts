export const CODE_EXAMPLE_TITLES: { [key: string]: any } = {
    plainText: 'Plain Text Code Example ',
    conditionalText: 'Condition Text Code Example',
    scopedText: 'Scoped Text Code Example'
}
export const EXAMPLE_TITLES: { [key: string]: any } = {
    json: 'JSON',
    typescript: 'COMPONENT',
    html:'HTML'
}
export const CODE_EXAMPLES: { [key: string]: any } = {
    plainText: {
        json: {
            en: `{
"greetMessage":"Hey! {{day}}, I Hope you are doing well.",
"changeTranslation":"You can change my translation:"
}`
        } ,
        typescript: `
@translate() global:{[key:string]:any}

@translateAsync({...}) languages:any[];

get day(){
  return true ? 'Good Morning' : 'Good Day'; 
}
`,
        html: `<div class="badge badge-warning"> {{global.plainText}}</div>
            `
    },
    scopedText: {
        json: {
            en: `{
"scopedText": "Hey {{name}}!"
}`
        } ,
        typescript: `
  @translate() global:{[key:string]:any};

  name:string = "John";

  changeName(){
    this.name = this.name == "John" ? "Mike" : "John";
  }
`,
        html: `{{global.scopedText}}`
    },
    conditionalText: {
        json: {
            en: `{
"conditionalText": "this.meridiem == 'am' ? 'ante meridiem' : 'post meridiem'"
}`
        },
        typescript: `
  @translate() global:{[key:string]:any};

  meridiem:string = "am";

  changeMeridiem(){
    this.meridiem = this.meridiem == "am" ? "pm" : "am";
  }
`,
        html: `{{global.conditionalText}}`
    }

}
