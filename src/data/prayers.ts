export interface Prayer {
  id: string;
  title: string;
  content: string;
  category: 'traditional' | 'powerful' | 'saints' | 'situation';
  subcategory?: string;
  context?: string;
  tags: string[];
}

export const prayers: Prayer[] = [
  // Tradicionais
  {
    id: 'pai-nosso',
    title: 'Pai Nosso',
    content: `Pai nosso que estás nos céus,
santificado seja o teu nome.
Venha o teu Reino.
Seja feita a tua vontade,
assim na terra como no céu.
O pão nosso de cada dia nos dá hoje.
Perdoa as nossas ofensas,
assim como nós perdoamos
a quem nos tem ofendido.
E não nos deixeis cair em tentação,
mas livrai-nos do mal.
Amém.`,
    category: 'traditional',
    context: 'A oração fundamental ensinada por Jesus Cristo aos seus discípulos, conforme descrita nos Evangelhos de Mateus e Lucas.',
    tags: ['jesus', 'fundamental', 'evangelho', 'perdão']
  },
  {
    id: 'ave-maria',
    title: 'Ave Maria',
    content: `Ave Maria, cheia de graça,
o Senhor é convosco.
Bendita sois vós entre as mulheres,
e bendito é o fruto do vosso ventre, Jesus.
Santa Maria, Mãe de Deus,
rogai por nós, pecadores,
agora e na hora da nossa morte.
Amém.`,
    category: 'traditional',
    context: 'Oração mariana baseada na saudação do Anjo Gabriel à Virgem Maria durante a Anunciação.',
    tags: ['maria', 'anunciação', 'intercessão']
  },
  {
    id: 'credo',
    title: 'Credo',
    content: `Creio em Deus Pai todo-poderoso,
criador do céu e da terra.
E em Jesus Cristo, seu único Filho, nosso Senhor,
que foi concebido pelo poder do Espírito Santo,
nasceu da Virgem Maria,
padeceu sob Pôncio Pilatos,
foi crucificado, morto e sepultado;
desceu à mansão dos mortos;
ressuscitou ao terceiro dia;
subiu aos céus,
está sentado à direita de Deus Pai todo-poderoso,
de onde há de vir a julgar os vivos e os mortos.
Creio no Espírito Santo,
na santa Igreja Católica,
na comunhão dos santos,
na remissão dos pecados,
na ressurreição da carne,
na vida eterna.
Amém.`,
    category: 'traditional',
    context: 'Profissão de fé fundamental da Igreja Católica, estabelecida no Concílio de Niceia.',
    tags: ['fé', 'doutrina', 'trindade', 'igreja']
  },
  {
    id: 'salve-rainha',
    title: 'Salve Rainha',
    content: `Salve, Rainha, Mãe de misericórdia,
vida, doçura e esperança nossa, salve!
A vós bradamos, os degredados filhos de Eva;
a vós suspiramos, gemendo e chorando
neste vale de lágrimas.
Eia, pois, advogada nossa,
esses vossos olhos misericordiosos a nós volvei;
e depois deste desterro nos mostrai Jesus,
bendito fruto do vosso ventre,
ó clemente, ó piedosa, ó doce sempre Virgem Maria!
Amém.`,
    category: 'traditional',
    context: 'Antífona mariana tradicional, cantada ao final das Completas na liturgia das horas.',
    tags: ['maria', 'misericórdia', 'intercessão', 'esperança']
  },

  // Poderosas
  {
    id: 'oracao-sao-miguel',
    title: 'Oração a São Miguel Arcanjo',
    content: `São Miguel Arcanjo,
defendei-nos no combate,
sede o nosso refúgio contra as maldades
e ciladas do demônio.
Que Deus o constranja, instantemente o pedimos,
e vós, Príncipe da milícia celeste,
pela virtude de Deus,
precipitai no inferno Satanás
e os outros espíritos malignos
que andam pelo mundo para a perdição das almas.
Amém.`,
    category: 'powerful',
    subcategory: 'proteção',
    context: 'Oração de proteção espiritual composta pelo Papa Leão XIII após uma visão mística.',
    tags: ['proteção', 'arcanjo', 'combate', 'espiritual']
  },
  {
    id: 'oracao-cura',
    title: 'Oração Poderosa de Cura',
    content: `Senhor Jesus Cristo,
pelo vosso amor misericordioso,
eu vos peço humildemente
que cureis todas as enfermidades
do meu corpo, da minha alma e do meu espírito.
Tocai-me com a vossa mão amorosa,
como tocastes os enfermos
durante vossa vida terrena.
Dai-me força para aceitar vossa vontade
e concedei-me a graça da cura,
se for de vosso agrado.
Por vossa Santa Cruz e Ressurreição,
libertai-me de todo mal.
Amém.`,
    category: 'powerful',
    subcategory: 'cura',
    context: 'Oração de fé para pedir a intervenção divina em situações de enfermidade física, emocional ou espiritual.',
    tags: ['cura', 'saúde', 'jesus', 'misericórdia']
  },

  // Santos
  {
    id: 'oracao-sao-jorge',
    title: 'Oração a São Jorge',
    content: `Eu andarei vestido e armado
com as armas de São Jorge,
para que meus inimigos, tendo pés não me alcancem,
tendo mãos não me peguem,
tendo olhos não me vejam,
e nem em pensamentos eles possam me fazer mal.
Armas de fogo o meu corpo não alcançarão,
facas e lanças se quebrem sem o meu corpo tocar,
cordas e correntes se arrebentem sem o meu corpo amarrar.
Jesus Cristo me proteja e me defenda
com o poder de sua santa e divina graça.
Virgem de Nazaré me cubra com seu manto sagrado
e me proteja em todas as minhas dores e aflições,
e Deus, com sua divina misericórdia
e grande poder, seja meu defensor
contra as maldades e perseguições dos meus inimigos.
Glorioso São Jorge, em nome de Deus,
estende-me o teu escudo
e as tuas poderosas armas,
defendendo-me com a tua força e com a tua grandeza,
e que debaixo das tuas vestes sagradas
eu fique invisible e proteção contra meus inimigos
São Jorge de Deus. (3x)
Amém.`,
    category: 'saints',
    context: 'Oração de proteção a São Jorge, santo guerreiro e mártir, patrono dos soldados e cavaleiros.',
    tags: ['são jorge', 'proteção', 'guerreiro', 'inimigos']
  },
  {
    id: 'oracao-santo-antonio',
    title: 'Oração a Santo Antônio',
    content: `Glorioso Santo Antônio,
que recebestes de Deus o dom especial
de restituir as coisas perdidas,
ajudai-me a encontrar
a graça da salvação e a paz.
Restitui-me a tranquilidade e a alegria
que perdi por causa do pecado.
Alcançai-me do coração de Jesus
a compaixão para comigo
e para com todos aqueles
que recorrem à vossa intercessão.
Glorioso Santo Antônio,
rogai por nós.
Amém.`,
    category: 'saints',
    context: 'Santo Antônio de Pádua é conhecido como o santo dos objetos perdidos e dos casos impossíveis.',
    tags: ['santo antônio', 'objetos perdidos', 'casos impossíveis']
  },

  // Por Situação
  {
    id: 'oracao-emprego',
    title: 'Oração por um Emprego',
    content: `Senhor Jesus Cristo,
que dissestes: "Pedi e recebereis",
eu vos peço humildemente
um trabalho digno e honesto
para sustentar minha família
e servir à sociedade.
Iluminai minha mente para que eu saiba
discernir as oportunidades que se apresentam,
dai-me força e perseverança
para não desanimar nas dificuldades.
Abençoai meus esforços
e encaminhai-me para o trabalho
que esteja de acordo com vossa vontade.
São José, protetor dos trabalhadores,
intercedei por mim junto a Jesus.
Amém.`,
    category: 'situation',
    subcategory: 'trabalho',
    context: 'Oração para quem busca uma oportunidade de trabalho ou está passando por dificuldades profissionais.',
    tags: ['emprego', 'trabalho', 'são josé', 'sustento']
  },
  {
    id: 'oracao-ansiedade',
    title: 'Oração contra Ansiedade',
    content: `Senhor Jesus Cristo,
Príncipe da Paz,
eu venho até vós com meu coração angustiado.
Vós que acalmastes a tempestade no mar,
acalmai também a tempestade da minha alma.
Livrai-me da ansiedade e do medo
que perturbam minha paz interior.
Concedei-me vossa paz,
aquela paz que o mundo não pode dar.
Ajudai-me a confiar plenamente
em vossa Divina Providência
e a descansar em vossos braços amorosos.
Que vossa serenidade
domine meus pensamentos
e vossa tranquilidade
governe meu coração.
Amém.`,
    category: 'situation',
    subcategory: 'saúde mental',
    context: 'Oração para momentos de ansiedade, angústia e preocupação excessiva.',
    tags: ['ansiedade', 'paz', 'tranquilidade', 'confiança']
  },
  {
    id: 'oracao-familia',
    title: 'Oração pela Família',
    content: `Sagrada Família de Nazaré,
Jesus, Maria e José,
eu vos confio minha família.
Protegei nosso lar com vosso amor,
preservai nossa união na fé,
nossa alegria na esperança
e nossa perseverança na caridade.
Afastai de nós toda discórdia,
toda incompreensão e todo ressentimento.
Que nossa casa seja um pequeno céu na terra,
onde reine a paz de Cristo,
a doçura de Maria
e a simplicidade de José.
Sagrada Família,
intercedei por todas as famílias do mundo,
especialmente por aquelas em dificuldade.
Amém.`,
    category: 'situation',
    subcategory: 'família',
    context: 'Oração de proteção e bênção para a família, inspirada na Sagrada Família de Nazaré.',
    tags: ['família', 'proteção', 'união', 'sagrada família']
  }
];

export const getPrayersByCategory = (category: Prayer['category']) => {
  return prayers.filter(prayer => prayer.category === category);
};

export const searchPrayers = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return prayers.filter(prayer => 
    prayer.title.toLowerCase().includes(lowercaseQuery) ||
    prayer.content.toLowerCase().includes(lowercaseQuery) ||
    prayer.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getPrayerById = (id: string) => {
  return prayers.find(prayer => prayer.id === id);
};