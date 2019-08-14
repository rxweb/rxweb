export const dynamicContainer:
    {
        registerComponent(name: string, target: any): void,
        getComponent(name: string): { name: string, instance: any };
    } = new (class {
        private components: Array<{ name: string, instance: any}>  = [];

        registerComponent(name:string,target: any):void {
            let componentContainer = this.components.filter(component => component.instance == target)[0]
            if (!componentContainer)
                this.components.push({ instance: target, name: name});
        }

        getComponent(name: string): { name: string, instance: any } {
            return this.components.filter(component => component.name == name)[0]
        }

})();
