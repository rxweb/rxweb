import * as chalk from 'chalk'
export class Notify {
    static totalTime: number;
    static createdOrUpdated(action: string, message: string) {
        console.log(`${chalk.greenBright(action)} ${message}`);
    }

    static log(message: string) {
        console.log(`${chalk.green(message)}`);
    }


    static startTime() {
        Notify.totalTime = new Date().getTime();
    }

    static timeEnd(message: string) {
        let total = new Date().getTime() - Notify.totalTime;
        Notify.log(`${message}, Total Time Taken:${total}`)
    }


    static error(message: string) {
        throw message;
    }
}

