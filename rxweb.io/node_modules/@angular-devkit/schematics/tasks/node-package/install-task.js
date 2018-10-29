"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("./options");
class NodePackageInstallTaskOptions {
}
exports.NodePackageInstallTaskOptions = NodePackageInstallTaskOptions;
class NodePackageInstallTask {
    constructor(options) {
        this.quiet = true;
        if (typeof options === 'string') {
            this.workingDirectory = options;
        }
        else if (typeof options === 'object') {
            if (options.quiet != undefined) {
                this.quiet = options.quiet;
            }
            if (options.workingDirectory != undefined) {
                this.workingDirectory = options.workingDirectory;
            }
            if (options.packageManager != undefined) {
                this.packageManager = options.packageManager;
            }
            if (options.packageName != undefined) {
                this.packageName = options.packageName;
            }
        }
    }
    toConfiguration() {
        return {
            name: options_1.NodePackageName,
            options: {
                command: 'install',
                quiet: this.quiet,
                workingDirectory: this.workingDirectory,
                packageManager: this.packageManager,
                packageName: this.packageName,
            },
        };
    }
}
exports.NodePackageInstallTask = NodePackageInstallTask;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbC10YXNrLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9zY2hlbWF0aWNzL3Rhc2tzL25vZGUtcGFja2FnZS9pbnN0YWxsLXRhc2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQSx1Q0FBb0U7QUFFcEU7Q0FLQztBQUxELHNFQUtDO0FBRUQ7SUFRRSxZQUFZLE9BQXlEO1FBUHJFLFVBQUssR0FBRyxJQUFJLENBQUM7UUFRWCxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUMvQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDO1NBQ2pDO2FBQU0sSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDdEMsSUFBSSxPQUFPLENBQUMsS0FBSyxJQUFJLFNBQVMsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO2FBQzVCO1lBQ0QsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLElBQUksU0FBUyxFQUFFO2dCQUN6QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDO2FBQ2xEO1lBQ0QsSUFBSSxPQUFPLENBQUMsY0FBYyxJQUFJLFNBQVMsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDO2FBQzlDO1lBQ0QsSUFBSSxPQUFPLENBQUMsV0FBVyxJQUFJLFNBQVMsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3hDO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsZUFBZTtRQUNiLE9BQU87WUFDTCxJQUFJLEVBQUUseUJBQWU7WUFDckIsT0FBTyxFQUFFO2dCQUNQLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0I7Z0JBQ3ZDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztnQkFDbkMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO2FBQzlCO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQXZDRCx3REF1Q0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBUYXNrQ29uZmlndXJhdGlvbiwgVGFza0NvbmZpZ3VyYXRpb25HZW5lcmF0b3IgfSBmcm9tICcuLi8uLi9zcmMnO1xuaW1wb3J0IHsgTm9kZVBhY2thZ2VOYW1lLCBOb2RlUGFja2FnZVRhc2tPcHRpb25zIH0gZnJvbSAnLi9vcHRpb25zJztcblxuZXhwb3J0IGNsYXNzIE5vZGVQYWNrYWdlSW5zdGFsbFRhc2tPcHRpb25zIHtcbiAgcGFja2FnZU1hbmFnZXI6IHN0cmluZztcbiAgcGFja2FnZU5hbWU6IHN0cmluZztcbiAgd29ya2luZ0RpcmVjdG9yeTogc3RyaW5nO1xuICBxdWlldDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIE5vZGVQYWNrYWdlSW5zdGFsbFRhc2sgaW1wbGVtZW50cyBUYXNrQ29uZmlndXJhdGlvbkdlbmVyYXRvcjxOb2RlUGFja2FnZVRhc2tPcHRpb25zPiB7XG4gIHF1aWV0ID0gdHJ1ZTtcbiAgd29ya2luZ0RpcmVjdG9yeT86IHN0cmluZztcbiAgcGFja2FnZU1hbmFnZXI/OiBzdHJpbmc7XG4gIHBhY2thZ2VOYW1lPzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHdvcmtpbmdEaXJlY3Rvcnk/OiBzdHJpbmcpO1xuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBQYXJ0aWFsPE5vZGVQYWNrYWdlSW5zdGFsbFRhc2tPcHRpb25zPik7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBzdHJpbmcgfCBQYXJ0aWFsPE5vZGVQYWNrYWdlSW5zdGFsbFRhc2tPcHRpb25zPikge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMud29ya2luZ0RpcmVjdG9yeSA9IG9wdGlvbnM7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChvcHRpb25zLnF1aWV0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnF1aWV0ID0gb3B0aW9ucy5xdWlldDtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLndvcmtpbmdEaXJlY3RvcnkgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMud29ya2luZ0RpcmVjdG9yeSA9IG9wdGlvbnMud29ya2luZ0RpcmVjdG9yeTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLnBhY2thZ2VNYW5hZ2VyICE9IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnBhY2thZ2VNYW5hZ2VyID0gb3B0aW9ucy5wYWNrYWdlTWFuYWdlcjtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLnBhY2thZ2VOYW1lICE9IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnBhY2thZ2VOYW1lID0gb3B0aW9ucy5wYWNrYWdlTmFtZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0b0NvbmZpZ3VyYXRpb24oKTogVGFza0NvbmZpZ3VyYXRpb248Tm9kZVBhY2thZ2VUYXNrT3B0aW9ucz4ge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBOb2RlUGFja2FnZU5hbWUsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGNvbW1hbmQ6ICdpbnN0YWxsJyxcbiAgICAgICAgcXVpZXQ6IHRoaXMucXVpZXQsXG4gICAgICAgIHdvcmtpbmdEaXJlY3Rvcnk6IHRoaXMud29ya2luZ0RpcmVjdG9yeSxcbiAgICAgICAgcGFja2FnZU1hbmFnZXI6IHRoaXMucGFja2FnZU1hbmFnZXIsXG4gICAgICAgIHBhY2thZ2VOYW1lOiB0aGlzLnBhY2thZ2VOYW1lLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG59XG4iXX0=