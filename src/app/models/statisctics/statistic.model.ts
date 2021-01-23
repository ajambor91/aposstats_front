export interface Statistics{
    name: string;
    series: Stat[];
}

interface Stat{
    name: string;
    value: number;
}