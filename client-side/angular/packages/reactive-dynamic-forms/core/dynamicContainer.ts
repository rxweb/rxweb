import { OverrideConfigProp } from "../models/interface/override-config-prop";

export const dynamicContainer:
    {
        registerComponent(name: string, target: any): void,
        registerOverrideProp(props:{[key:string]:OverrideConfigProp}),
        getOverrideProp(name:string):OverrideConfigProp
        getComponent(name: string): { name: string, instance: any };
    } = new (class {
        private components: Array<{ name: string, instance: any}>  = [];
        private overrideProps:any = {};
        registerComponent(name:string,target: any):void {
            let componentContainer = this.components.filter(component => component.instance == target)[0]
            if (!componentContainer)
                this.components.push({ instance: target, name: name});
        }

        registerOverrideProp(props:{[key:string]:OverrideConfigProp}){
            if(props)
                Object.keys(props).forEach(t=>this.overrideProps[t] = props[t]);
        }

        getOverrideProp(name:string):OverrideConfigProp{
            return this.overrideProps[name];
        }    

        getComponent(name: string): { name: string, instance: any } {
            return this.components.filter(component => component.name == name)[0]
        }

})();
