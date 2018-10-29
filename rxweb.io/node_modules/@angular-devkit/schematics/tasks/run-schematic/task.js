"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("./options");
class RunSchematicTask {
    constructor(c, s, o) {
        if (arguments.length == 2 || typeof s !== 'string') {
            o = s;
            s = c;
            c = null;
        }
        this._collection = c;
        this._schematic = s;
        this._options = o;
    }
    toConfiguration() {
        return {
            name: options_1.RunSchematicName,
            options: {
                collection: this._collection,
                name: this._schematic,
                options: this._options,
            },
        };
    }
}
exports.RunSchematicTask = RunSchematicTask;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvc2NoZW1hdGljcy90YXNrcy9ydW4tc2NoZW1hdGljL3Rhc2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQSx1Q0FBc0U7QUFHdEU7SUFRRSxZQUFZLENBQWdCLEVBQUUsQ0FBYSxFQUFFLENBQUs7UUFDaEQsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDbEQsQ0FBQyxHQUFHLENBQU0sQ0FBQztZQUNYLENBQUMsR0FBRyxDQUFXLENBQUM7WUFDaEIsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUNWO1FBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFXLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFNLENBQUM7SUFDekIsQ0FBQztJQUVELGVBQWU7UUFDYixPQUFPO1lBQ0wsSUFBSSxFQUFFLDBCQUFnQjtZQUN0QixPQUFPLEVBQUU7Z0JBQ1AsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXO2dCQUM1QixJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVU7Z0JBQ3JCLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUTthQUN2QjtTQUNGLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUE5QkQsNENBOEJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgVGFza0NvbmZpZ3VyYXRpb24sIFRhc2tDb25maWd1cmF0aW9uR2VuZXJhdG9yIH0gZnJvbSAnLi4vLi4vc3JjJztcbmltcG9ydCB7IFJ1blNjaGVtYXRpY05hbWUsIFJ1blNjaGVtYXRpY1Rhc2tPcHRpb25zIH0gZnJvbSAnLi9vcHRpb25zJztcblxuXG5leHBvcnQgY2xhc3MgUnVuU2NoZW1hdGljVGFzazxUPiBpbXBsZW1lbnRzIFRhc2tDb25maWd1cmF0aW9uR2VuZXJhdG9yPFJ1blNjaGVtYXRpY1Rhc2tPcHRpb25zPFQ+PiB7XG4gIHByb3RlY3RlZCBfY29sbGVjdGlvbjogc3RyaW5nIHwgbnVsbDtcbiAgcHJvdGVjdGVkIF9zY2hlbWF0aWM6IHN0cmluZztcbiAgcHJvdGVjdGVkIF9vcHRpb25zOiBUO1xuXG4gIGNvbnN0cnVjdG9yKHM6IHN0cmluZywgbzogVCk7XG4gIGNvbnN0cnVjdG9yKGM6IHN0cmluZywgczogc3RyaW5nLCBvOiBUKTtcblxuICBjb25zdHJ1Y3RvcihjOiBzdHJpbmcgfCBudWxsLCBzOiBzdHJpbmcgfCBULCBvPzogVCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDIgfHwgdHlwZW9mIHMgIT09ICdzdHJpbmcnKSB7XG4gICAgICBvID0gcyBhcyBUO1xuICAgICAgcyA9IGMgYXMgc3RyaW5nO1xuICAgICAgYyA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5fY29sbGVjdGlvbiA9IGM7XG4gICAgdGhpcy5fc2NoZW1hdGljID0gcyBhcyBzdHJpbmc7XG4gICAgdGhpcy5fb3B0aW9ucyA9IG8gYXMgVDtcbiAgfVxuXG4gIHRvQ29uZmlndXJhdGlvbigpOiBUYXNrQ29uZmlndXJhdGlvbjxSdW5TY2hlbWF0aWNUYXNrT3B0aW9uczxUPj4ge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBSdW5TY2hlbWF0aWNOYW1lLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjb2xsZWN0aW9uOiB0aGlzLl9jb2xsZWN0aW9uLFxuICAgICAgICBuYW1lOiB0aGlzLl9zY2hlbWF0aWMsXG4gICAgICAgIG9wdGlvbnM6IHRoaXMuX29wdGlvbnMsXG4gICAgICB9LFxuICAgIH07XG4gIH1cbn1cbiJdfQ==