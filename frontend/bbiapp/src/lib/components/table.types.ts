import type { SvelteComponent } from "svelte";
import type { Types, Actions, Position } from "./table.enums";

type Data = {
   id: number;
} | any;

type Field = (agr: Data) => any;

type Choices = {
    value: number | string;
    label: string;
};

interface Column {
    name: string;
    color: string;
    type: Types;
    field: Field;
    fieldName?: string;
    tableVisible?: boolean;
    formVisible?: boolean;
    choices?: Choices[];
    position?: Position;
}

interface TableShape {
    columns: Column[];
    actions: Actions[];
    endpoint: string;
    titleColumn: string;
    detailComponent?: any;
}

export type { Column, TableShape, Data, Field };