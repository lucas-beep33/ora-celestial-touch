export interface Devotional {
  id: string;
  date: string;
  theme: string;
  verse: string;
  reference: string;
  reflection: string;
  prayer: string;
}

export const devotionals: Devotional[] = [
  {
    id: 'dev-001',
    date: '2025-01-01',
    theme: 'Um Novo Começo em Cristo',
    verse: 'Eis que faço novas todas as coisas.',
    reference: 'Apocalipse 21:5',
    reflection: 'Deus nos oferece a cada dia a oportunidade de recomeçar. Independentemente dos erros do passado, Sua misericórdia nos renova e nos dá forças para seguir em frente. Este novo ano é uma página em branco onde podemos escrever nossa história de amor com Deus.',
    prayer: 'Senhor, obrigado por esta nova oportunidade. Ajuda-me a deixar para trás tudo aquilo que não me aproxima de Ti e a abraçar com fé este novo tempo de graça. Amém.'
  },
  {
    id: 'dev-002',
    date: '2025-01-02',
    theme: 'A Paz que Vem de Deus',
    verse: 'Deixo-vos a paz, a minha paz vos dou.',
    reference: 'João 14:27',
    reflection: 'A paz que Jesus nos oferece não é a ausência de problemas, mas a presença do Senhor em meio às dificuldades. É uma paz que supera todo entendimento e que permanece firme mesmo nas tempestades da vida.',
    prayer: 'Jesus, Príncipe da Paz, concede-me Tua serenidade para enfrentar os desafios deste dia. Que Tua paz reine em meu coração e se estenda a todos ao meu redor. Amém.'
  },
  {
    id: 'dev-003',
    date: '2025-01-03',
    theme: 'Confiança na Providência Divina',
    verse: 'Tudo concorre para o bem daqueles que amam a Deus.',
    reference: 'Romanos 8:28',
    reflection: 'Mesmo quando não compreendemos os caminhos de Deus, podemos confiar que Ele está tecendo nossa história com fios de amor. Cada experiência, alegre ou dolorosa, pode ser usada por Deus para nosso crescimento espiritual.',
    prayer: 'Pai celestial, aumenta minha fé para confiar em Teus planos, mesmo quando não consigo entender. Ajuda-me a ver Tua mão amorosa em cada circunstância da minha vida. Amém.'
  },
  {
    id: 'dev-004',
    date: '2025-01-04',
    theme: 'O Amor ao Próximo',
    verse: 'Amai-vos uns aos outros como eu vos amei.',
    reference: 'João 13:34',
    reflection: 'O mandamento do amor não é apenas um conselho, mas a essência da vida cristã. Amar como Jesus amou significa servir, perdoar, compreender e se doar pelos outros, especialmente pelos mais necessitados.',
    prayer: 'Senhor Jesus, ensina-me a amar com Teu coração. Remove de mim todo egoísmo e me ajuda a ver em cada pessoa um reflexo de Tua presença. Amém.'
  },
  {
    id: 'dev-005',
    date: '2025-01-05',
    theme: 'A Força na Oração',
    verse: 'Orai sem cessar.',
    reference: '1 Tessalonicenses 5:17',
    reflection: 'A oração é o fio que nos mantém conectados com o Céu. Não é apenas uma prática religiosa, mas um diálogo constante com o Pai, que nos fortalece, orienta e transforma. Através da oração, encontramos força para cada dia.',
    prayer: 'Espírito Santo, ensina-me a orar com o coração. Que minha vida seja uma oração contínua, em todos os momentos buscando a presença de Deus. Amém.'
  }
];

export const getTodayDevotional = () => {
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  
  // Se não houver devocional específico para hoje, retorna o primeiro
  return devotionals.find(dev => dev.date === todayString) || devotionals[0];
};

export const getDevotionalByDate = (date: string) => {
  return devotionals.find(dev => dev.date === date);
};