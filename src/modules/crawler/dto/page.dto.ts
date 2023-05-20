const jsdom = require('jsdom');
const { JSDOM } = jsdom;

export class PageDto {
  get content_raw(): string {
    return this._content_raw;
  }

  set content_raw(value: string) {
    this._content_raw = value;
  }

  get document(): any {
    return this._document;
  }

  set document(value: any) {
    this._document = value;
  }
  private _content_raw!: string;
  private _document: any;

  public convertRawToDocument() {
    const { document } = new JSDOM(this.content_raw).window;
    this.document = document;
  }
}
