import { Subscribable } from "rxjs";

export var global: {
    [key: string]: Subscribable<any>
};