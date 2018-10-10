"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RemoveHashPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap('remove-hash-plugin', compilation => {
            const mainTemplate = compilation.mainTemplate;
            mainTemplate.hooks.assetPath.tap('remove-hash-plugin', (path, data) => {
                const chunkId = data.chunk && data.chunk.id;
                if (chunkId && this.options.chunkIds.includes(chunkId)) {
                    // Replace hash formats with empty strings.
                    return path
                        .replace(this.options.hashFormat.chunk, '')
                        .replace(this.options.hashFormat.extract, '');
                }
                return path;
            });
        });
    }
}
exports.RemoveHashPlugin = RemoveHashPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlLWhhc2gtcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9idWlsZF9hbmd1bGFyL3NyYy9hbmd1bGFyLWNsaS1maWxlcy9wbHVnaW5zL3JlbW92ZS1oYXNoLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWdCQTtJQUVFLFlBQW9CLE9BQWdDO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO0lBQUksQ0FBQztJQUV6RCxLQUFLLENBQUMsUUFBa0I7UUFDdEIsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLFdBQVcsQ0FBQyxFQUFFO1lBQ2pFLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxZQUVoQyxDQUFDO1lBRUYsWUFBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUNuRCxDQUFDLElBQVksRUFBRSxJQUFnQyxFQUFFLEVBQUU7Z0JBQ2pELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBRTVDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2RCwyQ0FBMkM7b0JBQzNDLE1BQU0sQ0FBQyxJQUFJO3lCQUNSLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO3lCQUMxQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRCxDQUFDO2dCQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZCxDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBMUJELDRDQTBCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IENvbXBpbGVyLCBjb21waWxhdGlvbiB9IGZyb20gJ3dlYnBhY2snO1xuaW1wb3J0IHsgSGFzaEZvcm1hdCB9IGZyb20gJy4uL21vZGVscy93ZWJwYWNrLWNvbmZpZ3MvdXRpbHMnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVtb3ZlSGFzaFBsdWdpbk9wdGlvbnMge1xuICBjaHVua0lkczogc3RyaW5nW107XG4gIGhhc2hGb3JtYXQ6IEhhc2hGb3JtYXQ7XG59XG5cbmV4cG9ydCBjbGFzcyBSZW1vdmVIYXNoUGx1Z2luIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9wdGlvbnM6IFJlbW92ZUhhc2hQbHVnaW5PcHRpb25zKSB7IH1cblxuICBhcHBseShjb21waWxlcjogQ29tcGlsZXIpOiB2b2lkIHtcbiAgICBjb21waWxlci5ob29rcy5jb21waWxhdGlvbi50YXAoJ3JlbW92ZS1oYXNoLXBsdWdpbicsIGNvbXBpbGF0aW9uID0+IHtcbiAgICAgIGNvbnN0IG1haW5UZW1wbGF0ZSA9IGNvbXBpbGF0aW9uLm1haW5UZW1wbGF0ZSBhcyBjb21waWxhdGlvbi5NYWluVGVtcGxhdGUgJiB7XG4gICAgICAgIGhvb2tzOiBjb21waWxhdGlvbi5Db21waWxhdGlvbkhvb2tzO1xuICAgICAgfTtcblxuICAgICAgbWFpblRlbXBsYXRlLmhvb2tzLmFzc2V0UGF0aC50YXAoJ3JlbW92ZS1oYXNoLXBsdWdpbicsXG4gICAgICAgIChwYXRoOiBzdHJpbmcsIGRhdGE6IHsgY2h1bms/OiB7IGlkOiBzdHJpbmcgfSB9KSA9PiB7XG4gICAgICAgICAgY29uc3QgY2h1bmtJZCA9IGRhdGEuY2h1bmsgJiYgZGF0YS5jaHVuay5pZDtcblxuICAgICAgICAgIGlmIChjaHVua0lkICYmIHRoaXMub3B0aW9ucy5jaHVua0lkcy5pbmNsdWRlcyhjaHVua0lkKSkge1xuICAgICAgICAgICAgLy8gUmVwbGFjZSBoYXNoIGZvcm1hdHMgd2l0aCBlbXB0eSBzdHJpbmdzLlxuICAgICAgICAgICAgcmV0dXJuIHBhdGhcbiAgICAgICAgICAgICAgLnJlcGxhY2UodGhpcy5vcHRpb25zLmhhc2hGb3JtYXQuY2h1bmssICcnKVxuICAgICAgICAgICAgICAucmVwbGFjZSh0aGlzLm9wdGlvbnMuaGFzaEZvcm1hdC5leHRyYWN0LCAnJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0pO1xuICB9XG59XG4iXX0=