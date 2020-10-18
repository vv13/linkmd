const fetch = require("node-fetch");

const REG_TITLE = /<title.*?>(.*?)<\/title>/;
const REG_H1 = /<h1.*?>(.*?)<\/h1>/;

async function requestHtmlBody(url) {
  return await fetch(url)
    .then((res) => res.text())
    .then((html) => ({ url, html }));
}

function parseHtmlBody({ url, html }) {
  const titles = [];
  [REG_TITLE, REG_H1].forEach((reg) => {
    const parsed = reg.exec(html);
    if (parsed && parsed.length === 2) {
      titles.push(parsed[1]);
    }
  });
  return {
    url,
    titles: Array.from(new Set(titles)),
  };
}

function convertUrl2md({ url, titles }) {
  return titles.map((title) => `(${title})[${url}]`);
}

async function main(urls) {
  const parseUrls = typeof urls === "string" ? [urls] : urls;
  const htmlDocs = await Promise.all(
    parseUrls.map((url) => requestHtmlBody(url))
  );
  return htmlDocs
    .map(parseHtmlBody)
    .map(convertUrl2md)
    .reduce((a, b) => a.concat(b));
}

module.exports = main;
