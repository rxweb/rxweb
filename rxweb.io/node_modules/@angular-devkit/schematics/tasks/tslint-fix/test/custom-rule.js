"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = require("@angular-devkit/schematics/tasks"); // tslint:disable-line:no-implicit-dependencies
const path = require("path");
function default_1(options) {
    return (_, context) => {
        context.addTask(new tasks_1.TslintFixTask({
            rulesDirectory: path.join(__dirname, 'rules'),
            rules: {
                'custom-rule': [true, options.shouldPass],
            },
        }, {
            includes: '*.ts',
            silent: false,
        }));
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXJ1bGUuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3MvdGFza3MvdHNsaW50LWZpeC90ZXN0L2N1c3RvbS1ydWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBWUEsNERBRTBDLENBQUUsK0NBQStDO0FBQzNGLDZCQUE2QjtBQUU3QixtQkFBd0IsT0FBZ0M7SUFDdEQsTUFBTSxDQUFDLENBQUMsQ0FBTyxFQUFFLE9BQXlCLEVBQUUsRUFBRTtRQUM1QyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUkscUJBQWEsQ0FBQztZQUNoQyxjQUFjLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDO1lBQzdDLEtBQUssRUFBRTtnQkFDTCxhQUFhLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQzthQUMxQztTQUNGLEVBQUU7WUFDRCxRQUFRLEVBQUUsTUFBTTtZQUNoQixNQUFNLEVBQUUsS0FBSztTQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQVpELDRCQVlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtcbiAgUnVsZSxcbiAgU2NoZW1hdGljQ29udGV4dCxcbiAgVHJlZSxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnOyAgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1pbXBsaWNpdC1kZXBlbmRlbmNpZXNcbmltcG9ydCB7XG4gIFRzbGludEZpeFRhc2ssXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzL3Rhc2tzJzsgIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8taW1wbGljaXQtZGVwZW5kZW5jaWVzXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zOiB7IHNob3VsZFBhc3M6IGJvb2xlYW4gfSk6IFJ1bGUge1xuICByZXR1cm4gKF86IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICBjb250ZXh0LmFkZFRhc2sobmV3IFRzbGludEZpeFRhc2soe1xuICAgICAgcnVsZXNEaXJlY3Rvcnk6IHBhdGguam9pbihfX2Rpcm5hbWUsICdydWxlcycpLFxuICAgICAgcnVsZXM6IHtcbiAgICAgICAgJ2N1c3RvbS1ydWxlJzogW3RydWUsIG9wdGlvbnMuc2hvdWxkUGFzc10sXG4gICAgICB9LFxuICAgIH0sIHtcbiAgICAgIGluY2x1ZGVzOiAnKi50cycsXG4gICAgICBzaWxlbnQ6IGZhbHNlLFxuICAgIH0pKTtcbiAgfTtcbn1cbiJdfQ==