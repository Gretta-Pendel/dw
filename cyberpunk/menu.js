let menu = [
  {
    name: "Лор",
    title: "Лор",
    url: "index",
    sections: [
      { title: "Никогда не исчезай", url: "h1_0" },
      { title: "Падение башен", url: "h1_1" },
      { title: "Взгляд из-за Грани", url: "h1_2" },
      { title: "Уличный сленг", url: "h1_3" },
    ],
  },
  {
    name: "Добро Пожаловать в Тёмное Будущее",
    title: "Будущее",
    url: "future",
    sections: [
      { title: "Падение Америки", url: "h3_0" },
      { title: "Отсчет До Тёмного Будущего", url: "h3_1" },
      { title: "До Того, Как Всё Стало Красным", url: "h3_2" },
      { title: "Америка: падение орла", url: "h3_3" },
      { title: "Банда Четырех", url: "h3_4" },
      { title: "Рассвет мегакорпораций", url: "h3_5" },
      { title: "4-я корпоративная война", url: "h3_6" },
    ],
  },
  {
    name: "Красное время",
    title: "RedTime",
    url: "red-time",
    sections: [
      { title: "Последствия", url: "h3_0" },
      { title: "США в Красное Время", url: "h3_1" },
      { title: "Игроки и игра", url: "h3_2" },
      { title: "Мир за Границей", url: "h3_3" },
      { title: "Нео Корпорации", url: "h3_4" },
      { title: "Профили Корпораций", url: "h1_1" },
    ],
  },
  {
    name: "Добро Пожаловать В Найт-Сити",
    title: "Найт-Сити",
    url: "night-city",
    sections: [
      { title: "Немного Истории Найт-Сити", url: "h3_0" },
      { title: "Найт-Сити в 2020", url: "h3_1" },
      { title: "Найт-Сити Наконец-то Счастлив?", url: "h3_2" },
      { title: "Найт-Сити и 4-я (2022)", url: "h3_3" },
      { title: "Красное время", url: "h3_4" },
      { title: "Найт-сити в Красное Время", url: "h3_5" },
      { title: "Рейтинг Угроз", url: "h3_6" },
      { title: "Особенности", url: "h3_7" },
      { title: "Люди в Найт-сити", url: "h3_8" },
      { title: "Ключевые места", url: "h3_9" },
    ],
  },
  {
    name: "Душа и новая машина",
    title: "=PC",
    url: "pc",
    page: 27,
    sections: [
      { title: "Роли", url: "h2_0" },
      { title: "РОКЕРБОЙ", url: "h1_1" },
      { title: "СОЛО", url: "h1_2" },
      { title: "НЕТРАННЕР", url: "h1_3" },
      { title: "ТЕХНИК", url: "h1_4" },
      { title: "МЕДТЕХНИК", url: "h1_5" },
      { title: "МЕДИА", url: "h1_6" },
      { title: "КОРПОРАТ", url: "h1_7" },
      { title: "ЗАКОННИК", url: "h1_8" },
      { title: "ФИКСЕР", url: "h1_9" },
      { title: "КОЧЕВНИК", url: "h1_10" },
    ],
  },
  // {
  //   name: "Сказки с улиц",
  //   title: "=Путь",
  //   page: 43,
  // },
  {
    name: "Создан для будущего",
    title: "=Персонаж",
    url: "char",
    sections: [
      {
        title: "Характеристики",
        url: "h3_0",
      },
      { title: "Навыки", url: "h1_2" },
      { title: "Оружие и защита", url: "h1_3" },
      { title: "Снаряжение", url: "h1_4" },
      { title: "Стиль", url: "h1_5" },
      { title: "Киберпсихоз", page: "h3_6" },
      { title: "Киберснаряжение", page: "h3_7" },
      { title: "Закончились деньги?", page: "h1_7" },
    ],
  },
  {
    name: "Доводим до конца",
    title: "=Решения",
    url: "solutions",
    sections: [
      { title: "Дистанция и Передвижение", url: "h5_0" },
      { title: "Проверка навыков", url: "h3_0" },
      { title: "Список навыков", url: "h3_1" },
    ],
  },
  {
    title: "Перестрелка в пятницу вечером",
    title: "=Комбат",
    url: "combat",
    sections: [
      { title: "Во время битвы", url: "h3_0" },
      { title: "Действия", url: "h3_1" },
      { title: "Дальний Бой", url: "h3_3" },
      { title: "Ближний Бой", url: "h3_4" },
      { title: "Другие Способы Пострадать", url: "h3_5" },
      { title: "До Того, Как Вы Получите Урон", url: "h3_6" },
      { title: "Когда Броня Не Справляется", url: "h3_7" },
      { title: "Бой На Транспорте", url: "h3_8" },
      { title: "Репутация", url: "h3_9" },
    ],
  },
  // {
  //   name: "Нетраннинг",
  //   title: "Нетраннинг",
  //   url: "netrunning",
  //   sections: [
  //     { title: "Делаем Всякие Штуки В СЕТи", url: "" },
  //     { title: "БойвСЕТи", url: "" },
  //     { title: "Программы", url: "" },
  //     { title: "Различные Улучшения", url: "" },
  //     { title: "Оборудование для Кибердеки", url: "" },
  //     { title: "Занимаемся Нетраном", url: "" },
  //     { title: "Создание Архитектуры Сети", url: "" },
  //   ],
  // },
  // {
  //   name: "TraumaTeam",
  //   title: "TraumaTeam",
  //   page: 219,
  //   sections: [
  //     { title: "Состояния Ранений и Критические Травмы", url: "" },
  //     { title: "Стабилизация и Лечение", url: "" },
  //     { title: "Trauma Team", url: "" },
  //     { title: "Уличные наркотики", url: "" },
  //     { title: "Терапия и Ты", url: "" },
  //     { title: "Киберпсихоз", url: "" },
  //   ],
  // },
  {
    name: "Повседневная Жизнь",
    title: "Жизнь",
    url: "life",
    sections: [
      { title: "Не Попасть в Неприятности", url: "h3_0" },
      { title: "Как Вы Остаётесь На Связи", url: "h3_1" },
      { title: "Что Вы Носите С Собой", url: "h3_2" },
      { title: "Как Вы Передвигаетесь", url: "h3_3" },
      { title: "Как Вы Получаете Информацию", url: "h3_4" },
      { title: "Что Вы Носите", url: "h3_5" },
      { title: "Что Вы Едите", url: "h3_6" },
      { title: "Как Вы Развлекаетесь", url: "h3_7" },
      { title: "Где Вы Берёте Свой Стаф", url: "h3_8" },
    ],
  },
  {
    name: "Новая Уличная Экономика",
    title: "Экономика",
    url: "economy",
    sections: [
      { title: "Ночные Рынки", url: "h3_4" },
      { title: "Путеводитель По Ночному Рынку", url: "h3_5" },
      { title: "Киберимлпанты", url: "h3_6" },
      { title: "Образ жизни и жилье", url: "h3_7" },
      { title: "Заработать На Жизнь в Мире Киберпанка", url: "h3_8" },
    ],
  },
  /*{
    name: "Запускаем Киберпанк",
    title: "Запуск",
    page: 387,
    sections: [
      { title: "Диаграмма Ритма", page: 395 },
      { title: "Становимся Лучше", page: 408 },
      { title: "Шестёрки и Засранцы", page: 412 },
      { title: "Встречи в Красное Время", page: 417 },
    ],
  },
  {
    name: "Скримлисты",
    title: "Скримлисты",
    page: 425,
  },
  {
    name: "Черный Пес",
    title: "Черный Пес",
    page: 435,
  },*/
];
