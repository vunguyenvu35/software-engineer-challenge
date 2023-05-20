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
  public async getElementHTML(document, selector): Promise<string> {
    const e = document.querySelector(selector);
    return e.outerHTML;
  }

  /**
   *
   * @param body
   */
  public async makeImage(body: any, image: ImageDto) {
    await nodeHtmlToImage({
      output: image.outpath(),
      html: body,
    });
  }
}
