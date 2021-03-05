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

＃ 実装リスト
|要素|完了|説明|
|:--|:--|:--|
|検索|:white_check_mark:|Youtube Music内での検索|
|動画直リン取得|:white_check_mark:|動画IDから直接リンク取得|
|おすすめ|:x:|Youtube Musicホームでの動画一覧取得|
|Browse|:white_check_mark:|日本のトップチャートなど|
|PlayList取得|:white_check_mark:|PlayListIDからPlayList取得|
|PlayList内の曲取得|:white_check_mark:|PlayList内の曲一覧取得|
