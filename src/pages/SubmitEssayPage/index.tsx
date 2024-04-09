import { useState } from 'react';
import Header from '../../components/Header';
import PageLayout from '../../components/PageLayout';
import { Readability } from '@mozilla/readability';
import DOMPurify from 'dompurify';
import showdown from 'showdown';
import TurndownService from 'turndown'
import { postData } from '../../utils/apiUtils';
import { API_URLS } from '../../utils/apiRoutes';

/*
*   This component is for testing purposes only 
*   and will be replaced by a chrome extension (or some other sort of cleaner ui)
*/
const SubmitEssayPage = () => {
    const [htmlInput, setHtmlInput] = useState('')
    const [renderedHtml, setRenderedHtml] = useState('');


    const processHtml = () => {
        const sanitizedHtml = DOMPurify.sanitize(htmlInput);
        const doc = new DOMParser().parseFromString(sanitizedHtml, 'text/html');
        const article = new Readability(doc).parse();

        var turndownService = new TurndownService();
        const markdown = article ? turndownService.turndown(article.content) : '';

        const converter = new showdown.Converter();
        const htmlOutput = converter.makeHtml(markdown);
        setRenderedHtml(htmlOutput);

        const data = {
            content: markdown,
        };

        postData(API_URLS.ESSAY, data, {});
    }

    return (
        <PageLayout>
            <Header title="Submit Essay Test" />
            <div>
                submit essay here
            </div>
            <textarea
                value={htmlInput}
                onChange={(e) => setHtmlInput(e.target.value)}
            />
            <button onClick={processHtml}>Process</button>
            <div dangerouslySetInnerHTML={{ __html: renderedHtml }}></div>
        </PageLayout>
    );
};

export default SubmitEssayPage;