# 📊 Análise de Sentimentos com N-grams (Node.js + Natural)

Este projeto demonstra como utilizar a biblioteca [natural](https://www.npmjs.com/package/natural) para **Processamento de Linguagem Natural (PLN)** em Node.js.  
O foco é na **análise de sentimentos** com o uso de **N-grams** como *features*.

---

## ⚙️ Requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) (instalado junto com o Node)

---

## 📥 Instalação

1. Clone este repositório ou baixe os arquivos:
   ```bash
   git clone https://github.com/SBittencourt/CAE-1.git
   cd CAE.1
````

2. Instale as dependências:

   ```bash
   npm install
   ```
---

## ▶️ Executando o projeto

Para rodar o exemplo principal:

```bash
node index.js
```

Saída esperada (pode variar um pouco):

```
Demonstração de N-grams
Frase: Eu não gostei do atendimento, mas o produto é bom.
Alguns features: [ 'eu', 'não', 'gostei', 'não gostei', 'gostei do', 'produto é bom', ... ]

Classificação de sentimentos:
Frase: "o produto é ótimo" → positivo
Frase: "péssimo atendimento" → negativo
```

---

## 🧩 Conceitos aplicados

* **N-grams**: sequências de N palavras consecutivas que representam o contexto do texto

  * Exemplo:

    * "não gostei" → negativo
    * "muito bom" → positivo

* **Análise de Sentimentos**: classificação de frases como positivas ou negativas a partir dos N-grams extraídos.

---

## 📌 Estrutura do projeto

```
.
├── index.js          # Código principal
├── package.json      # Dependências e scripts npm
└── README.md         # Este arquivo
```

---

## 🚧 Limitações

* A biblioteca `natural` tem suporte limitado ao **português** (funciona melhor em inglês).
* O modelo é simples (Naive Bayes) e não captura ironia, sarcasmo ou contextos mais complexos.
* Indicado para **protótipos e fins educacionais**, não para produção.

