export class DateDisabled {
    constructor(public date: Date, public title: string) { }
}

export class DateCollection {
    weeks: Week[];
    monthName: string;
    year: number;
    month: number;
    nextMonth: Date;
    previousMonth: Date;
}

export class Week {
    days: Day[];
}

export class Day {
    constructor(public date: Date,
        public selected: boolean,
        public isPreviousMonthDay: boolean,
        public year: number,
        public month: number,
        public day: number,
        public monthDate: number,
        public isDisabled: boolean,
        public isHighlighted: boolean,
        public dateDisabled: DateDisabled
    ) { }
}