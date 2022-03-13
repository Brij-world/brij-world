import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private toastr: ToastrService) { }

    success(message) {
        this.toastr.success(message, 'Well done');
    }

    error(message) {
        this.toastr.error(message, 'Oh snap');
    }

    warn(message) {
        this.toastr.warning(message, 'Warning');
    }

    info(message) {
        this.toastr.info(message, 'Information');
    }

}