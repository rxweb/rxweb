"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("./options");
class NodePackageLinkTask {
    constructor(packageName, workingDirectory) {
        this.packageName = packageName;
        this.workingDirectory = workingDirectory;
        this.quiet = true;
    }
    toConfiguration() {
        return {
            name: options_1.NodePackageName,
            options: {
                command: 'link',
                quiet: this.quiet,
                workingDirectory: this.workingDirectory,
                packageName: this.packageName,
            },
        };
    }
}
exports.NodePackageLinkTask = NodePackageLinkTask;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay10YXNrLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9zY2hlbWF0aWNzL3Rhc2tzL25vZGUtcGFja2FnZS9saW5rLXRhc2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQSx1Q0FBb0U7QUFFcEU7SUFHRSxZQUFtQixXQUFvQixFQUFTLGdCQUF5QjtRQUF0RCxnQkFBVyxHQUFYLFdBQVcsQ0FBUztRQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUztRQUZ6RSxVQUFLLEdBQUcsSUFBSSxDQUFDO0lBRStELENBQUM7SUFFN0UsZUFBZTtRQUNiLE9BQU87WUFDTCxJQUFJLEVBQUUseUJBQWU7WUFDckIsT0FBTyxFQUFFO2dCQUNQLE9BQU8sRUFBRSxNQUFNO2dCQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDakIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtnQkFDdkMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO2FBQzlCO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQWhCRCxrREFnQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBUYXNrQ29uZmlndXJhdGlvbiwgVGFza0NvbmZpZ3VyYXRpb25HZW5lcmF0b3IgfSBmcm9tICcuLi8uLi9zcmMnO1xuaW1wb3J0IHsgTm9kZVBhY2thZ2VOYW1lLCBOb2RlUGFja2FnZVRhc2tPcHRpb25zIH0gZnJvbSAnLi9vcHRpb25zJztcblxuZXhwb3J0IGNsYXNzIE5vZGVQYWNrYWdlTGlua1Rhc2sgaW1wbGVtZW50cyBUYXNrQ29uZmlndXJhdGlvbkdlbmVyYXRvcjxOb2RlUGFja2FnZVRhc2tPcHRpb25zPiB7XG4gIHF1aWV0ID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFja2FnZU5hbWU/OiBzdHJpbmcsIHB1YmxpYyB3b3JraW5nRGlyZWN0b3J5Pzogc3RyaW5nKSB7fVxuXG4gIHRvQ29uZmlndXJhdGlvbigpOiBUYXNrQ29uZmlndXJhdGlvbjxOb2RlUGFja2FnZVRhc2tPcHRpb25zPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IE5vZGVQYWNrYWdlTmFtZSxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgY29tbWFuZDogJ2xpbmsnLFxuICAgICAgICBxdWlldDogdGhpcy5xdWlldCxcbiAgICAgICAgd29ya2luZ0RpcmVjdG9yeTogdGhpcy53b3JraW5nRGlyZWN0b3J5LFxuICAgICAgICBwYWNrYWdlTmFtZTogdGhpcy5wYWNrYWdlTmFtZSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxufVxuIl19