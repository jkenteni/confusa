const telaInicial = document.getElementById("telaInicial");
const chatContainer = document.getElementById("chatContainer");
const chat = document.getElementById("chat");
const options = document.getElementById("options");
let etapa = 0;

const dialogos = [
  {
    fala: "Precisamos conversar... Acho que isso não está mais funcionando.",
    opcoes: [
      { texto: "Mas por quê? Eu ainda te amo.", resposta: "Você só diz isso quando me vê indo embora.", fim: false },
      { texto: "Ok, então... Adeus.", resposta: "É só isso? Nem vai tentar lutar por mim?", fim: true },
      { texto: "Você sempre foi assim. Nunca muda.", resposta: "Tá vendo? É por isso que eu quero terminar.", fim: true }
    ]
  },
  {
    fala: "Você nunca ouve o que eu digo, só finge que se importa.",
    opcoes: [
      { texto: "Eu posso mudar, me dá uma chance.", resposta: "Você sempre promete, mas nunca cumpre...", fim: false },
      { texto: "Desculpa, eu realmente errei.", resposta: "Talvez... talvez ainda haja uma chance.", fim: true },
      { texto: "Se você acha isso, então termina logo.", resposta: "Então tá. Acabou.", fim: true }
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
  document.body.classList.toggle("dark-mode");
}
