export class TagModel {
  constructor(public id: number, public text: string, public active: boolean, public isRecordInvactive: boolean = false) { }
}
