#!/usr/bin/env node
const fetch = require("node-fetch");

const REG_TITLE = /<title.*?>(.*?)<\/title>/;
const REG_H1 = /<h1.*?>(.*?)<\/h1>/;
const REG_URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/

async function requestHtmlBody(url) {
  return await fetch(url).then(res => res.text()).then(html => ({ url, html }))
}

function parseHtmlBody({ url, html }) {
  const titles = [];
  [REG_TITLE, REG_H1].forEach(reg => {
    const parsed = reg.exec(html);
    if (parsed && parsed.length === 2) {
      titles.push(parsed[1])
    }
  })
  return {
    url,
    titles: Array.from(new Set(titles))
  }
}

function convertUrl2md({ url, titles }) {
  return titles.map(title => `(${title})[${url}]`)
}

async function main(urls) {
  if (urls.length === 0) {
    console.log('Usage: url2md <url1, url2, ...>')
    return
  }
  if (urls.some(url => !REG_URL.test(url))) {
    console.log('Please enter valid url')
    return
  }
  const htmlDocs = await Promise.all(urls.map(url => requestHtmlBody(url)))
  htmlDocs
    .map(parseHtmlBody)
    .map(convertUrl2md)
    .reduce((a, b) => a.concat(b))
    .forEach((res) => {
      console.log(res)
    })
}

main(process.argv.slice(2))