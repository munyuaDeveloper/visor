import {Component, OnInit} from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {ActivatedRoute} from '@angular/router';
import {CurrencyPipe, DatePipe, TitleCasePipe} from '@angular/common';
import {InvoiceService} from '../services/invoice.service';

@Component({
  selector: 'app-invoice-pdf',
  templateUrl: './invoice-pdf.component.html',
  styleUrls: ['./invoice-pdf.component.scss']
})
export class InvoicePdfComponent implements OnInit {
  details: any;
  url = '../../../../assets/img/new_logo2.png';
  urlData: any;
  signData: any;
  layout = {
    defaultBorder: true,
    hLineWidth: function(i, node) {
      return (i === 0 || i === node.table.body.length) ? 1 : 1;
    },
    vLineWidth: function(i, node) {
      return (i === 0 || i === node.table.widths.length) ? 1 : 1;
    },
    hLineColor: function(i, node) {
      return (i === 0 || i === node.table.body.length) ? '#d6d1d1' : '#d6d1d1';
    },
    vLineColor: function(i, node) {
      return (i === 0 || i === node.table.widths.length) ? '#d6d1d1' : '#d6d1d1';
    }
  };
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

  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private dateFormat: DatePipe,
    private titleCase: TitleCasePipe,
    private currencyPipe: CurrencyPipe) {
  }

  ngOnInit(): any {
    this.toDataURL(this.url, (dataUrl) => {
      this.urlData = dataUrl;
      // console.log('RESULT:',  this.urlData);
      localStorage.setItem('url', dataUrl);
    });
    this.urlData = localStorage.getItem('url');
    localStorage.removeItem('url');

  }


  getInvoiceDetails(): any {
    // this.invoiceService.getInvoiceDetails('invoiceReferenceNumber').subscribe(res => {
    let invoiceStatus: any;
    if (this.invoiceDetails['status'] === 'PENDING') {
      invoiceStatus = {
        text: this.invoiceDetails['status'] + '\n',
        bold: true,
        fontSize: 18,
        color: '#7755e3'
      };
    }else {
      invoiceStatus = {
        text: this.invoiceDetails['status'] + '\n',
        bold: true,
        fontSize: 18,
        color: '#7755e3'
      };
    }


    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this.details = {
      pageSize: 'A4',
      // pageOrientation: 'landscape',
      content: [

        {
          columns: [
            // {
            //   image: this.urlData,
            //   width: 180,
            //   alignment: 'center'
            // },
          ],
        },
        {
          columns: [
            {
              text: [
                {
                  text: 'Visor Solutions \n',
                  bold: true,
                  fontSize: 18,
                  color: '#111b4c'
                },
                'Phone: +254707667640, \n',
                'Email: info@gmail.com, \n',
                'Location: Kimathi Street, Nyeri\n\n',
                {
                  text: 'Invoice to: \n',
                  bold: true
                },
                'Account type: ' + this.invoiceDetails?.account_type + '\n',
                'Account no: ' + this.invoiceDetails?.account_number
              ],
              width: '60%',
              alignment: 'left',
              margin: [0, 5, 0, 0]
            },
            {
              text: [
                {
                  text: 'Invoice ',
                  bold: true,
                  fontSize: 18,
                },
                invoiceStatus,
                {
                  text: 'Invoice ',
                  bold: true,
                },
                this.invoiceDetails?.reference_number + '\n\n\n\n',
                {
                  text: 'Invoice Date ',
                  bold: true,
                },
                this.dateFormat.transform(this.invoiceDetails?.date_generated, 'mediumDate'),
                {
                  text: '\n Due Date ',
                  bold: true,
                },
                this.dateFormat.transform(this.invoiceDetails?.date_due, 'mediumDate')
              ],
              width: '*',
              alignment: 'right',
            },
          ],
        },
        {
          table: {
            widths: ['5%', '20%', '45%', '*'],
            body: this.returnInvoiceItems(this.invoiceDetails.invoice_items)
          },
          layout: this.layout,
          margin: [0, 20]
        },
        {
          table: {
            widths: ['5%', '20%', '45%', '*'],
            body: [
              [
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: 'Total',
                  bold: true,
                  alignment: 'right',
                  border: [false, true, false, false],
                },
                {
                  text: '' + this.currencyPipe.transform(this.invoiceDetails?.amount, ' Ksh. ') + '\n',
                  alignment: 'right',
                  border: [false, true, false, false],
                }
              ],
              [
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: 'Payment made',
                  bold: true,
                  alignment: 'right',
                  border: [false, true, false, false],
                },
                {
                  text: '' + this.currencyPipe.transform(this.invoiceDetails?.amount, ' Ksh. ') + '\n',
                  alignment: 'right',
                  border: [false, true, false, false],
                }
              ],
              [
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: 'Outstanding amount',
                  bold: true,
                  alignment: 'right',
                  border: [false, true, false, false],
                  fillColor: '#f6f0f0'
                },
                {
                  text: '' + this.currencyPipe.transform(this.invoiceDetails['outstanding_amount'], ' Ksh. ') + '\n',
                  alignment: 'right',
                  border: [false, true, false, false],
                  fillColor: '#f6f0f0'
                }
              ],
              [
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  colSpan: 2,
                  text: '',
                  border: [false, true, false, false],
                },
                {
                  text: ''
                }
              ]
            ]
          },
          layout: this.layout,
        },
      ],
      styles: {
        header: {
          fontSize: 14,
          bold: true,
          alignment: 'justify'
        },
        underline: {
          decoration: 'underline',
          decorationStyle: 'dotted',
          decorationColor: 'gray'
        },
        section: {
          fillColor: '#E1ECEB',
          margin: [15, 0]
        }
      }
    };

    this.openPDF();
    // });
  }

  openPDF(): any {
    pdfMake.createPdf(this.details).open();
  }

  toDataURL(url, callback): any {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      const reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  returnInvoiceItems(invoiceItemsList: []): any[] {
    const invoiceItems = [
      [
        {
          text: '#',
          bold: true,
          fontSize: 14,
        },
        {
          text: 'ITEM',
          bold: true,
          fontSize: 14,
        },
        {
          text: 'NARRATION',
          bold: true,
          fontSize: 14,
        },
        {
          text: 'TOTAL',
          bold: true,
          fontSize: 14,
          alignment: 'right',
        },
      ]
    ];
    let invoiceItem =
      [
        {
          text: '',
          bold: true,
          fontSize: 14,
        },
        {
          text: '',
          bold: true,
          fontSize: 14,
        },
        {
          text: '',
          bold: true,
          fontSize: 14,
        },
        {
          text: '',
          bold: true,
          fontSize: 14,
          alignment: 'right',
        },
      ];

    for (let i = 0; i < invoiceItemsList.length; i++) {
      invoiceItem = [
        {
          text: '' + (i + 1),
          bold: false,
          fontSize: 13,
        },
        {
          text: '' + invoiceItemsList[i]['invoice_item'],
          bold: false,
          fontSize: 13,
        },
        {
          text: '' + invoiceItemsList[i]['narration'],
          bold: false,
          fontSize: 13,
        },
        {
          text: '' + this.currencyPipe.transform(invoiceItemsList[i]['amount'], ' Ksh. '),
          bold: false,
          fontSize: 13,
          alignment: 'right',
        },
      ];
      invoiceItems.push(invoiceItem);
    }
    return invoiceItems;
  }
}
