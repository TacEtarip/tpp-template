import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function dateISOToStringDDMMYYYY(fecha: Date): string {
  const f = fecha.toISOString();
  const date = f.slice(0, 10).split('-');
  const aaaa = date[0];
  const mes = Number(date[1]);
  const mm = mes < 10 ? '0' + mes : mes;
  const dia = Number(date[2]);
  const dd = dia < 10 ? '0' + dia : dia;

  return `${aaaa}-${mm}-${dd}`;
}

export function yearMonthDayToIsoString(fecha: string) {
  const [year, month, day] = fecha.split('-');

  const tempDate = new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10)
  );

  return tempDate.toISOString();
}

export function setFilterValue<T>(
  filterOptions: T[],
  searchKey: string,
  searchText: string
): null | T {
  const indexOnResult = filterOptions.findIndex(
    (res) => (res[searchKey] || '').toUpperCase() === searchText.toUpperCase()
  );

  if (indexOnResult !== -1) {
    return filterOptions[indexOnResult];
  }

  return null;
}

export function showMenu(tipo: string) {
  const filtro = document.querySelector('#filter');
  const collapses = document.querySelectorAll('.collapse');
  const collapse = document.querySelector('#collapse-' + tipo);
  const listEl = filtro.querySelectorAll('li>button');

  listEl.forEach((eachEl) => {
    eachEl.classList.remove('active');
  });
  document.querySelector(`#${tipo}`).classList.add('active');
  collapses.forEach((eachEl) => {
    eachEl.classList.remove('show');
  });
  collapse.classList.add('show');
}

export function validatePatternObject(
  regex: RegExp,
  objectFieldToCheck: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const isAlphanumeric = regex.test(
      value[objectFieldToCheck] ? value[objectFieldToCheck] : value
    );

    return !isAlphanumeric ? { alphanumericRecalada: true } : null;
  };
}

export function formatearCadenasIndefinido(cadena: string) {
  let formato;

  switch (cadena) {
    case undefined:
      formato = '';
      break;
    case null:
      formato = '';
      break;
    default:
      formato = cadena;
      break;
  }

  return formato;
}

export function formatearFechaString(
  fechaHora: string,
  fechaFormatoInicial: string,
  fechaFormatoFin: string,
  requiereHora: boolean = false,
  horaFormatoFin: string = ''
): string {
  let sFormato;
  let sFecha;
  let sFormatoFecha = '';
  let sFormatoHora = '';

  switch (fechaFormatoInicial) {
    case 'yyyy-mm-dd':
      sFecha = fechaHora.slice(0, 10).split('-');
      sFormatoFecha = formatearFechasFinal(
        sFecha[2],
        sFecha[1],
        sFecha[0],
        fechaFormatoFin
      );
      break;
    case 'dd-mm-yyyy':
      sFecha = fechaHora.slice(0, 10).split('-');
      sFormatoFecha = formatearFechasFinal(
        sFecha[0],
        sFecha[1],
        sFecha[2],
        fechaFormatoFin
      );
      break;
    case 'dd/mm/yyyy':
      sFecha = fechaHora.slice(0, 10).split('/');
      sFormatoFecha = formatearFechasFinal(
        sFecha[0],
        sFecha[1],
        sFecha[2],
        fechaFormatoFin
      );
      break;
    default:
      sFormatoFecha = fechaHora;
      break;
  }

  if (requiereHora) {
    let hora = fechaHora.split(' ')[1];

    sFormatoHora = formatearHoraFinal(hora, horaFormatoFin);
  }

  sFormato = sFormatoFecha + ' ' + sFormatoHora;

  return sFormato.trim();
}

export function formatearFechaDate(
  fechaHora: Date,
  fechaFormatoFin: string,
  requiereHora: boolean = false,
  horaFormatoFin: string = ''
): string {
  let sFormato;
  let sFormatoFecha = '';
  let sFormatoHora = '';
  let sFechaHora = fechaHora.toLocaleString('es-ES').replace(',', '');

  let sFecha = sFechaHora.split(' ')[0];
  let dd =
    Number(sFecha.split('/')[0]) < 10
      ? '0' + sFecha.split('/')[0]
      : sFecha.split('/')[0];
  let mm =
    Number(sFecha.split('/')[1]) < 10
      ? '0' + sFecha.split('/')[1]
      : sFecha.split('/')[1];
  let yyyy = sFecha.split('/')[2];

  sFormatoFecha = formatearFechasFinal(dd, mm, yyyy, fechaFormatoFin);

  if (requiereHora) {
    let hora = sFechaHora.split(' ')[1];

    sFormatoHora = formatearHoraFinal(hora, horaFormatoFin);
  }

  sFormato = sFormatoFecha + ' ' + sFormatoHora;

  return sFormato.trim();
}

function formatearFechasFinal(
  dd: string,
  mm: string,
  yyyy: string,
  fechaFormatoFin: string
): string {
  let sFormato;
  let sdd = dd == undefined ? '' : dd;
  let smm = mm == undefined ? '' : mm;
  let syyyy = yyyy == undefined ? '' : yyyy;

  switch (fechaFormatoFin) {
    case 'yyyy-mm-dd':
      sFormato = `${syyyy}-${smm}-${sdd}`;
      break;
    case 'dd-mm-yyyy':
      sFormato = `${sdd}-${smm}-${syyyy}`;
      break;
    case 'dd/mm/yyyy':
      sFormato = `${sdd}/${smm}/${syyyy}`;
      break;
    default:
      sFormato = '';
      break;
  }

  return sFormato;
}

function formatearHoraFinal(hora: string, horaFormatoFin: string): string {
  let sFormato;
  let sHora = hora == undefined ? '' : hora;

  switch (horaFormatoFin) {
    case 'hh:mm':
      sFormato = sHora.slice(0, 5);
      break;
    case 'hh:mm:ss':
      sFormato = sHora.slice(0, 8);
      break;
    default:
      sFormato = sHora;
      break;
  }

  return sFormato;
}

export function sortObjectListByNumericProperty<T>(
  list: T[],
  property: string,
  sortDesc = true
) {
  list.sort((a, b) => {
    if (!sortDesc) {
      return (a[property] || -1) - (b[property] || -1);
    }
    return (b[property] || -1) - (a[property] || -1);
  });
  return list;
}

export function sortObjectListAlphabeticProperty<T>(
  list: T[],
  property: string,
  sortDesc = true
) {
  list.sort((a, b) => {
    if (!sortDesc) {
      return (a[property] || '').localeCompare(b[property] || '');
    }
    return (b[property] || '').localeCompare(a[property] || '');
  });
  return list;
}

export function sortObjectFromDateProperty<T>(
  list: T[],
  property: string,
  sortDesc = true
) {
  list.sort((a, b) => {
    const aDate = new Date(a[property] || '1995-09-01T00:00:09.000Z').getTime();
    const bDate = new Date(b[property] || '1995-09-01T00:00:09.000Z').getTime();
    if (!sortDesc) {
      return aDate - bDate;
    }
    return bDate - aDate;
  });
  return list;
}

export function sortObjectListBooleanProperty<T>(
  list: T[],
  property: string,
  sortDesc = true
) {
  list.sort((a, b) => {
    if (!sortDesc) {
      if (b[property] === a[property]) {
        return 0;
      }
      if (b[property]) {
        return -1;
      }
      return 1;
    }
    if (b[property] === a[property]) {
      return 1;
    }
    if (a[property]) {
      return -1;
    }
    return 0;
  });
  return list;
}
