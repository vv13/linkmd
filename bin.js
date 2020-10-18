#!/usr/bin/env node
const main = require("./index");
const REG_URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;

const urls = process.argv.slice(2);

if (urls.length === 0) {
  console.log("Usage: linkmd <url1, url2, ...>");
  return;
}
if (urls.some((url) => !REG_URL.test(url))) {
  console.log("Please enter valid url");
  return;
}
main(urls).then((res) => res.forEach(result => console.log(result)));
