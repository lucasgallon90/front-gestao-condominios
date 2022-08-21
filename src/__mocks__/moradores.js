import { randomDate } from 'src/utils';
import { v4 as uuid } from 'uuid';

export const moradores = [
  {
    _id: uuid(),
    address: {
      country: 'USA',
      state: 'West Virginia',
      city: 'Parkersburg',
      street: '2849 Fulton Street'
    },
    avatarUrl: '/static/images/avatars/avatar_3.png',
    createdAt: randomDate(new Date(2022, 0, 1), new Date()),
    email: 'ekaterina.tankova@mock.com',
    nome: 'João L.',
    telefone: '(00) 99814-1500',
    apto:"204",
    bloco:"A",
  },
  {
    _id: uuid(),
    address: {
      country: 'USA',
      state: 'Bristow',
      city: 'Iowa',
      street: '1865  Pleasant Hill Road'
    },
    avatarUrl: '/static/images/avatars/avatar_4.png',
    createdAt: randomDate(new Date(2022, 0, 1), new Date()),
    email: 'cao.yu@mock.com',
    nome: 'Cristina M.',
    telefone: '(00) 97814-1500',
    apto:"203",
    bloco:"A",
  },
  {
    _id: uuid(),
    address: {
      country: 'USA',
      state: 'Georgia',
      city: 'Atlanta',
      street: '4894  Lakeland Park Drive'
    },
    avatarUrl: '/static/images/avatars/avatar_2.png',
    createdAt: randomDate(new Date(2022, 0, 1), new Date()),
    email: 'alexa.richardson@mock.com',
    nome: 'Brenda A.',
    telefone: '(00) 92814-1500',
    apto:"901",
    bloco:"A",
  },
  {
    _id: uuid(),
    address: {
      country: 'USA',
      state: 'Ohio',
      city: 'Dover',
      street: '4158  Hedge Street'
    },
    avatarUrl: '/static/images/avatars/avatar_5.png',
    createdAt: randomDate(new Date(2022, 0, 1), new Date()),
    email: 'anje.keizer@mock.com',
    nome: 'Angélica F.',
    telefone: '(00) 91814-1500',
    apto:"801",
    bloco:"A",
  },
  {
    _id: uuid(),
    address: {
      country: 'USA',
      state: 'Texas',
      city: 'Dallas',
      street: '75247'
    },
    avatarUrl: '/static/images/avatars/avatar_6.png',
    createdAt: randomDate(new Date(2022, 0, 1), new Date()),
    email: 'clarke.gillebert@mock.com',
    nome: 'Clarke Gillebert',
    telefone: '(00) 91814-1500',
    apto:"701",
    bloco:"A",
  },
  {
    _id: uuid(),
    address: {
      country: 'USA',
      state: 'California',
      city: 'Bakerfield',
      street: '317 Angus Road'
    },
    createdAt: randomDate(new Date(2022, 0, 1), new Date()),
    email: 'adam.denisov@mock.com',
    nome: 'Adam Denisov',
    telefone: '(00) 94814-1500',
    apto:"601",
    bloco:"A",
  }
];
