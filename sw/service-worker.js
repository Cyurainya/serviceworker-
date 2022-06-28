const _this = this;
const version = "v1";
const cacheFile = [
  "/",
  "./../src/index.html",
  "./../src/index.js",
  "./../src/index.css",
]
// 当浏览器解析完SW文件时触发install事件
this.addEventListener("install", (event) => { 
  // install事件一般会将cacheList中要缓存的内容通过addAll方法请求一遍存入caches中
  event.waitUntil(
    caches
    .open(version)
    .then((cache) => {
      return cache.addAll(cacheFile)
    })
  )
})
// 激活时触发activate事件
this.addEventListener("activate", (event) => {
  const whileList = [version];
  event.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            console.log('keyList',keyList)
            // 资源匹配到就删除
            if (!whileList.includes(key)) {
              return caches.delete(key);
            }
          })
        )
      })
  )
});
this.addEventListener("fetch", async (event) => {
  const { request } = event;
  event.respondWith(
    caches
      .match(request.clone())
      .catch(() => {
        return fetch(request.clone()).catch()
      })
  );
});

