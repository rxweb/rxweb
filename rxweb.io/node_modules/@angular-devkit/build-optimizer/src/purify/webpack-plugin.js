"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_sources_1 = require("webpack-sources");
const purify_1 = require("./purify");
class PurifyPlugin {
    constructor() { }
    apply(compiler) {
        compiler.plugin('compilation', (compilation) => {
            // Webpack 4 provides the same functionality as this plugin and TS transformer
            compilation.warnings.push('PurifyPlugin is deprecated and will be removed in 0.7.0.');
            compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
                chunks.forEach((chunk) => {
                    chunk.files
                        .filter((fileName) => fileName.endsWith('.js'))
                        .forEach((fileName) => {
                        const inserts = purify_1.purifyReplacements(compilation.assets[fileName].source());
                        if (inserts.length > 0) {
                            const replaceSource = new webpack_sources_1.ReplaceSource(compilation.assets[fileName], fileName);
                            inserts.forEach((insert) => {
                                replaceSource.insert(insert.pos, insert.content);
                            });
                            compilation.assets[fileName] = replaceSource;
                        }
                    });
                });
                callback();
            });
        });
    }
}
exports.PurifyPlugin = PurifyPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay1wbHVnaW4uanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2J1aWxkX29wdGltaXplci9zcmMvcHVyaWZ5L3dlYnBhY2stcGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBU0EscURBQWdEO0FBQ2hELHFDQUE4QztBQU85QztJQUNFLGdCQUFnQixDQUFDO0lBQ1YsS0FBSyxDQUFDLFFBQWtCO1FBQzdCLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsV0FBb0MsRUFBRSxFQUFFO1lBQ3RFLDhFQUE4RTtZQUM5RSxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1lBRXRGLFdBQVcsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxNQUFlLEVBQUUsUUFBb0IsRUFBRSxFQUFFO2dCQUNwRixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBWSxFQUFFLEVBQUU7b0JBQzlCLEtBQUssQ0FBQyxLQUFLO3lCQUNSLE1BQU0sQ0FBQyxDQUFDLFFBQWdCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQ3RELE9BQU8sQ0FBQyxDQUFDLFFBQWdCLEVBQUUsRUFBRTt3QkFDNUIsTUFBTSxPQUFPLEdBQUcsMkJBQWtCLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO3dCQUUxRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3ZCLE1BQU0sYUFBYSxHQUFHLElBQUksK0JBQWEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDOzRCQUNoRixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0NBQ3pCLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQ25ELENBQUMsQ0FBQyxDQUFDOzRCQUNILFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsYUFBYSxDQUFDO3dCQUMvQyxDQUFDO29CQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO2dCQUNILFFBQVEsRUFBRSxDQUFDO1lBQ2IsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQTNCRCxvQ0EyQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW1wbGljaXQtZGVwZW5kZW5jaWVzXG5pbXBvcnQgeyBDb21waWxlciwgY29tcGlsYXRpb24gfSBmcm9tICd3ZWJwYWNrJztcbmltcG9ydCB7IFJlcGxhY2VTb3VyY2UgfSBmcm9tICd3ZWJwYWNrLXNvdXJjZXMnO1xuaW1wb3J0IHsgcHVyaWZ5UmVwbGFjZW1lbnRzIH0gZnJvbSAnLi9wdXJpZnknO1xuXG5cbmludGVyZmFjZSBDaHVuayB7XG4gIGZpbGVzOiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGNsYXNzIFB1cmlmeVBsdWdpbiB7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG4gIHB1YmxpYyBhcHBseShjb21waWxlcjogQ29tcGlsZXIpOiB2b2lkIHtcbiAgICBjb21waWxlci5wbHVnaW4oJ2NvbXBpbGF0aW9uJywgKGNvbXBpbGF0aW9uOiBjb21waWxhdGlvbi5Db21waWxhdGlvbikgPT4ge1xuICAgICAgLy8gV2VicGFjayA0IHByb3ZpZGVzIHRoZSBzYW1lIGZ1bmN0aW9uYWxpdHkgYXMgdGhpcyBwbHVnaW4gYW5kIFRTIHRyYW5zZm9ybWVyXG4gICAgICBjb21waWxhdGlvbi53YXJuaW5ncy5wdXNoKCdQdXJpZnlQbHVnaW4gaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIDAuNy4wLicpO1xuXG4gICAgICBjb21waWxhdGlvbi5wbHVnaW4oJ29wdGltaXplLWNodW5rLWFzc2V0cycsIChjaHVua3M6IENodW5rW10sIGNhbGxiYWNrOiAoKSA9PiB2b2lkKSA9PiB7XG4gICAgICAgIGNodW5rcy5mb3JFYWNoKChjaHVuazogQ2h1bmspID0+IHtcbiAgICAgICAgICBjaHVuay5maWxlc1xuICAgICAgICAgICAgLmZpbHRlcigoZmlsZU5hbWU6IHN0cmluZykgPT4gZmlsZU5hbWUuZW5kc1dpdGgoJy5qcycpKVxuICAgICAgICAgICAgLmZvckVhY2goKGZpbGVOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgaW5zZXJ0cyA9IHB1cmlmeVJlcGxhY2VtZW50cyhjb21waWxhdGlvbi5hc3NldHNbZmlsZU5hbWVdLnNvdXJjZSgpKTtcblxuICAgICAgICAgICAgICBpZiAoaW5zZXJ0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVwbGFjZVNvdXJjZSA9IG5ldyBSZXBsYWNlU291cmNlKGNvbXBpbGF0aW9uLmFzc2V0c1tmaWxlTmFtZV0sIGZpbGVOYW1lKTtcbiAgICAgICAgICAgICAgICBpbnNlcnRzLmZvckVhY2goKGluc2VydCkgPT4ge1xuICAgICAgICAgICAgICAgICAgcmVwbGFjZVNvdXJjZS5pbnNlcnQoaW5zZXJ0LnBvcywgaW5zZXJ0LmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbXBpbGF0aW9uLmFzc2V0c1tmaWxlTmFtZV0gPSByZXBsYWNlU291cmNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19