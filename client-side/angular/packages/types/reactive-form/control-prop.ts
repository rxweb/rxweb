import { IAbstractControl } from './i-abstract-control'

export type ControlProp<T> = {
    [key in keyof T]: IAbstractControl<T[key], T>;
}