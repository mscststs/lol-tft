

## api 列表

1. 下面接口中的 accountType 和 id 既可以使用 accountType 2 + openid，也可以直接使用 accountType 1 + QQ 号。  
  openid 可以从召唤师搜索，或者从对局记录里面获取

### 召唤师搜索
```
POST https://www.wegame.com.cn/api/v1/wegame.pallas.game.LolBattle/SearchPlayer
{"nickname":"心悦俱乐部V3会员","from_src":"lol_helper"}

{"result":{"error_code":0,"error_message":"success"},"players":[{"openid":"rGAKUbGBvYIYgMiJ5lIjcA==","area":4,"icon_id":4780,"level":37,"tier":255,"queue":0},{"openid":"h93bfiFISmJEaWnuohiFsQ==","area":1,"icon_id":1388,"level":183,"tier":255,"queue":0}]}
```

### 获取对局列表

使用上文获取的id，来请求对局记录
```
POST https://www.wegame.com.cn/api/v1/wegame.pallas.game.LolBattle/GetBattleList
{"account_type":1,"id":"2817263026","area":1,"offset":28,"count":7,"filter":"","from_src":"lol_helper"}

> ./sample/gamelist_result.json
```

### 获取对局明细

根据对局记录提供的 gameid ，来获取对局详情  
对局详情包含出装、符文、伤害、经济等所有对局数据。  
```
POST https://www.wegame.com.cn/api/v1/wegame.pallas.game.LolBattle/GetBattleDetail
{"account_type":2,"id":"AQTmSkLAFrhHYiOubxdmZw==","area":1,"game_id":7424037960,"from_src":"lol_helper"}

> ./sample/gameid_result.json
```

符文映射表: https://game.gtimg.cn/images/lol/act/img/js/runeList/rune_list.js
英雄映射表：https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js
装备映射表：https://game.gtimg.cn/images/lol/act/img/js/items/items.js
召唤师技能映射表：https://game.gtimg.cn/images/lol/act/img/js/summonerskillList/summonerskill_list.js
英雄说明和映射表：https://game.gtimg.cn/images/lol/act/img/js/hero/17.js (17替换为英雄id)

英雄图标：从英雄说明中获取