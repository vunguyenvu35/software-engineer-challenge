export class ImageDto {
  get path(): string {
    return this._path;
  }

  set path(value: string) {
    this._path = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
  private _path: string;
  private _name: string;
  private _output_root = './storage/';

  public outpath() {
    return this._output_root + this._name;
  }
}
