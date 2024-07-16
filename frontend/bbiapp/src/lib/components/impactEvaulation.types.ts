type ImpactTime = {
    time: number;
    impactSize: number;
};

type ImpactType = {
    name: string;
    impacts: ImpactTime[];
    scaleMin: number;
    scaleMax: number;
    colors: string[];
};

export type { ImpactTime, ImpactType };