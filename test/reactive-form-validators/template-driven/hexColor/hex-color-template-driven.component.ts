import { Component } from "@angular/core";


export class HexcolorInfo {

	color: string;

	footerHexCode: string;

	headerHexcolorCode: string;

	bodyHexcolorCode: string;

}
@Component({
    selector: 'app-hexColor',
    template: `
    <form #hexcolorinfoForm = "ngForm" [rxwebForm]="hexcolorinfoForm">
      <div class="form-group">
        <label>Color Picker</label>
          <input type="text" name="color" [(ngModel)]="hexcolorinfo.color"  class="form-control" hexColor/>
      </div>
      <div class="form-group">
        <label>Header Hexcode</label>
          <input type="text" name="headerHexcolorCode" [(ngModel)]="hexcolorinfo.headerHexcolorCode"  class="form-control" [hexColor]="conditionalExpression"/>
      </div>
      <div class="form-group">
        <label>Body Hexcode</label>
          <input type="text" name="bodyHexcolorCode" [(ngModel)]="hexcolorinfo.bodyHexcolorCode"  class="form-control" [hexColor]="message"/>

      </div>
      <button [disabled]="!hexcolorinfoForm.valid" class="btn btn-primary">Submit</button>
    </form>
    `
  })
  export class HexColorValidationComponent {
    hexcolorinfo: HexcolorInfo = new HexcolorInfo();
    conditionalExpression: { [key: string]: string } = { 'conditionalExpression':'x => x.color == \'#AFAFAF\'' }
    message = {'message':'Please enter the right format of hexcode for body like \'#AFAFAF\''}
  }