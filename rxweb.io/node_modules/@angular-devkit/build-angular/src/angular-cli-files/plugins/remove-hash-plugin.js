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
                const chunkName = data.chunk && data.chunk.name;
                const { chunkNames, hashFormat } = this.options;
                if (chunkName && chunkNames.includes(chunkName)) {
                    // Replace hash formats with empty strings.
                    return path
                        .replace(hashFormat.chunk, '')
                        .replace(hashFormat.extract, '');
                }
                return path;
            });
        });
    }
}
exports.RemoveHashPlugin = RemoveHashPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlLWhhc2gtcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9idWlsZF9hbmd1bGFyL3NyYy9hbmd1bGFyLWNsaS1maWxlcy9wbHVnaW5zL3JlbW92ZS1oYXNoLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWdCQTtJQUVFLFlBQW9CLE9BQWdDO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO0lBQUksQ0FBQztJQUV6RCxLQUFLLENBQUMsUUFBa0I7UUFDdEIsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLFdBQVcsQ0FBQyxFQUFFO1lBQ2pFLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxZQUVoQyxDQUFDO1lBRUYsWUFBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUNuRCxDQUFDLElBQVksRUFBRSxJQUFrQyxFQUFFLEVBQUU7Z0JBQ25ELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ2hELE1BQU0sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFFaEQsSUFBSSxTQUFTLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDL0MsMkNBQTJDO29CQUMzQyxPQUFPLElBQUk7eUJBQ1IsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO3lCQUM3QixPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDcEM7Z0JBRUQsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBM0JELDRDQTJCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IENvbXBpbGVyLCBjb21waWxhdGlvbiB9IGZyb20gJ3dlYnBhY2snO1xuaW1wb3J0IHsgSGFzaEZvcm1hdCB9IGZyb20gJy4uL21vZGVscy93ZWJwYWNrLWNvbmZpZ3MvdXRpbHMnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVtb3ZlSGFzaFBsdWdpbk9wdGlvbnMge1xuICBjaHVua05hbWVzOiBzdHJpbmdbXTtcbiAgaGFzaEZvcm1hdDogSGFzaEZvcm1hdDtcbn1cblxuZXhwb3J0IGNsYXNzIFJlbW92ZUhhc2hQbHVnaW4ge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgb3B0aW9uczogUmVtb3ZlSGFzaFBsdWdpbk9wdGlvbnMpIHsgfVxuXG4gIGFwcGx5KGNvbXBpbGVyOiBDb21waWxlcik6IHZvaWQge1xuICAgIGNvbXBpbGVyLmhvb2tzLmNvbXBpbGF0aW9uLnRhcCgncmVtb3ZlLWhhc2gtcGx1Z2luJywgY29tcGlsYXRpb24gPT4ge1xuICAgICAgY29uc3QgbWFpblRlbXBsYXRlID0gY29tcGlsYXRpb24ubWFpblRlbXBsYXRlIGFzIGNvbXBpbGF0aW9uLk1haW5UZW1wbGF0ZSAmIHtcbiAgICAgICAgaG9va3M6IGNvbXBpbGF0aW9uLkNvbXBpbGF0aW9uSG9va3M7XG4gICAgICB9O1xuXG4gICAgICBtYWluVGVtcGxhdGUuaG9va3MuYXNzZXRQYXRoLnRhcCgncmVtb3ZlLWhhc2gtcGx1Z2luJyxcbiAgICAgICAgKHBhdGg6IHN0cmluZywgZGF0YTogeyBjaHVuaz86IHsgbmFtZTogc3RyaW5nIH0gfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNodW5rTmFtZSA9IGRhdGEuY2h1bmsgJiYgZGF0YS5jaHVuay5uYW1lO1xuICAgICAgICAgIGNvbnN0IHsgY2h1bmtOYW1lcywgaGFzaEZvcm1hdCB9ID0gdGhpcy5vcHRpb25zO1xuXG4gICAgICAgICAgaWYgKGNodW5rTmFtZSAmJiBjaHVua05hbWVzLmluY2x1ZGVzKGNodW5rTmFtZSkpIHtcbiAgICAgICAgICAgIC8vIFJlcGxhY2UgaGFzaCBmb3JtYXRzIHdpdGggZW1wdHkgc3RyaW5ncy5cbiAgICAgICAgICAgIHJldHVybiBwYXRoXG4gICAgICAgICAgICAgIC5yZXBsYWNlKGhhc2hGb3JtYXQuY2h1bmssICcnKVxuICAgICAgICAgICAgICAucmVwbGFjZShoYXNoRm9ybWF0LmV4dHJhY3QsICcnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gcGF0aDtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==