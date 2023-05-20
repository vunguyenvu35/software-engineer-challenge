import nodeHtmlToImage from 'node-html-to-image';
import { ImageDto, PageDto } from '../dto';
export class CrawlerService {
  /**
   *
   * @param url
   */
  public async fetchData(url: string): Promise<PageDto> {
    try {
      // Fetch data from URL and store the response into a const
      const response = await fetch(url);
      // Convert the response into text
      const html = await response.text();
      const page = new PageDto();
      page.content_raw = html;
      page.convertRawToDocument();
      return page;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   * @param document
   * @param selector
   */
  public async getElementHTML(document: any, selector: any): Promise<string> {
    const e = document.querySelector(selector);
    if (e == null) {
      return null;
    }
    return e.outerHTML;
  }

  /**
   * @Description
   *    Make image from data.
   * @param body
   * @param image
   */
  public async makeImage(body: any, image: ImageDto) {
    await nodeHtmlToImage({
      output: image.outpath(),
      type: 'png',
      transparent: true,
      html:
        '<html>' + ' <body bgcolor="#ffffff"> ' + body + '</body>' + '</html>',
    });
  }
}
