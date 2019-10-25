const request = require("request");
const ora = require("ora");

/**
 * 获取依赖包的最新版本
 * @param packageName
 * @returns {Promise<any>}
 */
function getPackageLatestVersion(packageName) {
  if (!packageName) throw new Error("package name is error!");
  return new Promise((resolve, reject) => {
    request(
      { url: `https://registry.npmjs.org/${packageName}` },
      (err, res, body) => {
        if (!err && res.statusCode === 200) {
          const { latest: latestVersion } = JSON.parse(body)["dist-tags"] || {
            latest: "none"
          };
          const res = {
            [packageName]: latestVersion
          };
          resolve(res);
        } else {
          reject("error");
        }
      }
    );
  });
}

// example
const ps = ["react", "react-dom", "vue", "vuex", "react-router"];
async function test(ps) {
  const res = {};
  for (let key of ps) {
    const version = await getPackageLatestVersion(key);
    res[key] = version[key];
  }
  return res;
}
const spinner = ora("checking...").start();
test(ps).then(r => {
  spinner.stop();
  console.log(JSON.stringify(r));
});
