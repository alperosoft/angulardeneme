import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {Stkf} from "../../../models/stkf";
import {StkfService} from "../../../services/stkf.service";
import {DxChartModule} from "devextreme-angular";
import {
  DxiValueAxisModule,
  DxoCommonSeriesSettingsModule,
  DxoExportModule,
  DxoFormatModule,
  DxoGridModule,
  DxoLegendModule,
  DxoSeriesTemplateModule,
  DxoTitleModule,
  DxoTooltipModule,
  DxoZoomAndPanModule
} from "devextreme-angular/ui/nested";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-tahsilatlar',
  standalone: true,
  imports: [CommonModule, DxChartModule, DxiValueAxisModule, DxoCommonSeriesSettingsModule, DxoExportModule, DxoFormatModule, DxoGridModule, DxoLegendModule, DxoSeriesTemplateModule, DxoTitleModule, DxoTooltipModule, DxoZoomAndPanModule],
  templateUrl: './tahsilatlar.component.html',
  styleUrl: './tahsilatlar.component.scss'
})

export class TahsilatlarComponent implements OnInit {

  stkfsTahsilat: Stkf[];
  constructor(private stkfService: StkfService, private datePipe: DatePipe, private toastr: ToastrService,) {
  }

  ngOnInit(): void {
    this.getTahsilat();
  }

  private getTahsilat(): void {
    this.stkfService.getTahsilat().subscribe(x => {
      if (x) {
        if (x.statusCode === 200) {

          this.stkfsTahsilat = x.data;
          this.stkfsTahsilat.forEach(item => {
            item.sf_trh = this.datePipe.transform(item.sf_trh, 'yyyy-MM-dd');
          });
        }
      }
    }, error => {
      this.toastr.error('Veri hatası(Tahsilatlar)', 'Hata', {
        positionClass: 'toast-top-right',
      });
    });
  }

  customizeTooltip({argumentText, valueText}: Record<string, any>) {
    const element = document.createElement('span');
    element.textContent = valueText;
    element.style.color = 'red';
    element.className = 'active';
    element.style.fontWeight  = 'bold';
    const item = element.outerHTML;

    return {
      text: `Miktar: ${item}`,
    };
  }
}
