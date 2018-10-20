"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolver_1 = require("./resolver");
/**
 */
class PatternMatchingHost extends resolver_1.ResolverHost {
    constructor() {
        super(...arguments);
        this._patterns = new Map();
    }
    addPattern(pattern, replacementFn) {
        // Simple GLOB pattern replacement.
        const reString = '^('
            + (Array.isArray(pattern) ? pattern : [pattern])
                .map(ex => '('
                + ex.split(/[\/\\]/g).map(f => f
                    .replace(/[\-\[\]{}()+?.^$|]/g, '\\$&')
                    .replace(/^\*\*/g, '(.+?)?')
                    .replace(/\*/g, '[^/\\\\]*'))
                    .join('[\/\\\\]')
                + ')')
                .join('|')
            + ')($|/|\\\\)';
        this._patterns.set(new RegExp(reString), replacementFn);
    }
    _resolve(path) {
        let newPath = path;
        this._patterns.forEach((fn, re) => {
            if (re.test(path)) {
                newPath = fn(newPath);
            }
        });
        return newPath;
    }
}
exports.PatternMatchingHost = PatternMatchingHost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0dGVybi5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvY29yZS9zcmMvdmlydHVhbC1mcy9ob3N0L3BhdHRlcm4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQSx5Q0FBMEM7QUFNMUM7R0FDRztBQUNILHlCQUE2RCxTQUFRLHVCQUFvQjtJQUF6Rjs7UUFDWSxjQUFTLEdBQUcsSUFBSSxHQUFHLEVBQStCLENBQUM7SUE2Qi9ELENBQUM7SUEzQkMsVUFBVSxDQUFDLE9BQTBCLEVBQUUsYUFBa0M7UUFDdkUsbUNBQW1DO1FBQ25DLE1BQU0sUUFBUSxHQUFHLElBQUk7Y0FDakIsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQzdDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUc7a0JBQ1YsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUM3QixPQUFPLENBQUMscUJBQXFCLEVBQUUsTUFBTSxDQUFDO3FCQUN0QyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztxQkFDM0IsT0FBTyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztxQkFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQztrQkFDakIsR0FBRyxDQUFDO2lCQUNQLElBQUksQ0FBQyxHQUFHLENBQUM7Y0FDVixhQUFhLENBQUM7UUFFbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVTLFFBQVEsQ0FBQyxJQUFVO1FBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUNoQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2pCLE9BQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDdkI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjtBQTlCRCxrREE4QkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBQYXRoIH0gZnJvbSAnLi4vcGF0aCc7XG5pbXBvcnQgeyBSZXNvbHZlckhvc3QgfSBmcm9tICcuL3Jlc29sdmVyJztcblxuXG5leHBvcnQgdHlwZSBSZXBsYWNlbWVudEZ1bmN0aW9uID0gKHBhdGg6IFBhdGgpID0+IFBhdGg7XG5cblxuLyoqXG4gKi9cbmV4cG9ydCBjbGFzcyBQYXR0ZXJuTWF0Y2hpbmdIb3N0PFN0YXRzVCBleHRlbmRzIG9iamVjdCA9IHt9PiBleHRlbmRzIFJlc29sdmVySG9zdDxTdGF0c1Q+IHtcbiAgcHJvdGVjdGVkIF9wYXR0ZXJucyA9IG5ldyBNYXA8UmVnRXhwLCBSZXBsYWNlbWVudEZ1bmN0aW9uPigpO1xuXG4gIGFkZFBhdHRlcm4ocGF0dGVybjogc3RyaW5nIHwgc3RyaW5nW10sIHJlcGxhY2VtZW50Rm46IFJlcGxhY2VtZW50RnVuY3Rpb24pIHtcbiAgICAvLyBTaW1wbGUgR0xPQiBwYXR0ZXJuIHJlcGxhY2VtZW50LlxuICAgIGNvbnN0IHJlU3RyaW5nID0gJ14oJ1xuICAgICAgKyAoQXJyYXkuaXNBcnJheShwYXR0ZXJuKSA/IHBhdHRlcm4gOiBbcGF0dGVybl0pXG4gICAgICAgIC5tYXAoZXggPT4gJygnXG4gICAgICAgICAgKyBleC5zcGxpdCgvW1xcL1xcXFxdL2cpLm1hcChmID0+IGZcbiAgICAgICAgICAgIC5yZXBsYWNlKC9bXFwtXFxbXFxde30oKSs/Ll4kfF0vZywgJ1xcXFwkJicpXG4gICAgICAgICAgICAucmVwbGFjZSgvXlxcKlxcKi9nLCAnKC4rPyk/JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXCovZywgJ1teL1xcXFxcXFxcXSonKSlcbiAgICAgICAgICAgIC5qb2luKCdbXFwvXFxcXFxcXFxdJylcbiAgICAgICAgICArICcpJylcbiAgICAgICAgLmpvaW4oJ3wnKVxuICAgICAgKyAnKSgkfC98XFxcXFxcXFwpJztcblxuICAgIHRoaXMuX3BhdHRlcm5zLnNldChuZXcgUmVnRXhwKHJlU3RyaW5nKSwgcmVwbGFjZW1lbnRGbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3Jlc29sdmUocGF0aDogUGF0aCkge1xuICAgIGxldCBuZXdQYXRoID0gcGF0aDtcbiAgICB0aGlzLl9wYXR0ZXJucy5mb3JFYWNoKChmbiwgcmUpID0+IHtcbiAgICAgIGlmIChyZS50ZXN0KHBhdGgpKSB7XG4gICAgICAgIG5ld1BhdGggPSBmbihuZXdQYXRoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBuZXdQYXRoO1xuICB9XG59XG4iXX0=