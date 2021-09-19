import { UnknownColor } from "./Error/UnknownColorError";

export default class Pixel {

    private _value: string;

    constructor(value: string) {
        this._value = value;
    }

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        if (value === undefined || value.length !== 1) {
            try {
                throw new UnknownColor();
            } catch (error) {
                console.error(error.toString());
            }
        } else {
            this._value = value;
        }
    }

    public toString() {
        return this.value;
    }
}
