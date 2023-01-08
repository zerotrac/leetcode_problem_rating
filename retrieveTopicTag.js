const data = require("./data.json");
const axios = require("axios");
const fs = require("fs");

const delay = async (ms = 1000) => new Promise((r) => setTimeout(r, ms));
(async function () {
  console.log("START");
  let delayTime = 0; // 延時請求，防止對方 server 出現 code 429 (請求過於頻繁)
  const result = await Promise.all(
    data.map(async (datum, i) => {
      delayTime += 1000;
      await delay(delayTime);
      const res = await axios.post("https://leetcode.com/graphql/", {
        query:
          "\n    query singleQuestionTopicTags($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    topicTags {\n      name\n      slug\n    }\n  }\n}\n    ",
        variables: {
          titleSlug: datum.TitleSlug,
        },
      });
      const topicTags = res?.data?.data?.question?.topicTags || [];
      console.log(`Finished ${i + 1} request`);
      return { ...datum, topicTags };
    })
  );
  fs.writeFile("/public/localData.json", JSON.stringify(result), function (err) {
    if (err) return console.log(err);
    console.log("DONE");
  });
})();
