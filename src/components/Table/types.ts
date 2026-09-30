export type handlerType = { 
    event: React.ChangeEvent<HTMLSelectElement|HTMLInputElement>,
    data: any
}

export type ActionsT = {
    name: string;
    function:(value: any) => void;
}

export type ColumnDefinitionType<T> = {
    [K in keyof T]: {
      key?: K;
      header: string;
      format?: (row: T, handler: (data: handlerType) => void) => React.ReactNode;
    };
  }[keyof T];

