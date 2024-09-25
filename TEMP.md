
# MessageJSON from reindexer

```
type MessageJSON struct {
	ID           int    `json:"id"`
	Hash         string `json:"hash" validate:"required"`
	IdExternal   string `json:"id_external"`
	TimeCreate   int    `json:"timeCreate"`
	Title        string `json:"title"`
	Hub          string `json:"hub"`
	HubType      string `json:"hubtype"`
	Url          string `json:"url"`
	Type         string `json:"type"`
	
	CommentsCount  FlexInt     `json:"commentsCount"`
	AudienceCount  FlexInt     `json:"audienceCount"`
	CiteIndex      FlexInt     `json:"citeIndex"`
	RepostsCount   FlexInt     `json:"repostsCount"`
	LikesCount     FlexInt     `json:"likesCount"`
	ER             FlexInt     `json:"er"`
	ViewsCount     FlexInt     `json:"viewsCount"`
}
```

# default message format

```
[
  {
    "aggression": "",
    "aspects": "[]",
    "audienceCount": 44,
    "authorObject": {
      "age": "",
      "author_type": "Личный профиль",
      "fullname": "Hikita Bahih",
      "sex": "мужской",
      "url": "http://vk.com/id840646292"
    },
    "citeIndex": "",
    "city": "Афины",
    "commentsCount": 0,
    "country": "Греция",
    "duplicateCount": 1,
    "er": 0,
    "geoObject": "[]",
    "hash": "6ebdb7b1cd2640ca07e40aa99df9123420231231",
    "hub": "vk.com",
    "hubtype": "Соцсети",
    "id": 589435,
    "idExternal": "840646292_34",
    "language": "Русский",
    "likesCount": 0,
    "processed": "Да",
    "region": "",
    "repostsCount": 0,
    "review_rating": "",
    "role": "",
    "tag_1": {
      "3": "Unisender"
    },
    "tag_2": {
      "60003": "Unisender блог (link)"
    },
    "tag_3": null,
    "tag_4": null,
    "tag_5": null,
    "tag_6": null,
    "tag_7": null,
    "text": "Лучшие бесплатные хостингиЛучшие бесплатные хостинги\nhttps://www.unisender.com/ru/blog/idei/top-besplatnyh-hostingov-dlya-sayta/\nГде разместить сайт и не платить ни копейки",
    "timeCreate": 1704053518,
    "title": "",
    "toneMark": 0,
    "type": "Пост",
    "url": "http://vk.com/wall840646292_34",
    "viewsCount": "40",
    "wom": ""
  }
]
```

# JSON table

example:
```
SELECT * FROM read_json('todos.json', format = 'array',
               columns = {userId: 'UBIGINT',
                          id: 'UBIGINT',
                          title: 'VARCHAR',
                          completed: 'BOOLEAN'});
```

to use (?):
```
SELECT * FROM read_json('${record.url}', format = 'array', columns = { 
  title: 'VARCHAR', 
  hash:'VARCHAR', 
  hub:'VARCHAR',
  hubtype:'VARCHAR',
  url:'VARCHAR',
  type:'VARCHAR',
  commentsCount:'UBIGINT',
  audienceCount: 'UBIGINT',
  citeIndex: 'UBIGINT',
  repostsCount: 'UBIGINT',
  likesCount: 'UBIGINT',
  er: 'UBIGINT',
  viewsCount: 'UBIGINT'
});
```
