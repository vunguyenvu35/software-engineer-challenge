import nodeHtmlToImage from 'node-html-to-image';

export class CrawlerService {
  /**
   *
   * @param url
   */
  public async fetchData(url: string) {
    try {
      // Fetch data from URL and store the response into a const
      const response = await fetch(url);
      // Convert the response into text
      return await response.text();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   * @param str
   */
  public parserHtml(str: string) {
    const parser = new DOMParser();
    return parser.parseFromString(str, 'text/html');
  }

  /**
   *
   * @param body
   */
  public async makeImage(body: any) {
    await nodeHtmlToImage({
      output: './storage/image.png',
      html: body,
    });
  }
}
