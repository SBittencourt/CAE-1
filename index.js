const natural = require('natural');

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmerPt;

const STOPWORDS_PT = new Set([
  'a','o','as','os','de','do','da','dos','das','e','em','no','na','nos','nas',
  'um','uma','uns','umas','para','por','com','ao','aos','à','às','que','se',
  'me','te','lhe','eles','elas','ele','ela','minha','meu','seu','sua','suas',
  'meus','tu','você','vocês','está','estao','esta','isso','isto','aquele','aquela'
]);

function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')           
    .replace(/[\u0300-\u036f]/g, ''); 
}

function featuresFromText(text) {
  const norm = normalize(text);
  const tokens = tokenizer.tokenize(norm).filter(t => !STOPWORDS_PT.has(t));
  const stems = tokens.map(t => stemmer.stem(t));

  const bigrams = natural.NGrams.bigrams(stems).map(bg => bg.join('_'));
  const trigrams = natural.NGrams.trigrams(stems).map(tg => tg.join('_'));

  return [...stems, ...bigrams, ...trigrams];
}

const fraseDemo = "Eu não gostei do atendimento, mas o produto é bom.";
const featsDemo = featuresFromText(fraseDemo);

console.log("Demonstração de N-grams");
console.log("Frase:", fraseDemo);
console.log("Features:", featsDemo);
console.log();

const classifier = new natural.BayesClassifier();

const treino = [
  // Positivo
  ["amei o produto, excelente qualidade", "positivo"],
  ["otimo custo beneficio, recomendo", "positivo"],
  ["funciona perfeitamente e chegou rapido", "positivo"],
  ["muito bom, super satisfeito", "positivo"],
  ["qualidade excelente, atendimento cordial", "positivo"],

  // Negativo
  ["odiei, horrivel experiencia", "negativo"],
  ["nao funciona, muito ruim", "negativo"],
  ["quebrou rapido e o suporte foi pessimo", "negativo"],
  ["atraso na entrega, estou decepcionado", "negativo"],
  ["nao gostei do atendimento", "negativo"]
];

for (const [texto, rotulo] of treino) {
  classifier.addDocument(featuresFromText(texto), rotulo);
}

classifier.train();

const testes = [
  "o produto é bom e recomendo",
  "serviço terrível, atendimento ruim",
  "nao funciona direito, estou chateado",
  "excelente! superou minhas expectativas",
  "chegou atrasado, experiencia pessima",
  "bom, mas caro" 
];

console.log("Classificação de Sentimentos");
for (const t of testes) {
  const feats = featuresFromText(t);
  const label = classifier.classify(feats);
  const dist = classifier.getClassifications(feats);
  console.log(`Texto: "${t}"`);
  console.log(`Rótulo: ${label}`);
  console.log(`Pontuações:`, dist);
  console.log();
}
