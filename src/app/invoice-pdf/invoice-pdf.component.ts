import {Component, Input, OnInit, ViewChild} from '@angular/core';
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
  // @ts-ignore
  @Input() invoiceDetails;
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
