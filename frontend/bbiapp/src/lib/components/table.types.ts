import type { Types, Actions } from "./table.enums";

type Data = {
   id: number;
} | any;

type Field = (agr: Data) => any;

type Choices = {
    value: string;
    label: string;
};

interface Column {
    name: string;
    color: string;
    type: Types;
    field: Field;
    tableVisible?: boolean;
    formVisible?: boolean;
    choices?: Choices[];
}

interface TableShape {
    columns: Column[];
    actions: Actions[];
    endpoint: string;
    titleColumn: string;
}

export type { Column, TableShape, Data, Field };