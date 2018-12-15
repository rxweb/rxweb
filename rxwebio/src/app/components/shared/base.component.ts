import { ComponentView } from "src/app/domain/view";
import { ViewContainerRef,OnDestroy } from "@angular/core";
import { ComponentFactoryResolver } from "@angular/core";
import { Input } from "@angular/core";
import { Inject } from "@angular/core";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";

export abstract class BaseComponentProvider implements OnDestroy {

    viewContainerRef:ViewContainerRef;
    componentFactoryResolver:ComponentFactoryResolver;
    private exampleComponents:{ [key: string]: any }

    element: HTMLElement;
    componentViews:ComponentView<any>[] = new Array<ComponentView<any>>();
    
    @Input() data: { [key: string]: any };
    @Input() set typeName(value:string){
        this._typeName = value.replace("-","_");
    };
    get typeName():string
    {
        return this._typeName;
    }
    @Input() templateDrivenType:string;
    @Input() tabArray: any;

    _typeName:string;
    constructor(viewContainerRef:ViewContainerRef,componentFactoryResolver:ComponentFactoryResolver,
    @Inject(COMPONENT_EXAMPLE) exampleComponents: { [key: string]: any }
    ){

        this.viewContainerRef = viewContainerRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.exampleComponents = exampleComponents;
    }

    create(component:any,params:{[key:string]:any}):any{
        let componentView = new ComponentView(component, this.viewContainerRef, this.componentFactoryResolver);
        componentView.create(params);
        this.componentViews.push(componentView);
        return componentView;
    }

    getPramas(element:any,type?:string){
        let keyName = element.getAttribute("key");
        let refComponentString= element.getAttribute('ref-component');
        let params = {};
        let jObject ={};
        if(!keyName && refComponentString){
            let refComponent = refComponentString.split('-');
            keyName = refComponent[refComponent.length - 1];
            jObject = this.getKeyData(keyName);
            params["showTab"] = false;
        }
        else{
            params["showTab"] = true;
            jObject = this.getKeyData(keyName);
        }
        params["content"] = jObject;
        if(refComponentString){
            let refComponent = refComponentString.split('-');
            params["title"] = element.getAttribute('title');
            if(this.typeName == "template_driven" )
                params["refComponent"] =this.exampleComponents[this.typeName+"_validation_" + this.templateDrivenType][refComponent[refComponent.length - 1]];
            else
                params["refComponent"] =this.exampleComponents[this.typeName][refComponent[refComponent.length - 1]];
            params["decoratorName"]=refComponent[1];
            params["exampleName"]=refComponent[2];
            params["templateDrivenType"] = this.templateDrivenType;
            switch(this.typeName){
                case "validators":
                    params["typeName"]="validator";
                break;
                case "decorators":
                    params["typeName"]="decorator";
                break;
                case "template_driven":
                    params["typeName"]="templateDriven";
                break;
            }
        }
        if(type == "app-tabs"){
            params["content"] = this.data;
            params["typeName"] = this.typeName;
            params["tabArray"] = this.tabArray[keyName];
            params["templateDrivenType"] = this.templateDrivenType;
        }
        return params;
    }

    private getKeyData(keyName:string){
      
    let jObject = undefined;
            if (keyName != undefined) {
                var splitedArray = keyName.split('-');
                splitedArray.forEach(t => {
                    if (this.data) {
                        if (jObject)
                            jObject = jObject[t];
                        else
                            jObject = this.data[t];
                    }
                })
            }

    return jObject;
    }

    ngOnDestroy(){
            this.componentViews.forEach(t=>{
                t.destroy();
            })
            this.componentViews = new Array<ComponentView<any>>();
    }
}