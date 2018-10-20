"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
const treeKill = require('tree-kill');
function runModuleAsObservableFork(cwd, modulePath, exportName, 
// tslint:disable-next-line:no-any
args) {
    return new rxjs_1.Observable(obs => {
        const workerPath = path_1.resolve(__dirname, './run-module-worker.js');
        const debugArgRegex = /--inspect(?:-brk|-port)?|--debug(?:-brk|-port)/;
        const execArgv = process.execArgv.filter((arg) => {
            // Remove debug args.
            // Workaround for https://github.com/nodejs/node/issues/9435
            return !debugArgRegex.test(arg);
        });
        const forkOptions = {
            cwd,
            execArgv,
        };
        // TODO: support passing in a logger to use as stdio streams
        // if (logger) {
        //   (forkOptions as any).stdio = [
        //     'ignore',
        //     logger.info, // make it a stream
        //     logger.error, // make it a stream
        //   ];
        // }
        const forkedProcess = child_process_1.fork(workerPath, undefined, forkOptions);
        // Cleanup.
        const killForkedProcess = () => {
            if (forkedProcess && forkedProcess.pid) {
                treeKill(forkedProcess.pid, 'SIGTERM');
            }
        };
        // Handle child process exit.
        const handleChildProcessExit = (code) => {
            killForkedProcess();
            if (code && code !== 0) {
                obs.error();
            }
            obs.next({ success: true });
            obs.complete();
        };
        forkedProcess.once('exit', handleChildProcessExit);
        forkedProcess.once('SIGINT', handleChildProcessExit);
        forkedProcess.once('uncaughtException', handleChildProcessExit);
        // Handle parent process exit.
        const handleParentProcessExit = () => {
            killForkedProcess();
        };
        process.once('exit', handleParentProcessExit);
        process.once('SIGINT', handleParentProcessExit);
        process.once('uncaughtException', handleParentProcessExit);
        // Run module.
        forkedProcess.send({
            hash: '5d4b9a5c0a4e0f9977598437b0e85bcc',
            modulePath,
            exportName,
            args,
        });
        // Teardown logic. When unsubscribing, kill the forked process.
        return killForkedProcess;
    });
}
exports.runModuleAsObservableFork = runModuleAsObservableFork;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLW1vZHVsZS1hcy1vYnNlcnZhYmxlLWZvcmsuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2J1aWxkX2FuZ3VsYXIvc3JjL3V0aWxzL3J1bi1tb2R1bGUtYXMtb2JzZXJ2YWJsZS1mb3JrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBUUEsaURBQWtEO0FBQ2xELCtCQUErQjtBQUMvQiwrQkFBa0M7QUFDbEMsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBR3RDLG1DQUNFLEdBQVcsRUFDWCxVQUFrQixFQUNsQixVQUE4QjtBQUM5QixrQ0FBa0M7QUFDbEMsSUFBVztJQUVYLE9BQU8sSUFBSSxpQkFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzFCLE1BQU0sVUFBVSxHQUFXLGNBQU8sQ0FBQyxTQUFTLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztRQUV4RSxNQUFNLGFBQWEsR0FBRyxnREFBZ0QsQ0FBQztRQUN2RSxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQy9DLHFCQUFxQjtZQUNyQiw0REFBNEQ7WUFDNUQsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLFdBQVcsR0FBZ0I7WUFDL0IsR0FBRztZQUNILFFBQVE7U0FDWSxDQUFDO1FBRXZCLDREQUE0RDtRQUM1RCxnQkFBZ0I7UUFDaEIsbUNBQW1DO1FBQ25DLGdCQUFnQjtRQUNoQix1Q0FBdUM7UUFDdkMsd0NBQXdDO1FBQ3hDLE9BQU87UUFDUCxJQUFJO1FBRUosTUFBTSxhQUFhLEdBQUcsb0JBQUksQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRS9ELFdBQVc7UUFDWCxNQUFNLGlCQUFpQixHQUFHLEdBQUcsRUFBRTtZQUM3QixJQUFJLGFBQWEsSUFBSSxhQUFhLENBQUMsR0FBRyxFQUFFO2dCQUN0QyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN4QztRQUNILENBQUMsQ0FBQztRQUVGLDZCQUE2QjtRQUM3QixNQUFNLHNCQUFzQixHQUFHLENBQUMsSUFBYSxFQUFFLEVBQUU7WUFDL0MsaUJBQWlCLEVBQUUsQ0FBQztZQUNwQixJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO2dCQUN0QixHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDYjtZQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUM1QixHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakIsQ0FBQyxDQUFDO1FBQ0YsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUNuRCxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3JELGFBQWEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUVoRSw4QkFBOEI7UUFDOUIsTUFBTSx1QkFBdUIsR0FBRyxHQUFHLEVBQUU7WUFDbkMsaUJBQWlCLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUM7UUFDRixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBQzlDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFDaEQsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBRTNELGNBQWM7UUFDZCxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQ2pCLElBQUksRUFBRSxrQ0FBa0M7WUFDeEMsVUFBVTtZQUNWLFVBQVU7WUFDVixJQUFJO1NBQ0wsQ0FBQyxDQUFDO1FBRUgsK0RBQStEO1FBQy9ELE9BQU8saUJBQWlCLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBdkVELDhEQXVFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEJ1aWxkRXZlbnQgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvYXJjaGl0ZWN0JztcbmltcG9ydCB7IEZvcmtPcHRpb25zLCBmb3JrIH0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5jb25zdCB0cmVlS2lsbCA9IHJlcXVpcmUoJ3RyZWUta2lsbCcpO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBydW5Nb2R1bGVBc09ic2VydmFibGVGb3JrKFxuICBjd2Q6IHN0cmluZyxcbiAgbW9kdWxlUGF0aDogc3RyaW5nLFxuICBleHBvcnROYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgYXJnczogYW55W10sXG4pOiBPYnNlcnZhYmxlPEJ1aWxkRXZlbnQ+IHtcbiAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKG9icyA9PiB7XG4gICAgY29uc3Qgd29ya2VyUGF0aDogc3RyaW5nID0gcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3J1bi1tb2R1bGUtd29ya2VyLmpzJyk7XG5cbiAgICBjb25zdCBkZWJ1Z0FyZ1JlZ2V4ID0gLy0taW5zcGVjdCg/Oi1icmt8LXBvcnQpP3wtLWRlYnVnKD86LWJya3wtcG9ydCkvO1xuICAgIGNvbnN0IGV4ZWNBcmd2ID0gcHJvY2Vzcy5leGVjQXJndi5maWx0ZXIoKGFyZykgPT4ge1xuICAgICAgLy8gUmVtb3ZlIGRlYnVnIGFyZ3MuXG4gICAgICAvLyBXb3JrYXJvdW5kIGZvciBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvaXNzdWVzLzk0MzVcbiAgICAgIHJldHVybiAhZGVidWdBcmdSZWdleC50ZXN0KGFyZyk7XG4gICAgfSk7XG4gICAgY29uc3QgZm9ya09wdGlvbnM6IEZvcmtPcHRpb25zID0ge1xuICAgICAgY3dkLFxuICAgICAgZXhlY0FyZ3YsXG4gICAgfSBhcyB7fSBhcyBGb3JrT3B0aW9ucztcblxuICAgIC8vIFRPRE86IHN1cHBvcnQgcGFzc2luZyBpbiBhIGxvZ2dlciB0byB1c2UgYXMgc3RkaW8gc3RyZWFtc1xuICAgIC8vIGlmIChsb2dnZXIpIHtcbiAgICAvLyAgIChmb3JrT3B0aW9ucyBhcyBhbnkpLnN0ZGlvID0gW1xuICAgIC8vICAgICAnaWdub3JlJyxcbiAgICAvLyAgICAgbG9nZ2VyLmluZm8sIC8vIG1ha2UgaXQgYSBzdHJlYW1cbiAgICAvLyAgICAgbG9nZ2VyLmVycm9yLCAvLyBtYWtlIGl0IGEgc3RyZWFtXG4gICAgLy8gICBdO1xuICAgIC8vIH1cblxuICAgIGNvbnN0IGZvcmtlZFByb2Nlc3MgPSBmb3JrKHdvcmtlclBhdGgsIHVuZGVmaW5lZCwgZm9ya09wdGlvbnMpO1xuXG4gICAgLy8gQ2xlYW51cC5cbiAgICBjb25zdCBraWxsRm9ya2VkUHJvY2VzcyA9ICgpID0+IHtcbiAgICAgIGlmIChmb3JrZWRQcm9jZXNzICYmIGZvcmtlZFByb2Nlc3MucGlkKSB7XG4gICAgICAgIHRyZWVLaWxsKGZvcmtlZFByb2Nlc3MucGlkLCAnU0lHVEVSTScpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgY2hpbGQgcHJvY2VzcyBleGl0LlxuICAgIGNvbnN0IGhhbmRsZUNoaWxkUHJvY2Vzc0V4aXQgPSAoY29kZT86IG51bWJlcikgPT4ge1xuICAgICAga2lsbEZvcmtlZFByb2Nlc3MoKTtcbiAgICAgIGlmIChjb2RlICYmIGNvZGUgIT09IDApIHtcbiAgICAgICAgb2JzLmVycm9yKCk7XG4gICAgICB9XG4gICAgICBvYnMubmV4dCh7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICBvYnMuY29tcGxldGUoKTtcbiAgICB9O1xuICAgIGZvcmtlZFByb2Nlc3Mub25jZSgnZXhpdCcsIGhhbmRsZUNoaWxkUHJvY2Vzc0V4aXQpO1xuICAgIGZvcmtlZFByb2Nlc3Mub25jZSgnU0lHSU5UJywgaGFuZGxlQ2hpbGRQcm9jZXNzRXhpdCk7XG4gICAgZm9ya2VkUHJvY2Vzcy5vbmNlKCd1bmNhdWdodEV4Y2VwdGlvbicsIGhhbmRsZUNoaWxkUHJvY2Vzc0V4aXQpO1xuXG4gICAgLy8gSGFuZGxlIHBhcmVudCBwcm9jZXNzIGV4aXQuXG4gICAgY29uc3QgaGFuZGxlUGFyZW50UHJvY2Vzc0V4aXQgPSAoKSA9PiB7XG4gICAgICBraWxsRm9ya2VkUHJvY2VzcygpO1xuICAgIH07XG4gICAgcHJvY2Vzcy5vbmNlKCdleGl0JywgaGFuZGxlUGFyZW50UHJvY2Vzc0V4aXQpO1xuICAgIHByb2Nlc3Mub25jZSgnU0lHSU5UJywgaGFuZGxlUGFyZW50UHJvY2Vzc0V4aXQpO1xuICAgIHByb2Nlc3Mub25jZSgndW5jYXVnaHRFeGNlcHRpb24nLCBoYW5kbGVQYXJlbnRQcm9jZXNzRXhpdCk7XG5cbiAgICAvLyBSdW4gbW9kdWxlLlxuICAgIGZvcmtlZFByb2Nlc3Muc2VuZCh7XG4gICAgICBoYXNoOiAnNWQ0YjlhNWMwYTRlMGY5OTc3NTk4NDM3YjBlODViY2MnLFxuICAgICAgbW9kdWxlUGF0aCxcbiAgICAgIGV4cG9ydE5hbWUsXG4gICAgICBhcmdzLFxuICAgIH0pO1xuXG4gICAgLy8gVGVhcmRvd24gbG9naWMuIFdoZW4gdW5zdWJzY3JpYmluZywga2lsbCB0aGUgZm9ya2VkIHByb2Nlc3MuXG4gICAgcmV0dXJuIGtpbGxGb3JrZWRQcm9jZXNzO1xuICB9KTtcbn1cbiJdfQ==