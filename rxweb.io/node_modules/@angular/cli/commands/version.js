"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const child_process = require("child_process");
const fs = require("fs");
const path = require("path");
const command_1 = require("../models/command");
const find_up_1 = require("../utilities/find-up");
class VersionCommand extends command_1.Command {
    constructor() {
        super(...arguments);
        this.name = 'version';
        this.description = 'Outputs Angular CLI version.';
        this.arguments = [];
        this.options = [];
    }
    run() {
        const pkg = require(path.resolve(__dirname, '..', 'package.json'));
        let projPkg;
        try {
            projPkg = require(path.resolve(this.project.root, 'package.json'));
        }
        catch (exception) {
            projPkg = undefined;
        }
        const patterns = [
            /^@angular\/.*/,
            /^@angular-devkit\/.*/,
            /^@ngtools\/.*/,
            /^@schematics\/.*/,
            /^rxjs$/,
            /^typescript$/,
            /^ng-packagr$/,
            /^webpack$/,
        ];
        const maybeNodeModules = find_up_1.findUp('node_modules', __dirname);
        const packageRoot = projPkg
            ? path.resolve(this.project.root, 'node_modules')
            : maybeNodeModules;
        const packageNames = [
            ...Object.keys(pkg && pkg['dependencies'] || {}),
            ...Object.keys(pkg && pkg['devDependencies'] || {}),
            ...Object.keys(projPkg && projPkg['dependencies'] || {}),
            ...Object.keys(projPkg && projPkg['devDependencies'] || {}),
        ];
        if (packageRoot != null) {
            // Add all node_modules and node_modules/@*/*
            const nodePackageNames = fs.readdirSync(packageRoot)
                .reduce((acc, name) => {
                if (name.startsWith('@')) {
                    return acc.concat(fs.readdirSync(path.resolve(packageRoot, name))
                        .map(subName => name + '/' + subName));
                }
                else {
                    return acc.concat(name);
                }
            }, []);
            packageNames.push(...nodePackageNames);
        }
        const versions = packageNames
            .filter(x => patterns.some(p => p.test(x)))
            .reduce((acc, name) => {
            if (name in acc) {
                return acc;
            }
            acc[name] = this.getVersion(name, packageRoot, maybeNodeModules);
            return acc;
        }, {});
        let ngCliVersion = pkg.version;
        if (!__dirname.match(/node_modules/)) {
            let gitBranch = '??';
            try {
                const gitRefName = '' + child_process.execSync('git symbolic-ref HEAD', { cwd: __dirname });
                gitBranch = path.basename(gitRefName.replace('\n', ''));
            }
            catch (_a) {
            }
            ngCliVersion = `local (v${pkg.version}, branch: ${gitBranch})`;
        }
        let angularCoreVersion = '';
        const angularSameAsCore = [];
        if (projPkg) {
            // Filter all angular versions that are the same as core.
            angularCoreVersion = versions['@angular/core'];
            if (angularCoreVersion) {
                for (const angularPackage of Object.keys(versions)) {
                    if (versions[angularPackage] == angularCoreVersion
                        && angularPackage.startsWith('@angular/')) {
                        angularSameAsCore.push(angularPackage.replace(/^@angular\//, ''));
                        delete versions[angularPackage];
                    }
                }
                // Make sure we list them in alphabetical order.
                angularSameAsCore.sort();
            }
        }
        const namePad = ' '.repeat(Object.keys(versions).sort((a, b) => b.length - a.length)[0].length + 3);
        const asciiArt = `
     _                      _                 ____ _     ___
    / \\   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \\ | '_ \\ / _\` | | | | |/ _\` | '__|   | |   | |    | |
  / ___ \\| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \\_\\_| |_|\\__, |\\__,_|_|\\__,_|_|       \\____|_____|___|
                |___/
    `.split('\n').map(x => core_1.terminal.red(x)).join('\n');
        this.logger.info(asciiArt);
        this.logger.info(`
      Angular CLI: ${ngCliVersion}
      Node: ${process.versions.node}
      OS: ${process.platform} ${process.arch}
      Angular: ${angularCoreVersion}
      ... ${angularSameAsCore.reduce((acc, name) => {
            // Perform a simple word wrap around 60.
            if (acc.length == 0) {
                return [name];
            }
            const line = (acc[acc.length - 1] + ', ' + name);
            if (line.length > 60) {
                acc.push(name);
            }
            else {
                acc[acc.length - 1] = line;
            }
            return acc;
        }, []).join('\n... ')}

      Package${namePad.slice(7)}Version
      -------${namePad.replace(/ /g, '-')}------------------
      ${Object.keys(versions)
            .map(module => `${module}${namePad.slice(module.length)}${versions[module]}`)
            .sort()
            .join('\n')}
    `.replace(/^ {6}/gm, ''));
    }
    getVersion(moduleName, projectNodeModules, cliNodeModules) {
        try {
            if (projectNodeModules) {
                const modulePkg = require(path.resolve(projectNodeModules, moduleName, 'package.json'));
                return modulePkg.version;
            }
        }
        catch (_) {
        }
        try {
            if (cliNodeModules) {
                const modulePkg = require(path.resolve(cliNodeModules, moduleName, 'package.json'));
                return modulePkg.version + ' (cli-only)';
            }
        }
        catch (_a) {
        }
        return '<error>';
    }
}
VersionCommand.aliases = ['v'];
exports.VersionCommand = VersionCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhci9jbGkvY29tbWFuZHMvdmVyc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVILCtDQUFnRDtBQUNoRCwrQ0FBK0M7QUFDL0MseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QiwrQ0FBb0Q7QUFDcEQsa0RBQThDO0FBRzlDLG9CQUE0QixTQUFRLGlCQUFPO0lBQTNDOztRQUNrQixTQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ2pCLGdCQUFXLEdBQUcsOEJBQThCLENBQUM7UUFFN0MsY0FBUyxHQUFhLEVBQUUsQ0FBQztRQUN6QixZQUFPLEdBQWEsRUFBRSxDQUFDO0lBaUt6QyxDQUFDO0lBL0pRLEdBQUc7UUFDUixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDbkUsSUFBSSxPQUFPLENBQUM7UUFDWixJQUFJLENBQUM7WUFDSCxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUNyRSxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNuQixPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLENBQUM7UUFFRCxNQUFNLFFBQVEsR0FBRztZQUNmLGVBQWU7WUFDZixzQkFBc0I7WUFDdEIsZUFBZTtZQUNmLGtCQUFrQjtZQUNsQixRQUFRO1lBQ1IsY0FBYztZQUNkLGNBQWM7WUFDZCxXQUFXO1NBQ1osQ0FBQztRQUVGLE1BQU0sZ0JBQWdCLEdBQUcsZ0JBQU0sQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDM0QsTUFBTSxXQUFXLEdBQUcsT0FBTztZQUN6QixD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QyxJQUFELENBQUM7UUFDVCxDQUFDO1FBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNuQixDQUFDOztBQWxLYSxzQkFBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFIaEMsd0NBc0tDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyB0ZXJtaW5hbCB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCAqIGFzIGNoaWxkX3Byb2Nlc3MgZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ29tbWFuZCwgT3B0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL2NvbW1hbmQnO1xuaW1wb3J0IHsgZmluZFVwIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2ZpbmQtdXAnO1xuXG5cbmV4cG9ydCBjbGFzcyBWZXJzaW9uQ29tbWFuZCBleHRlbmRzIENvbW1hbmQge1xuICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9ICd2ZXJzaW9uJztcbiAgcHVibGljIHJlYWRvbmx5IGRlc2NyaXB0aW9uID0gJ091dHB1dHMgQW5ndWxhciBDTEkgdmVyc2lvbi4nO1xuICBwdWJsaWMgc3RhdGljIGFsaWFzZXMgPSBbJ3YnXTtcbiAgcHVibGljIHJlYWRvbmx5IGFyZ3VtZW50czogc3RyaW5nW10gPSBbXTtcbiAgcHVibGljIHJlYWRvbmx5IG9wdGlvbnM6IE9wdGlvbltdID0gW107XG5cbiAgcHVibGljIHJ1bigpIHtcbiAgICBjb25zdCBwa2cgPSByZXF1aXJlKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLicsICdwYWNrYWdlLmpzb24nKSk7XG4gICAgbGV0IHByb2pQa2c7XG4gICAgdHJ5IHtcbiAgICAgIHByb2pQa2cgPSByZXF1aXJlKHBhdGgucmVzb2x2ZSh0aGlzLnByb2plY3Qucm9vdCwgJ3BhY2thZ2UuanNvbicpKTtcbiAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgIHByb2pQa2cgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgcGF0dGVybnMgPSBbXG4gICAgICAvXkBhbmd1bGFyXFwvLiovLFxuICAgICAgL15AYW5ndWxhci1kZXZraXRcXC8uKi8sXG4gICAgICAvXkBuZ3Rvb2xzXFwvLiovLFxuICAgICAgL15Ac2NoZW1hdGljc1xcLy4qLyxcbiAgICAgIC9ecnhqcyQvLFxuICAgICAgL150eXBlc2NyaXB0JC8sXG4gICAgICAvXm5nLXBhY2thZ3IkLyxcbiAgICAgIC9ed2VicGFjayQvLFxuICAgIF07XG5cbiAgICBjb25zdCBtYXliZU5vZGVNb2R1bGVzID0gZmluZFVwKCdub2RlX21vZHVsZXMnLCBfX2Rpcm5hbWUpO1xuICAgIGNvbnN0IHBhY2thZ2VSb290ID0gcHJvalBrZ1xuICAgICAgPyBwYXRoLnJlc29sdmUodGhpcy5wcm9qZWN0LnJvb3QsICdub2RlX21vZHVsZXMnKVxuICAgICAgOiBtYXliZU5vZGVNb2R1bGVzO1xuXG4gICAgY29uc3QgcGFja2FnZU5hbWVzID0gW1xuICAgICAgLi4uT2JqZWN0LmtleXMocGtnICYmIHBrZ1snZGVwZW5kZW5jaWVzJ10gfHwge30pLFxuICAgICAgLi4uT2JqZWN0LmtleXMocGtnICYmIHBrZ1snZGV2RGVwZW5kZW5jaWVzJ10gfHwge30pLFxuICAgICAgLi4uT2JqZWN0LmtleXMocHJvalBrZyAmJiBwcm9qUGtnWydkZXBlbmRlbmNpZXMnXSB8fCB7fSksXG4gICAgICAuLi5PYmplY3Qua2V5cyhwcm9qUGtnICYmIHByb2pQa2dbJ2RldkRlcGVuZGVuY2llcyddIHx8IHt9KSxcbiAgICAgIF07XG5cbiAgICBpZiAocGFja2FnZVJvb3QgIT0gbnVsbCkge1xuICAgICAgLy8gQWRkIGFsbCBub2RlX21vZHVsZXMgYW5kIG5vZGVfbW9kdWxlcy9AKi8qXG4gICAgICBjb25zdCBub2RlUGFja2FnZU5hbWVzID0gZnMucmVhZGRpclN5bmMocGFja2FnZVJvb3QpXG4gICAgICAgIC5yZWR1Y2U8c3RyaW5nW10+KChhY2MsIG5hbWUpID0+IHtcbiAgICAgICAgICBpZiAobmFtZS5zdGFydHNXaXRoKCdAJykpIHtcbiAgICAgICAgICAgIHJldHVybiBhY2MuY29uY2F0KFxuICAgICAgICAgICAgICBmcy5yZWFkZGlyU3luYyhwYXRoLnJlc29sdmUocGFja2FnZVJvb3QsIG5hbWUpKVxuICAgICAgICAgICAgICAgIC5tYXAoc3ViTmFtZSA9PiBuYW1lICsgJy8nICsgc3ViTmFtZSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYWNjLmNvbmNhdChuYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIFtdKTtcblxuICAgICAgcGFja2FnZU5hbWVzLnB1c2goLi4ubm9kZVBhY2thZ2VOYW1lcyk7XG4gICAgfVxuXG4gICAgY29uc3QgdmVyc2lvbnMgPSBwYWNrYWdlTmFtZXNcbiAgICAgIC5maWx0ZXIoeCA9PiBwYXR0ZXJucy5zb21lKHAgPT4gcC50ZXN0KHgpKSlcbiAgICAgIC5yZWR1Y2UoKGFjYywgbmFtZSkgPT4ge1xuICAgICAgICBpZiAobmFtZSBpbiBhY2MpIHtcbiAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9XG5cbiAgICAgICAgYWNjW25hbWVdID0gdGhpcy5nZXRWZXJzaW9uKG5hbWUsIHBhY2thZ2VSb290LCBtYXliZU5vZGVNb2R1bGVzKTtcblxuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30gYXMgeyBbbW9kdWxlOiBzdHJpbmddOiBzdHJpbmcgfSk7XG5cbiAgICBsZXQgbmdDbGlWZXJzaW9uID0gcGtnLnZlcnNpb247XG4gICAgaWYgKCFfX2Rpcm5hbWUubWF0Y2goL25vZGVfbW9kdWxlcy8pKSB7XG4gICAgICBsZXQgZ2l0QnJhbmNoID0gJz8/JztcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGdpdFJlZk5hbWUgPSAnJyArIGNoaWxkX3Byb2Nlc3MuZXhlY1N5bmMoJ2dpdCBzeW1ib2xpYy1yZWYgSEVBRCcsIHtjd2Q6IF9fZGlybmFtZX0pO1xuICAgICAgICBnaXRCcmFuY2ggPSBwYXRoLmJhc2VuYW1lKGdpdFJlZk5hbWUucmVwbGFjZSgnXFxuJywgJycpKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgfVxuXG4gICAgICBuZ0NsaVZlcnNpb24gPSBgbG9jYWwgKHYke3BrZy52ZXJzaW9ufSwgYnJhbmNoOiAke2dpdEJyYW5jaH0pYDtcbiAgICB9XG4gICAgbGV0IGFuZ3VsYXJDb3JlVmVyc2lvbiA9ICcnO1xuICAgIGNvbnN0IGFuZ3VsYXJTYW1lQXNDb3JlOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgaWYgKHByb2pQa2cpIHtcbiAgICAgIC8vIEZpbHRlciBhbGwgYW5ndWxhciB2ZXJzaW9ucyB0aGF0IGFyZSB0aGUgc2FtZSBhcyBjb3JlLlxuICAgICAgYW5ndWxhckNvcmVWZXJzaW9uID0gdmVyc2lvbnNbJ0Bhbmd1bGFyL2NvcmUnXTtcbiAgICAgIGlmIChhbmd1bGFyQ29yZVZlcnNpb24pIHtcbiAgICAgICAgZm9yIChjb25zdCBhbmd1bGFyUGFja2FnZSBvZiBPYmplY3Qua2V5cyh2ZXJzaW9ucykpIHtcbiAgICAgICAgICBpZiAodmVyc2lvbnNbYW5ndWxhclBhY2thZ2VdID09IGFuZ3VsYXJDb3JlVmVyc2lvblxuICAgICAgICAgICAgICAmJiBhbmd1bGFyUGFja2FnZS5zdGFydHNXaXRoKCdAYW5ndWxhci8nKSkge1xuICAgICAgICAgICAgYW5ndWxhclNhbWVBc0NvcmUucHVzaChhbmd1bGFyUGFja2FnZS5yZXBsYWNlKC9eQGFuZ3VsYXJcXC8vLCAnJykpO1xuICAgICAgICAgICAgZGVsZXRlIHZlcnNpb25zW2FuZ3VsYXJQYWNrYWdlXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBNYWtlIHN1cmUgd2UgbGlzdCB0aGVtIGluIGFscGhhYmV0aWNhbCBvcmRlci5cbiAgICAgICAgYW5ndWxhclNhbWVBc0NvcmUuc29ydCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG5hbWVQYWQgPSAnICcucmVwZWF0KFxuICAgICAgT2JqZWN0LmtleXModmVyc2lvbnMpLnNvcnQoKGEsIGIpID0+IGIubGVuZ3RoIC0gYS5sZW5ndGgpWzBdLmxlbmd0aCArIDMsXG4gICAgKTtcbiAgICBjb25zdCBhc2NpaUFydCA9IGBcbiAgICAgXyAgICAgICAgICAgICAgICAgICAgICBfICAgICAgICAgICAgICAgICBfX19fIF8gICAgIF9fX1xuICAgIC8gXFxcXCAgIF8gX18gICBfXyBfIF8gICBffCB8IF9fIF8gXyBfXyAgICAgLyBfX198IHwgICB8XyBffFxuICAgLyDilrMgXFxcXCB8ICdfIFxcXFwgLyBfXFxgIHwgfCB8IHwgfC8gX1xcYCB8ICdfX3wgICB8IHwgICB8IHwgICAgfCB8XG4gIC8gX19fIFxcXFx8IHwgfCB8IChffCB8IHxffCB8IHwgKF98IHwgfCAgICAgIHwgfF9fX3wgfF9fXyB8IHxcbiAvXy8gICBcXFxcX1xcXFxffCB8X3xcXFxcX18sIHxcXFxcX18sX3xffFxcXFxfXyxffF98ICAgICAgIFxcXFxfX19ffF9fX19ffF9fX3xcbiAgICAgICAgICAgICAgICB8X19fL1xuICAgIGAuc3BsaXQoJ1xcbicpLm1hcCh4ID0+IHRlcm1pbmFsLnJlZCh4KSkuam9pbignXFxuJyk7XG5cbiAgICB0aGlzLmxvZ2dlci5pbmZvKGFzY2lpQXJ0KTtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKGBcbiAgICAgIEFuZ3VsYXIgQ0xJOiAke25nQ2xpVmVyc2lvbn1cbiAgICAgIE5vZGU6ICR7cHJvY2Vzcy52ZXJzaW9ucy5ub2RlfVxuICAgICAgT1M6ICR7cHJvY2Vzcy5wbGF0Zm9ybX0gJHtwcm9jZXNzLmFyY2h9XG4gICAgICBBbmd1bGFyOiAke2FuZ3VsYXJDb3JlVmVyc2lvbn1cbiAgICAgIC4uLiAke2FuZ3VsYXJTYW1lQXNDb3JlLnJlZHVjZTxzdHJpbmdbXT4oKGFjYywgbmFtZSkgPT4ge1xuICAgICAgICAvLyBQZXJmb3JtIGEgc2ltcGxlIHdvcmQgd3JhcCBhcm91bmQgNjAuXG4gICAgICAgIGlmIChhY2MubGVuZ3RoID09IDApIHtcbiAgICAgICAgICByZXR1cm4gW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxpbmUgPSAoYWNjW2FjYy5sZW5ndGggLSAxXSArICcsICcgKyBuYW1lKTtcbiAgICAgICAgaWYgKGxpbmUubGVuZ3RoID4gNjApIHtcbiAgICAgICAgICBhY2MucHVzaChuYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhY2NbYWNjLmxlbmd0aCAtIDFdID0gbGluZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCBbXSkuam9pbignXFxuLi4uICcpfVxuXG4gICAgICBQYWNrYWdlJHtuYW1lUGFkLnNsaWNlKDcpfVZlcnNpb25cbiAgICAgIC0tLS0tLS0ke25hbWVQYWQucmVwbGFjZSgvIC9nLCAnLScpfS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgJHtPYmplY3Qua2V5cyh2ZXJzaW9ucylcbiAgICAgICAgICAubWFwKG1vZHVsZSA9PiBgJHttb2R1bGV9JHtuYW1lUGFkLnNsaWNlKG1vZHVsZS5sZW5ndGgpfSR7dmVyc2lvbnNbbW9kdWxlXX1gKVxuICAgICAgICAgIC5zb3J0KClcbiAgICAgICAgICAuam9pbignXFxuJyl9XG4gICAgYC5yZXBsYWNlKC9eIHs2fS9nbSwgJycpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VmVyc2lvbihcbiAgICBtb2R1bGVOYW1lOiBzdHJpbmcsXG4gICAgcHJvamVjdE5vZGVNb2R1bGVzOiBzdHJpbmcgfCBudWxsLFxuICAgIGNsaU5vZGVNb2R1bGVzOiBzdHJpbmcgfCBudWxsLFxuICApOiBzdHJpbmcge1xuICAgIHRyeSB7XG4gICAgICBpZiAocHJvamVjdE5vZGVNb2R1bGVzKSB7XG4gICAgICAgIGNvbnN0IG1vZHVsZVBrZyA9IHJlcXVpcmUocGF0aC5yZXNvbHZlKHByb2plY3ROb2RlTW9kdWxlcywgbW9kdWxlTmFtZSwgJ3BhY2thZ2UuanNvbicpKTtcblxuICAgICAgICByZXR1cm4gbW9kdWxlUGtnLnZlcnNpb247XG4gICAgICB9XG4gICAgfSBjYXRjaCAoXykge1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBpZiAoY2xpTm9kZU1vZHVsZXMpIHtcbiAgICAgICAgY29uc3QgbW9kdWxlUGtnID0gcmVxdWlyZShwYXRoLnJlc29sdmUoY2xpTm9kZU1vZHVsZXMsIG1vZHVsZU5hbWUsICdwYWNrYWdlLmpzb24nKSk7XG5cbiAgICAgICAgcmV0dXJuIG1vZHVsZVBrZy52ZXJzaW9uICsgJyAoY2xpLW9ubHkpJztcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICB9XG5cbiAgICByZXR1cm4gJzxlcnJvcj4nO1xuICB9XG59XG4iXX0=