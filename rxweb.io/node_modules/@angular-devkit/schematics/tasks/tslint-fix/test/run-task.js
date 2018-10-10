"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = require("@angular-devkit/schematics/tasks"); // tslint:disable-line:no-implicit-dependencies
function default_1() {
    return (_, context) => {
        context.addTask(new tasks_1.TslintFixTask({
            rules: {
                'max-line-length': [true, 80],
            },
        }, {
            includes: '*.ts',
            silent: false,
        }));
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLXRhc2suanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3MvdGFza3MvdHNsaW50LWZpeC90ZXN0L3J1bi10YXNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBWUEsNERBRTBDLENBQUUsK0NBQStDO0FBRTNGO0lBQ0UsTUFBTSxDQUFDLENBQUMsQ0FBTyxFQUFFLE9BQXlCLEVBQUUsRUFBRTtRQUM1QyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUkscUJBQWEsQ0FBQztZQUNoQyxLQUFLLEVBQUU7Z0JBQ0wsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO2FBQzlCO1NBQ0YsRUFBRTtZQUNELFFBQVEsRUFBRSxNQUFNO1lBQ2hCLE1BQU0sRUFBRSxLQUFLO1NBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7QUFDSixDQUFDO0FBWEQsNEJBV0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge1xuICBSdWxlLFxuICBTY2hlbWF0aWNDb250ZXh0LFxuICBUcmVlLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7ICAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWltcGxpY2l0LWRlcGVuZGVuY2llc1xuaW1wb3J0IHtcbiAgVHNsaW50Rml4VGFzayxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MvdGFza3MnOyAgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1pbXBsaWNpdC1kZXBlbmRlbmNpZXNcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKTogUnVsZSB7XG4gIHJldHVybiAoXzogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIGNvbnRleHQuYWRkVGFzayhuZXcgVHNsaW50Rml4VGFzayh7XG4gICAgICBydWxlczoge1xuICAgICAgICAnbWF4LWxpbmUtbGVuZ3RoJzogW3RydWUsIDgwXSxcbiAgICAgIH0sXG4gICAgfSwge1xuICAgICAgaW5jbHVkZXM6ICcqLnRzJyxcbiAgICAgIHNpbGVudDogZmFsc2UsXG4gICAgfSkpO1xuICB9O1xufVxuIl19