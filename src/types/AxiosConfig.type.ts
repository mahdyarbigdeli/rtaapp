export type IInclude = string;

export type ISearch<T> = Partial<Record<keyof T, any>>;

export type ISort<T> = Partial<
  Record<keyof T, "ASC" | "DESC" | "asc" | "desc" | null | undefined>
>;
export interface IParams<T> {
  sorts?: ISort<T>[];
  includes?: IInclude;
  search?: ISearch<T>;
  page?: number;
  per_page?: number;
  others?: any;
}

export interface IPaginationType {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
}

export interface IResponseAxios<T> {
  messages: Message[];
  data: T extends Array<any> ? T[] : T;
  meta: Meta;
}

export type IRequestAxios<T> = {
  page: number;
  per_page: number;
  searchs?: ISearch<T>;
} & ISort<T>;

interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

interface Message {
  type: string;
  text: string;
}
