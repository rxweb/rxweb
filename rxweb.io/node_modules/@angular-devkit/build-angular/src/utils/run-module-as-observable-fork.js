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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLW1vZHVsZS1hcy1vYnNlcnZhYmxlLWZvcmsuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2J1aWxkX2FuZ3VsYXIvc3JjL3V0aWxzL3J1bi1tb2R1bGUtYXMtb2JzZXJ2YWJsZS1mb3JrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBUUEsaURBQWtEO0FBQ2xELCtCQUErQjtBQUMvQiwrQkFBa0M7QUFDbEMsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBR3RDLG1DQUNFLEdBQVcsRUFDWCxVQUFrQixFQUNsQixVQUE4QjtBQUM5QixrQ0FBa0M7QUFDbEMsSUFBVztJQUVYLE1BQU0sQ0FBQyxJQUFJLGlCQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDMUIsTUFBTSxVQUFVLEdBQVcsY0FBTyxDQUFDLFNBQVMsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO1FBRXhFLE1BQU0sYUFBYSxHQUFHLGdEQUFnRCxDQUFDO1FBQ3ZFLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDL0MscUJBQXFCO1lBQ3JCLDREQUE0RDtZQUM1RCxNQUFNLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxXQUFXLEdBQWdCO1lBQy9CLEdBQUc7WUFDSCxRQUFRO1NBQ1ksQ0FBQztRQUV2Qiw0REFBNEQ7UUFDNUQsZ0JBQWdCO1FBQ2hCLG1DQUFtQztRQUNuQyxnQkFBZ0I7UUFDaEIsdUNBQXVDO1FBQ3ZDLHdDQUF3QztRQUN4QyxPQUFPO1FBQ1AsSUFBSTtRQUVKLE1BQU0sYUFBYSxHQUFHLG9CQUFJLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUUvRCxXQUFXO1FBQ1gsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLEVBQUU7WUFDN0IsRUFBRSxDQUFDLENBQUMsYUFBYSxJQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUN6QyxDQUFDO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsNkJBQTZCO1FBQzdCLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxJQUFhLEVBQUUsRUFBRTtZQUMvQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3BCLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2QsQ0FBQztZQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUM1QixHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakIsQ0FBQyxDQUFDO1FBQ0YsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUNuRCxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3JELGFBQWEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUVoRSw4QkFBOEI7UUFDOUIsTUFBTSx1QkFBdUIsR0FBRyxHQUFHLEVBQUU7WUFDbkMsaUJBQWlCLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUM7UUFDRixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBQzlDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFDaEQsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBRTNELGNBQWM7UUFDZCxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQ2pCLElBQUksRUFBRSxrQ0FBa0M7WUFDeEMsVUFBVTtZQUNWLFVBQVU7WUFDVixJQUFJO1NBQ0wsQ0FBQyxDQUFDO1FBRUgsK0RBQStEO1FBQy9ELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF2RUQsOERBdUVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgQnVpbGRFdmVudCB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9hcmNoaXRlY3QnO1xuaW1wb3J0IHsgRm9ya09wdGlvbnMsIGZvcmsgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmNvbnN0IHRyZWVLaWxsID0gcmVxdWlyZSgndHJlZS1raWxsJyk7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bk1vZHVsZUFzT2JzZXJ2YWJsZUZvcmsoXG4gIGN3ZDogc3RyaW5nLFxuICBtb2R1bGVQYXRoOiBzdHJpbmcsXG4gIGV4cG9ydE5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICBhcmdzOiBhbnlbXSxcbik6IE9ic2VydmFibGU8QnVpbGRFdmVudD4ge1xuICByZXR1cm4gbmV3IE9ic2VydmFibGUob2JzID0+IHtcbiAgICBjb25zdCB3b3JrZXJQYXRoOiBzdHJpbmcgPSByZXNvbHZlKF9fZGlybmFtZSwgJy4vcnVuLW1vZHVsZS13b3JrZXIuanMnKTtcblxuICAgIGNvbnN0IGRlYnVnQXJnUmVnZXggPSAvLS1pbnNwZWN0KD86LWJya3wtcG9ydCk/fC0tZGVidWcoPzotYnJrfC1wb3J0KS87XG4gICAgY29uc3QgZXhlY0FyZ3YgPSBwcm9jZXNzLmV4ZWNBcmd2LmZpbHRlcigoYXJnKSA9PiB7XG4gICAgICAvLyBSZW1vdmUgZGVidWcgYXJncy5cbiAgICAgIC8vIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9pc3N1ZXMvOTQzNVxuICAgICAgcmV0dXJuICFkZWJ1Z0FyZ1JlZ2V4LnRlc3QoYXJnKTtcbiAgICB9KTtcbiAgICBjb25zdCBmb3JrT3B0aW9uczogRm9ya09wdGlvbnMgPSB7XG4gICAgICBjd2QsXG4gICAgICBleGVjQXJndixcbiAgICB9IGFzIHt9IGFzIEZvcmtPcHRpb25zO1xuXG4gICAgLy8gVE9ETzogc3VwcG9ydCBwYXNzaW5nIGluIGEgbG9nZ2VyIHRvIHVzZSBhcyBzdGRpbyBzdHJlYW1zXG4gICAgLy8gaWYgKGxvZ2dlcikge1xuICAgIC8vICAgKGZvcmtPcHRpb25zIGFzIGFueSkuc3RkaW8gPSBbXG4gICAgLy8gICAgICdpZ25vcmUnLFxuICAgIC8vICAgICBsb2dnZXIuaW5mbywgLy8gbWFrZSBpdCBhIHN0cmVhbVxuICAgIC8vICAgICBsb2dnZXIuZXJyb3IsIC8vIG1ha2UgaXQgYSBzdHJlYW1cbiAgICAvLyAgIF07XG4gICAgLy8gfVxuXG4gICAgY29uc3QgZm9ya2VkUHJvY2VzcyA9IGZvcmsod29ya2VyUGF0aCwgdW5kZWZpbmVkLCBmb3JrT3B0aW9ucyk7XG5cbiAgICAvLyBDbGVhbnVwLlxuICAgIGNvbnN0IGtpbGxGb3JrZWRQcm9jZXNzID0gKCkgPT4ge1xuICAgICAgaWYgKGZvcmtlZFByb2Nlc3MgJiYgZm9ya2VkUHJvY2Vzcy5waWQpIHtcbiAgICAgICAgdHJlZUtpbGwoZm9ya2VkUHJvY2Vzcy5waWQsICdTSUdURVJNJyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBjaGlsZCBwcm9jZXNzIGV4aXQuXG4gICAgY29uc3QgaGFuZGxlQ2hpbGRQcm9jZXNzRXhpdCA9IChjb2RlPzogbnVtYmVyKSA9PiB7XG4gICAgICBraWxsRm9ya2VkUHJvY2VzcygpO1xuICAgICAgaWYgKGNvZGUgJiYgY29kZSAhPT0gMCkge1xuICAgICAgICBvYnMuZXJyb3IoKTtcbiAgICAgIH1cbiAgICAgIG9icy5uZXh0KHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgIG9icy5jb21wbGV0ZSgpO1xuICAgIH07XG4gICAgZm9ya2VkUHJvY2Vzcy5vbmNlKCdleGl0JywgaGFuZGxlQ2hpbGRQcm9jZXNzRXhpdCk7XG4gICAgZm9ya2VkUHJvY2Vzcy5vbmNlKCdTSUdJTlQnLCBoYW5kbGVDaGlsZFByb2Nlc3NFeGl0KTtcbiAgICBmb3JrZWRQcm9jZXNzLm9uY2UoJ3VuY2F1Z2h0RXhjZXB0aW9uJywgaGFuZGxlQ2hpbGRQcm9jZXNzRXhpdCk7XG5cbiAgICAvLyBIYW5kbGUgcGFyZW50IHByb2Nlc3MgZXhpdC5cbiAgICBjb25zdCBoYW5kbGVQYXJlbnRQcm9jZXNzRXhpdCA9ICgpID0+IHtcbiAgICAgIGtpbGxGb3JrZWRQcm9jZXNzKCk7XG4gICAgfTtcbiAgICBwcm9jZXNzLm9uY2UoJ2V4aXQnLCBoYW5kbGVQYXJlbnRQcm9jZXNzRXhpdCk7XG4gICAgcHJvY2Vzcy5vbmNlKCdTSUdJTlQnLCBoYW5kbGVQYXJlbnRQcm9jZXNzRXhpdCk7XG4gICAgcHJvY2Vzcy5vbmNlKCd1bmNhdWdodEV4Y2VwdGlvbicsIGhhbmRsZVBhcmVudFByb2Nlc3NFeGl0KTtcblxuICAgIC8vIFJ1biBtb2R1bGUuXG4gICAgZm9ya2VkUHJvY2Vzcy5zZW5kKHtcbiAgICAgIGhhc2g6ICc1ZDRiOWE1YzBhNGUwZjk5Nzc1OTg0MzdiMGU4NWJjYycsXG4gICAgICBtb2R1bGVQYXRoLFxuICAgICAgZXhwb3J0TmFtZSxcbiAgICAgIGFyZ3MsXG4gICAgfSk7XG5cbiAgICAvLyBUZWFyZG93biBsb2dpYy4gV2hlbiB1bnN1YnNjcmliaW5nLCBraWxsIHRoZSBmb3JrZWQgcHJvY2Vzcy5cbiAgICByZXR1cm4ga2lsbEZvcmtlZFByb2Nlc3M7XG4gIH0pO1xufVxuIl19