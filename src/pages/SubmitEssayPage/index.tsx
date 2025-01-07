import { useState } from 'react';
import Header from '../../components/Header';
import PageLayout from '../../components/PageLayout';
import { Readability } from '@mozilla/readability';
import DOMPurify from 'dompurify';
import TurndownService from 'turndown';
import { postData } from '../../utils/apiUtils';
import { API_URLS } from '../../utils/apiRoutes';

/*
 *   This component is for testing purposes only
 *   and will be replaced by a chrome extension (or some other sort of cleaner ui)
 */
const SubmitEssayPage = () => {
  const [htmlInput, setHtmlInput] = useState('');

  const processHtml = () => {
    const extractTitle = (htmlString: String) => {
      const match = htmlString.match(/<title>(.*?)<\/title>/i); // Case insensitive match
      return match ? match[1] : 'No title found';
    };
    const title = extractTitle(htmlInput);
    const sanitizedHtml = DOMPurify.sanitize(htmlInput, {
      ADD_TAGS: ['title'],
    });
    const doc = new DOMParser().parseFromString(sanitizedHtml, 'text/html');
    const article = new Readability(doc).parse();

    var turndownService = new TurndownService();
    const markdown = article
      ? turndownService.turndown(article.content)
      : 'Error converting content to Markdown';

    postData(API_URLS.ESSAY, { title: title, content: markdown }, {});
  };

  return (
    <PageLayout>
      <Header title="Submit Essay Test" />
      <div>Submit Essay here as HTML</div>
      <textarea
        value={htmlInput}
        onChange={(e) => setHtmlInput(e.target.value)}
      />
      <button onClick={processHtml}>Process</button>
    </PageLayout>
  );
};

export default SubmitEssayPage;
