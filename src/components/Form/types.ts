export type TFieldType = '' | 'email' | 'phone' | 'link';
export type TFieldValue = string;
export type TOptions = string[];
export type TError = string | null;

export interface IField {
  type: TFieldType;
  value: TFieldValue;
  id: number;
  error: TError;
}

export type TFields = IField[];


export interface IFieldResult {
  type: string;
  value: string;
}

export type TArraysResult = Array<string[]> | null;
export type TObjectsResult = IFieldResult[] | null;
