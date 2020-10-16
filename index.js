const fetch = require("node-fetch");

const REG_BODY = new RegExp("<title.*?>(.*?)</title>");
async function convertUrl(url) {
  const title = await fetch(url)
    .then((res) => res.text())
    .then((html) => {
      const result = REG_BODY.exec(html);
      console.log(result.length)
      if (result.length === 2) {
        return result[1];
      }
    });
  return `[${title}](${url})`;
}

convertUrl("https://vv13.cn").then((mdUrl) => {
  console.log(mdUrl)
});
