import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  invoiceDetails: any = {
    id: 'de26aaa4-f74f-4ad0-8d7a-8a7964b373ae',
    reference_number: 'LB12ZOUD7O',
    amount: '100.00',
    outstanding_amount: '100.00',
    status: 'PENDING',
    balance: 100,
    date_generated: '2021-02-21 22:42:59',
    expiry_date: '2021-02-22 06:49:39',
    date_due: '2022-01-19 10:15:20',
    customer: '26524105-830a-43bf-94f1-b96c36d38a46',
    estate_unit: '',
    account_type: 'STAGE',
    account_number: 'KCK090K',
    invoice_items: [
      {
        id: '4cf8f2fa-22a5-40dc-b531-367b9b10a351',
        invoice_item: 'DELIVERY',
        narration: 'DELIVERY ITEM DELIVERY ITEM DELIVERY ITEM DELIVERY ITEM DELIVERY ITEM',
        amount: '100.00',
        invoice: 'de26aaa4-f74f-4ad0-8d7a-8a7964b373ae'
      },
      {
        id: '4cf8f2fa-22a5-40dc-b531-367b9b10a351',
        invoice_item: 'MEDICAL',
        narration: 'MEDICAL ITEM',
        amount: '100.00',
        invoice: 'de26aaa4-f74f-4ad0-8d7a-8a7964b373ae'
      }
    ],
    allow_partial_payment: false,
    is_eligible_for_payment: true,
    is_waived: false,
    payment_for: 'Stage Delivery',
    invoice_fee_schedule: {
      id: 'f49d7b44-d7f7-4ae5-8765-981a656f9a1b',
      name: 'Stage Delivery',
      transaction_code: 'DELIVERY_INVOICE'
    },
    invoice_financial_year: {
      id: '0ab8653e-acee-4f23-ae26-24f1d1fb828a',
      year: '2021',
      is_current_year: true
    },
    payments: [],
    receipts: {},
    invoice_remarks: []
  };
  title = 'visor';
}
