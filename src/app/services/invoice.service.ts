import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private getInvoiceDetailsUrl = '';

  constructor(private http: HttpClient) {
  }

  getInvoiceDetails(invoiceReferenceNumber): any {
    return this.http.get(this.getInvoiceDetailsUrl + invoiceReferenceNumber);
  }
}
