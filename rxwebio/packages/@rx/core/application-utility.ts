export class ApplicationUtility {
    GetWeekStartAndEndDateMonth(date: Date): {[key:string]:any}{
    var year = date.getUTCFullYear(),
        month = date.getUTCMonth();
    var nextMonth = this.utcDate(year, month + 1, 28);
    var previousMonth = this.utcDate(year, month - 1, 28);
    var prevMonth = this.utcDate(year, month - 1, 28),
        day = this.daysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
    prevMonth.setUTCDate(day);
    prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - 0 + 7) % 7);
    var nextMonth = new Date(prevMonth.toString());
    nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
    previousMonth.setUTCDate(previousMonth.getUTCDate() + 1)
    nextMonth.setUTCDate(nextMonth.getUTCDate() - 1)
    return { startDate: previousMonth, endDate: nextMonth }
    }

    private isLeapYear(year: number): boolean {
        return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
    }

    private daysInMonth(year, month): number {
        return [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    }

    private utcDate(year: number, month: number, days: number): Date {
        return new Date(Date.UTC.apply(Date, [year, month, days]));
    }

}