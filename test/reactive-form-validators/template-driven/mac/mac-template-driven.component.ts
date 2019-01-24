import { Component } from "@angular/core";


export class MacAddressInfo {

	device: string;

	macAddress: string;

	localMacAddress: string;

	systemMacAddress: string;

}
@Component({
    selector: 'app-mac',
    template: `
    <form #macaddressinfoForm = "ngForm"  [rxwebForm]="macaddressinfoForm"> 
      <div class="form-group">
        <label>Device</label>
          <input type="text" name="device" [(ngModel)]="macaddressinfo.device"  class="form-control" />	
      </div>
      <div class="form-group">
        <label>Local MAC Address</label>
          <input type="text" name="localMacAddress" [(ngModel)]="macaddressinfo.localMacAddress"  class="form-control" [mac]="conditionalExpression"/>

      </div>
      <div class="form-group">
        <label>System MAC Address</label>
          <input type="text" name="systemMacAddress" [(ngModel)]="macaddressinfo.systemMacAddress"  class="form-control" [mac]="{'message':'System MAC Address is not a MAC address'}"/>
      </div>
      <button [disabled]="!macaddressinfoForm.valid" class="btn btn-primary">Submit</button>
    </form>
    `
  })
  export class MacValidationComponent {
    macaddressinfo: MacAddressInfo = new MacAddressInfo();
    conditionalExpression: { [key: string]: string } = {'conditionalExpression':'x => x.device ==\'Laptop\''}
  }