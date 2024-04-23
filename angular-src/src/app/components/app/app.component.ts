// ---------------------------------------------------------
// --- 23.4.2024 Timo Kivinen
// ---------------------------------------------------------
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { LensItem } from '../../interface/lensitem';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {  
  newItem: LensItem = {
    name: '',
    price: 0,
    focallength: '',
    category: 'Wide',
  };
  items?: LensItem[];
  
  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit(): void {
    const onSuccess = (res: any) => {
      this.items = res?.items;
    };

    const onError = (err: any) => {
      console.error(err);
    };

    this.apiService.getLenses().subscribe({
      next: onSuccess,
      error: onError,
    });
  }

  private showFlashMessageAlert(text: string) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.flashMessagesService.show(text, {
      cssClass: 'alert-danger',
      timeout: 3000,
    });
  }

  private showFlashMessageSuccess(text: string) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.flashMessagesService.show(text, {
      cssClass: 'alert-success',
      timeout: 3000,
    });
  }

    
  addItem = (): void => {
    if (!this.validateService.validateLensItem(this.newItem)) {
      this.showFlashMessageAlert('Failed to add. Check all fields');
      return;
    }

    const onSuccess = (res: any) => {
      this.showFlashMessageSuccess(res?.msg);
      this.items?.push(res?.item);
      this.clearNewItemForm();
    };

    const onError = (err: any) => {
      this.showFlashMessageAlert(err?.msg);
    };

    this.apiService.postLensItem(this.newItem).subscribe({
      next: onSuccess,
      error: onError,
    });
  };

  deleteItem(item: LensItem) {
    const onSuccess = (res: any) => {
      this.showFlashMessageSuccess(res?.msg);
      const idx = this.items?.findIndex((i) => i._id === res?.item?._id);
      if (idx != undefined && idx !== -1) {
        this.items?.splice(idx, 1);
      }
    };

    const onError = (err: any) => {
      this.showFlashMessageAlert('Something went wrong.');
    };

    this.apiService.deleteLensItem(item).subscribe({
      next: onSuccess,
      error: onError,
    });
  }

  isUserAuthenticated(): boolean {
    return this.authService.isUserAuthenticated();
  }

  handleKeyUp(e: any) {
    if (e.key === 'Enter') {
      switch (e.target.id) {
      }
    }
  }

  clearNewItemForm(): void {
    this.newItem = {
      name: '',
      price: 0,
      focallength: '',
      category: 'Wide',
    };
  }

}
