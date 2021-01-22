import { PeriodType } from "src/app/enums/period-type.enum";

export interface Request {
    periodType?: PeriodType;
    from?: string;
    to?: string;
    cityId?: number;
    voivodeshipId?: number;
}