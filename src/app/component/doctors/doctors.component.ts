import { CommonModule } from '@angular/common';
import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

import { Subscription } from 'rxjs';
import { IDoctor } from '../../Models/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [
    NzTableModule,
    NzIconModule,
    CommonModule,
    NzModalModule,
    FormsModule,
  ],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss',
})
export class DoctorsComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('form') form!: TemplateRef<any>;
  constructor(
    private message: NzMessageService,
    private modal: NzModalService,
    private doctorSrv: DoctorService
  ) {}

  doctorInfo: IDoctor = {} as IDoctor;
  subscriptions: Subscription[] = [];
  searchText: string = '';
  editAppotBtn: boolean = false;

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly IDoctor[] = [];
  listOfData: IDoctor[] = [];
  setOfCheckedId = new Set<number>();
  filteredListOfData: IDoctor[] = [];

  // showDeleteConfirm(id: number): void {
  //   this.modal.confirm({
  //     nzTitle: 'Are you sure delete this Appointment?',
  //     nzContent: `<p class ="h5 "> for this user </p>`,
  //     nzOkText: 'Yes',
  //     nzOkType: 'primary',
  //     nzOkDanger: true,
  //     nzOnOk: () => this.deleteAppoin(id),
  //     nzCancelText: 'No',
  //   });
  // }
  // deleteAppoin(id: number): void {
  //   this.doctorSrv.deleteAppointement(id).subscribe((data) => {
  //     this.subscriptions.push(this.getAllDoctors());
  //   });
  // }
  // showEdit(appoID: number): void {
  //   this.editAppotBtn = true;
  //   let foundedAppoi: IDoctor | undefined = this.listOfData.find(
  //     (app) => app.id == appoID
  //   );

  //   // this.appontemint.id = foundedAppoi?.id!;
  //   // this.appontemint.image = foundedAppoi?.image!;
  //   // this.appontemint.name = foundedAppoi?.name!;
  //   // this.appontemint.email = foundedAppoi?.email!;
  //   // this.appontemint.date = foundedAppoi?.date!;
  //   // this.appontemint.time = foundedAppoi?.time!;
  //   // this.appontemint.mobile = foundedAppoi?.mobile!;
  //   // this.appontemint.doctor = foundedAppoi?.doctor!;
  //   // this.appontemint.inurjy = foundedAppoi?.inurjy!;
  //   // this.appontemint.gender = foundedAppoi?.gender!;

  //   this.modal.confirm({
  //     nzClosable: false,
  //     nzTitle: 'update Appointement',
  //     nzContent: this.form,
  //     nzOkDisabled: true,
  //     nzBodyStyle: {
  //       width: 'fit-content',
  //       background: ' rgba(255, 255, 255)',
  //     },

  //     nzStyle: { width: 'fit-content', top: '0px' },
  //     nzOkText: 'ESC',

  //     nzCancelText: 'Cancle',
  //   });
  // }
  // // updateAppoments(formAppo: NgForm) {
  // //   this.modal.closeAll();
  // //   this.doctorSrv
  // //     .updateAppointement()
  // //     .subscribe((data) => {
  // //       this.getAllDoctors();
  // //       formAppo.onReset();
  // //     });
  // // }
  addAppoi(): void {
    this.editAppotBtn = false;
    this.modal.confirm({
      nzClosable: false,
      nzTitle: 'Add New Appointement',
      nzContent: this.form,
      nzOkDisabled: true,
      nzBodyStyle: {
        width: 'fit-content',
        background: ' rgba(255, 255, 255)',
      },

      nzStyle: { width: 'fit-content', top: '0px' },
      nzOkText: 'ESC',

      nzCancelText: 'Cancle',
    });
  }
  search(): void {
    let filtered = this.listOfData.filter((item) =>
      item.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
    if (filtered.length > 0) {
      this.filteredListOfData = filtered;
    } else {
      this.filteredListOfData = [];
    }
  }
  delete(): void {
    this.listOfData = this.listOfData.filter((item) => {
      console.log(item);
      return !this.setOfCheckedId.has(item.id);
    });
    this.setOfCheckedId.clear();
    this.checked = false;
  }

  // addToAppoments(formAppo: NgForm) {
  //   this.modal.closeAll();
  //   this.doctorSrv
  //     .addAppointement(this.appontemint)
  //     .subscribe((data) => {
  //       this.message.create('success', `add succes ESC to close `);
  //       this.subscriptions.push(this.getAllDoctors());
  //     });
  //   formAppo.onReset();
  // }
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach((item) =>
      this.updateCheckedSet(item.id, value)
    );
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly IDoctor[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every((item) =>
      this.setOfCheckedId.has(item.id)
    );
    this.indeterminate =
      this.listOfCurrentPageData.some((item) =>
        this.setOfCheckedId.has(item.id)
      ) && !this.checked;
  }
  getAllDoctors(): Subscription {
    return this.doctorSrv.getAllDoctors().subscribe((data) => {
      this.listOfData = data;
    });
  }
  ngOnInit(): void {
    const subscriptionAllAppoi: Subscription = this.getAllDoctors();
    this.subscriptions.push(subscriptionAllAppoi);
  }
  ngOnChanges(): void {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
