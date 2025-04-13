// JOGO INTERATIVO - RAMIFICADO E HUMANIZADO

const telaInicial = document.getElementById("telaInicial");
const chatContainer = document.getElementById("chatContainer");
const chat = document.getElementById("chat");
const options = document.getElementById("options");
let etapa = 0;
let finalAtual = 0;

const dialogos = [
  // Etapa 0
  {
    fala: "A gente precisa conversar... Sinto que estamos vivendo em ciclos que só machucam a gente.",
    opcoes: [
      {
        texto: "Mas eu ainda te amo, de verdade.",
        resposta: "Amor não é só dizer, é mostrar. E eu cansei de esperar atitudes.",
        proximaEtapa: 1
      },
      {
        texto: "Então é isso? Vai jogar tudo fora assim?",
        resposta: "Eu lutei por nós por tanto tempo... Agora tô lutando por mim.",
        fim: true,
        finalNumero: 1
      },
      {
        texto: "Você sempre faz drama por tudo.",
        resposta: "E você sempre desdenha dos meus sentimentos. É exatamente por isso que quero terminar.",
        fim: true,
        finalNumero: 2
      }
    ]
  },
  // Etapa 1
  {
    fala: "Sinto que falo com uma parede. Você escuta, mas não ouve. Entende?",
    opcoes: [
      {
        texto: "Eu sei... Mas posso melhorar. Me dá só mais uma chance.",
        resposta: "Você já disse isso outras vezes... E olha onde estamos agora.",
        proximaEtapa: 2
      },
      {
        texto: "Eu errei, eu sei. Mas eu me importo com você.",
        resposta: "Talvez... Talvez ainda haja algo entre a gente. Mas precisa ser diferente.",
        fim: true,
        finalNumero: 3
      },
      {
        texto: "Se você acha isso, talvez seja melhor acabar logo.",
        resposta: "Então tá. Se essa é sua decisão, acabou mesmo.",
        fim: true,
        finalNumero: 1
      }
    ]
  },
  // Etapa 2 - Flashback
  {
    fala: "Lembra daquela viagem pra praia? Quando a gente se perdeu no caminho, mas acabou sendo o melhor dia?",
    opcoes: [
      {
        texto: "Claro que lembro... Foi um dos nossos melhores momentos.",
        resposta: "É... A gente se divertiu tanto. Por que agora tudo parece tão distante?",
        proximaEtapa: 3
      },
      {
        texto: "Nem tudo foi tão perfeito assim...",
        resposta: "Mesmo nos momentos bons, você sempre arranjava um jeito de estragar com críticas.",
        fim: true,
        finalNumero: 4
      },
      {
        texto: "Prefiro não lembrar. Isso só me machuca.",
        resposta: "Então talvez a gente já tenha passado do ponto de voltar.",
        fim: true,
        finalNumero: 1
      }
    ]
  },
  // Etapa 3 - Conflito não resolvido
  {
    fala: "Você nunca quis conversar sobre aquele dia... sobre como você me fez sentir invisível.",
    opcoes: [
      {
        texto: "Eu estava mal, nem percebi como te magoei. Me desculpa.",
        resposta: "Pelo menos agora você reconhece. Isso já é um começo.",
        proximaEtapa: 4
      },
      {
        texto: "Você exagerou, foi só um mal-entendido.",
        resposta: "Minimizar minha dor não ajuda... Só me afasta mais.",
        fim: true,
        finalNumero: 2
      },
      {
        texto: "A gente sempre vai voltar nesse assunto?",
        resposta: "Se nunca foi resolvido, vai continuar voltando.",
        fim: true,
        finalNumero: 5
      }
    ]
  },
  // Etapa 4 - Vulnerabilidade
  {
    fala: "Eu nunca te disse isso... mas teve noites que eu chorei dormindo, do seu lado. Sentia que tava sozinha, mesmo com você ali.",
    opcoes: [
      {
        texto: "Isso parte meu coração... Eu devia ter te ouvido mais.",
        resposta: "Talvez se tivéssemos conversado antes... tudo fosse diferente.",
        proximaEtapa: 5
      },
      {
        texto: "Você nunca falou nada também!",
        resposta: "E você nunca perguntou. É assim que a gente se perdeu.",
        fim: true,
        finalNumero: 3
      },
      {
        texto: "Acho que nenhum dos dois soube lidar com isso.",
        resposta: "É... talvez a gente só não tava pronto um pro outro.",
        fim: true,
        finalNumero: 6
      }
    ]
  },
  // Etapa 5 - Última memória
  {
    fala: "Você lembra do dia que dançamos na sala, sem música, só rindo feito bobos?",
    opcoes: [
      {
        texto: "Eu lembro... e sinto falta disso.",
        resposta: "Eu também. Por mais momentos assim... vale tentar de novo?",
        fim: true,
        finalNumero: 7
      },
      {
        texto: "A gente mudou tanto desde então.",
        resposta: "Mudamos mesmo. Mas nem toda mudança precisa afastar.",
        fim: true,
        finalNumero: 8
      },
      {
        texto: "Essas memórias só tornam tudo mais difícil.",
        resposta: "Às vezes lembrar dói mais do que esquecer.",
        fim: true,
        finalNumero: 5
      }
    ]
  }
];

function iniciarJogo() {
  telaInicial.classList.add("hidden");
  chatContainer.style.display = "flex";
  mostrarEtapa();
}

function digitarMensagem(texto, quem, delay = 30) {
  const msg = document.createElement("div");
  msg.classList.add("message", quem === "player" ? "from-player" : "from-namorada");
  chat.appendChild(msg);

  if (quem === "player") {
    let i = 0;
    const intervalo = setInterval(() => {
      msg.textContent += texto[i];
      i++;
      if (i >= texto.length) {
        clearInterval(intervalo);
        chat.scrollTop = chat.scrollHeight;
      }
    }, delay);
  } else {
    msg.textContent = texto;
    const audio = document.getElementById("notificacaoAudio");
    if (audio) audio.play();
    chat.scrollTop = chat.scrollHeight;
  }
}

function mostrarDigitando(callback) {
  const digitando = document.createElement("div");
  digitando.classList.add("message", "from-namorada");
  digitando.textContent = "Digitando...";
  digitando.id = "digitando";
  chat.appendChild(digitando);
  chat.scrollTop = chat.scrollHeight;

  setTimeout(() => {
    digitando.remove();
    callback();
  }, 1500);
}

function responder(opcao) {
  options.innerHTML = "";
  digitarMensagem(opcao.texto, "player");

  setTimeout(() => {
    mostrarDigitando(() => {
      digitarMensagem(opcao.resposta, "namorada");

      if (opcao.fim) {
        finalAtual = opcao.finalNumero || 1;
        setTimeout(() => {
          mostrarDigitando(() => {
            digitarMensagem("Esse é o fim!.", "namorada");
            setTimeout(mostrarTelaFinal, 1500);
          });
        }, 1500);
      } else {
        etapa = opcao.proximaEtapa ?? etapa + 1;
        setTimeout(mostrarEtapa, 2500);
      }
    });
  }, 800);
}

function mostrarEtapa() {
  const etapaAtual = dialogos[etapa];
  mostrarDigitando(() => {
    digitarMensagem(etapaAtual.fala, "namorada");
    etapaAtual.opcoes.forEach(opcao => {
      const botao = document.createElement("button");
      botao.textContent = opcao.texto;
      botao.onclick = () => responder(opcao);
      options.appendChild(botao);
    });
  });
}

function mostrarTelaFinal() {
  chatContainer.classList.add("hidden");
  const telaFinal = document.getElementById("telaFinal");
  const mensagemFinal = document.getElementById("mensagemFinal");
  const numeroFinal = document.getElementById("numeroFinal");

  telaFinal.style.display = "flex";

  switch (finalAtual) {
    case 1:
      mensagemFinal.textContent = "Talvez esse seja o fim...";
      numeroFinal.textContent = "Mas finais também são começos.";
      break;
    case 2:
      mensagemFinal.textContent = "O amor não sobreviveu...";
      numeroFinal.textContent = "Quando não há respeito, não há espaço para continuar.";
      break;
    case 3:
      mensagemFinal.textContent = "Mágoas guardadas se tornaram muros.";
      numeroFinal.textContent = "Comunicar é essencial pra amar.";
      break;
    case 4:
      mensagemFinal.textContent = "Nem toda lembrança é boa...";
      numeroFinal.textContent = "E tudo bem lembrar com dor.";
      break;
    case 5:
      mensagemFinal.textContent = "Palavras não ditas machucam.";
      numeroFinal.textContent = "Talvez esse silêncio diga tudo.";
      break;
    case 6:
      mensagemFinal.textContent = "Não era o tempo certo.";
      numeroFinal.textContent = "E tudo bem... Às vezes amor também é deixar ir.";
      break;
    case 7:
      mensagemFinal.textContent = "Ainda há riso nos olhos dela.";
      numeroFinal.textContent = "Talvez o amor mereça mais uma dança.";
      break;
    case 8:
      mensagemFinal.textContent = "Mudanças nem sempre destroem.";
      numeroFinal.textContent = "Às vezes, elas abrem espaço pra um novo começo.";
      break;
    default:
      mensagemFinal.textContent = "Ainda há esperança.";
      numeroFinal.textContent = "O diálogo sincero pode reconstruir pontes.";
      break;
  }
}

function alternarTema() {
  document.body.classList.toggle("dark-mode");
}
