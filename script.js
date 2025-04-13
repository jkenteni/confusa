const telaInicial = document.getElementById("telaInicial");
const chatContainer = document.getElementById("chatContainer");
const chat = document.getElementById("chat");
const options = document.getElementById("options");
let etapa = 0;

const dialogos = [
  {
    fala: "A gente precisa conversar... Sinto que estamos vivendo em ciclos que só machucam a gente.",
    opcoes: [
      {
        texto: "Mas eu ainda te amo, de verdade.",
        resposta: "Amor não é só dizer, é mostrar. E eu cansei de esperar atitudes.",
        fim: false
      },
      {
        texto: "Então é isso? Vai jogar tudo fora assim?",
        resposta: "Eu lutei por nós por tanto tempo... Agora tô lutando por mim.",
        fim: true
      },
      {
        texto: "Você sempre faz drama por tudo.",
        resposta: "E você sempre desdenha dos meus sentimentos. É exatamente por isso que quero terminar.",
        fim: true
      }
    ]
  },
  {
    fala: "Sinto que falo com uma parede. Você escuta, mas não ouve. Entende?",
    opcoes: [
      {
        texto: "Eu sei... Mas posso melhorar. Me dá só mais uma chance.",
        resposta: "Você já disse isso outras vezes... E olha onde estamos agora.",
        fim: false
      },
      {
        texto: "Eu errei, eu sei. Mas eu me importo com você.",
        resposta: "Talvez... Talvez ainda haja algo entre a gente. Mas precisa ser diferente.",
        fim: true
      },
      {
        texto: "Se você acha isso, talvez seja melhor acabar logo.",
        resposta: "Então tá. Se essa é sua decisão, acabou mesmo.",
        fim: true
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
  chat.scrollTop = chat.scrollHeight;

  if (quem === "player") {
    // Animação de digitação só para o player
    let i = 0;
    const intervalo = setInterval(() => {
      msg.textContent += texto[i];
      i++;
      chat.scrollTop = chat.scrollHeight;
      if (i >= texto.length) clearInterval(intervalo);
    }, delay);
  } else {
    // Para a namorada, mensagem instantânea
    msg.textContent = texto;
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
        setTimeout(() => {
          mostrarDigitando(() => {
            digitarMensagem("Fim da conversa.", "namorada");
          });
        }, 1500);
      } else {
        etapa++;
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

function alternarTema() {
  document.body.classList.toggle("dark-mode"); // Alterado de "dark-theme" para "dark-mode"
}