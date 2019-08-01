export interface DataElement {
  data: Array<number>,
  label?: string,
  borderColor?: Array<string>,
  borderWidth?: number,
  backgroundColor?: Array<string>
}

export interface ChartOptions {
  legend?: any,
  scales?: OptionScales,
  layout?: any,
  animation?: any,
  title?: any,
  tooltips?: any
}

export interface OptionScales {
  xAxes: Array<any>,
  yAxes: Array<any>
}

export interface DatasetsArray {
  [index: number] : DataElement;
}
