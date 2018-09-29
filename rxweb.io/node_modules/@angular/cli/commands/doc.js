"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("../models/command");
const opn = require('opn');
class DocCommand extends command_1.Command {
    constructor() {
        super(...arguments);
        this.name = 'doc';
        this.description = 'Opens the official Angular API documentation for a given keyword.';
        this.arguments = ['keyword'];
        this.options = [
            {
                name: 'search',
                aliases: ['s'],
                type: Boolean,
                default: false,
                description: 'Search whole angular.io instead of just api.',
            },
        ];
    }
    validate(options) {
        if (!options.keyword) {
            this.logger.error(`keyword argument is required.`);
            return false;
        }
        return true;
    }
    run(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let searchUrl = `https://angular.io/api?query=${options.keyword}`;
            if (options.search) {
                searchUrl = `https://www.google.com/search?q=site%3Aangular.io+${options.keyword}`;
            }
            return opn(searchUrl);
        });
    }
}
DocCommand.aliases = ['d'];
exports.DocCommand = DocCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyL2NsaS9jb21tYW5kcy9kb2MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7OztBQUVILCtDQUE0QztBQUM1QyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFPM0IsZ0JBQXdCLFNBQVEsaUJBQU87SUFBdkM7O1FBQ2tCLFNBQUksR0FBRyxLQUFLLENBQUM7UUFDYixnQkFBVyxHQUFHLG1FQUFtRSxDQUFDO1FBRWxGLGNBQVMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hCLFlBQU8sR0FBRztZQUN4QjtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUM7Z0JBQ2QsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsV0FBVyxFQUFFLDhDQUE4QzthQUM1RDtTQUNGLENBQUM7SUFvQkosQ0FBQztJQWxCUSxRQUFRLENBQUMsT0FBZ0I7UUFDOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBRW5ELE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFWSxHQUFHLENBQUMsT0FBZ0I7O1lBQy9CLElBQUksU0FBUyxHQUFHLGdDQUFnQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbEUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLFNBQVMsR0FBRyxxREFBcUQsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3JGLENBQUM7WUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hCLENBQUM7S0FBQTs7QUE3QmEsa0JBQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBSGhDLGdDQWlDQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gJy4uL21vZGVscy9jb21tYW5kJztcbmNvbnN0IG9wbiA9IHJlcXVpcmUoJ29wbicpO1xuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnMge1xuICBrZXl3b3JkOiBzdHJpbmc7XG4gIHNlYXJjaD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBEb2NDb21tYW5kIGV4dGVuZHMgQ29tbWFuZCB7XG4gIHB1YmxpYyByZWFkb25seSBuYW1lID0gJ2RvYyc7XG4gIHB1YmxpYyByZWFkb25seSBkZXNjcmlwdGlvbiA9ICdPcGVucyB0aGUgb2ZmaWNpYWwgQW5ndWxhciBBUEkgZG9jdW1lbnRhdGlvbiBmb3IgYSBnaXZlbiBrZXl3b3JkLic7XG4gIHB1YmxpYyBzdGF0aWMgYWxpYXNlcyA9IFsnZCddO1xuICBwdWJsaWMgcmVhZG9ubHkgYXJndW1lbnRzID0gWydrZXl3b3JkJ107XG4gIHB1YmxpYyByZWFkb25seSBvcHRpb25zID0gW1xuICAgIHtcbiAgICAgIG5hbWU6ICdzZWFyY2gnLFxuICAgICAgYWxpYXNlczogWydzJ10sXG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICBkZXNjcmlwdGlvbjogJ1NlYXJjaCB3aG9sZSBhbmd1bGFyLmlvIGluc3RlYWQgb2YganVzdCBhcGkuJyxcbiAgICB9LFxuICBdO1xuXG4gIHB1YmxpYyB2YWxpZGF0ZShvcHRpb25zOiBPcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zLmtleXdvcmQpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGBrZXl3b3JkIGFyZ3VtZW50IGlzIHJlcXVpcmVkLmApO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcnVuKG9wdGlvbnM6IE9wdGlvbnMpIHtcbiAgICBsZXQgc2VhcmNoVXJsID0gYGh0dHBzOi8vYW5ndWxhci5pby9hcGk/cXVlcnk9JHtvcHRpb25zLmtleXdvcmR9YDtcbiAgICBpZiAob3B0aW9ucy5zZWFyY2gpIHtcbiAgICAgIHNlYXJjaFVybCA9IGBodHRwczovL3d3dy5nb29nbGUuY29tL3NlYXJjaD9xPXNpdGUlM0Fhbmd1bGFyLmlvKyR7b3B0aW9ucy5rZXl3b3JkfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wbihzZWFyY2hVcmwpO1xuICB9XG59XG4iXX0=