import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import * as XLSX from 'xlsx';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  static toExportFileName(excelFileName: string): string {
    return `${excelFileName}_${new Date().getTime()}.xlsx`;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { reporte: worksheet },
      SheetNames: ['reporte'],
    };
    XLSX.writeFile(workbook, ExcelService.toExportFileName(excelFileName));
  }

  mapDataForExcelReport(
    mapObject: Record<string, ExcelMapObject>,
    originalJson: any[]
  ) {
    if (originalJson.length === 0) {
      const temporalJsonObj: any = {};
      originalJson = [temporalJsonObj];
    }
    return originalJson.map((os) => this.mapExcelFunction(os, mapObject));
  }

  private mapExcelFunction(os: any, mapObject: Record<string, ExcelMapObject>) {
    const reportObj: Record<string, string> = {};
    for (const key in mapObject) {
      if (Object.prototype.hasOwnProperty.call(mapObject, key)) {
        let value = os[key];

        if (mapObject[key].innerMap && value) {
          value = mapObject[key].innerMap[os[key]] as string;
        }

        if (mapObject[key].dateTransform && value) {
          value = formatDate(
            os[key],
            mapObject[key].dateFormat || 'dd/LL/y',
            this.locale
          );
        }

        reportObj[mapObject[key].mapTo] = value || '';
      }
    }
    return reportObj;
  }
}

interface ExcelMapObject {
  mapTo: string;
  dateTransform?: boolean;
  dateFormat?: string;
  innerMap?: Record<string | number, string | number>;
}
