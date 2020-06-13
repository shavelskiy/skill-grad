import { LIST, NUMBER, STRING }from './../../components/table-search/types'

export const table = [
  {
    title: 'Id',
    name: 'id',
    width: 1,
    search: {
      enable: true,
      type: NUMBER,
    },
  },
  {
    title: 'Название',
    name: 'name',
    width: 1,
    search: {
      enable: true,
      type: STRING,
    },
  },
  {
    title: 'Тип',
    name: 'type',
    width: 1,
    search: {
      enable: true,
      type: LIST,
      enum: [
        {
          title: 'Не выбрано',
          value: null,
        },
        {
          title: 'Страна',
          value: 'country',
        },
        {
          title: 'Регион',
          value: 'region',
        },
        {
          title: 'Город',
          value: 'city',
        },
      ]
    },
  },
  {
    title: 'Сортировка',
    name: 'sort',
    width: 1,
    search: {
      enable: true,
      type: NUMBER,
    },
  },
]

export const actions = [
  {
    type: 'view',
    link: '/tag',
  },
  {
    type: 'update',
    link: '/tag',
  },
  {
    type: 'delete',
    link: '/api/admin/location/',
  }
]
