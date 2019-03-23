export interface IKeyedCollection<T> {
  add(key: string, value: T): void;
  contains(key: string): boolean;
  count(): number;
  item(key: string): T;
  keys(): string[];
  remove(key: string): T;
  values(): T[];
}

export class KeyedCollection<T> implements IKeyedCollection<T> {
  private items: { [index: string]: T } = {};

  private _count: number = 0;

  public contains(key: string): boolean {
    return this.items.hasOwnProperty(key);
  }

  public count(): number {
    return this._count;
  }

  public add(key: string, value: T): void {
    if (!this.items.hasOwnProperty(key)) this._count++;

    this.items[key] = value;
  }

  public remove(key: string): T {
    var val = this.items[key];
    delete this.items[key];
    this._count--;
    return val;
  }

  public item(key: string): T {
    return this.items[key];
  }

  public keys(): string[] {
    var keySet: string[] = [];

    for (var prop in this.items) {
      if (this.items.hasOwnProperty(prop)) {
        keySet.push(prop);
      }
    }

    return keySet;
  }

  public values(): T[] {
    var values: T[] = [];

    for (var prop in this.items) {
      if (this.items.hasOwnProperty(prop)) {
        values.push(this.items[prop]);
      }
    }

    return values;
  }
}
