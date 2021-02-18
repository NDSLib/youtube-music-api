# youtube-music-api
Youtube Music 内部API用ライブラリ

# npm runs
./src/config.jsに以下を書き込んで保存
```
const key = '自分のAPIキー'
module.exports = {key}
```
※自分のAPIキーは開発者モードで探してね！ネットワークタブで監視するとそのうちクエリに入ってるやつが見つかるよ！

```
npm run dev // 推しの動画サムネイルリンクが取得できれば成功!
```
