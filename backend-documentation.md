# Легкая документация к беку

_Описывать роуты я буду в формате method(/route/routes), ниже представленны описания роутов и то какие данные они требуют в запросе и то какие ответы они пришлют. Если не указан пример ответа, то значит бекенд отвечает null на запрос._

---

## Раздел /admin & /about

- post('/admin/auth') : ожидает {"password":"password"} - ответит в формате { "token": "FSgn/vb8En9L2" }

- post('/admin/token') : ожидает { "token": "FSgn/vb8En9L2" } (вроде бы авторизация существующего токена)

- put('/about') : ождает { "user":{"token":"zxlLOJ15tCULg"}, "info":{"info":"тут пишем что будет отображаться в разделе about"}}

- get('/about') - ответ {"Admin": {"aboutMe": "тут пишем что будет отображаться в разделе about"}}

## Раздел /tags & /sections

- post('/tags') - ожидает в body {"token":"zxlLOJ15tCULg"} и "/tags?tag_name=имя нового тега" в query параметрах - ответит {"tagId": id(в формате числа)}

- get('/tags') - вернет массив всех тегов [
  {
  "tagId": 1,
  "tag": "NewTag"
  },
  {
  "tagId": 2,
  "tag": "имя нового тега"
  }
  ]

- put('/tags/{tagId}') - ожидает токен в body {"token":"zxlLOJ15tCULg"} и "/tags/1?edited_name=измененное имя тега" в квери параметрах

- delete('/tags/{tagId}') - ожидает в body {"token":"zxlLOJ15tCULg"}, и /tags/1?1 в квери параметрах

- post('/sections') - ожидает в body {"token":"zxlLOJ15tCULg"} и /sections?section=Новая секция в квери параметрах

- get('/sections') ответит массивом со всеми секциями [
  {
  "sectionId": 1,
  "section": "Новая секция",
  "tags": []
  }
  ]
- delete('/sections/{SectionId}') ожидает в body {"token":"zxlLOJ15tCULg"} и /1 в квери параметрах

- put('/sections/{sectionId}') ожидает в body {"token":"zxlLOJ15tCULg"} и /1?section=Новое имя в квери параметрах

- post('/sections/{sectionId}/tags/{tagId}') ожидает в body {"token":"zxlLOJ15tCULg"} и /sections/1/tags/1?sectionId=1&tagId=1 в квери параметрах

- delete('/sections/{sectionId}/tags/{tagId}') ожидает в body {"token":"zxlLOJ15tCULg"} и /sections/1/tags/1?sectionId=1&tagId=1 в квери параметрах

- post('/images/{imageId}/tags/{tagId}') ожидает в body {"token":"zxlLOJ15tCULg"} и /images/1/tags/1?imageId=1&tagId=1 в квери параметрах

- delete('/images/{imageId}/tags/{tagId}') ожидает в body {"token":"zxlLOJ15tCULg"} и /images/1/tags/1?imageId=1&tagId=1 в квери параметрах

- get('/sections/{SectionId}') - вернет список всех фотографий в секции

## Раздел /images

- get('/images') в ответ отдаст массив со всеми фотографиями, каждый элемент выглядит следующим образом - {"imageId": 1,"image":"a0ada6da335716dd3ad0027ee079ff410341de63fc6dad23e0b8ec6c4f19e6899d2bdf27f3a303617c5f50bea84360607ed6895fe8a11be6815cc621572be43.jpg", "tags": [{"tagId": 1, "tag": "Первый тег"}], "sections": [{"sectionId": 1,"section": "Первая секция"}]}

- get('/images/{imageId}') ожидает в квери параметре /images/1?imageId=1

- post('/images') - ожидает файл фотографии, которую запишет бек, вернет {"imageId":"1"}

- delete('/images/{imageId}') - ожидает {"token":"zxlLOJ15tCULg"}
