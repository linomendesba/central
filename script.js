const minutos = {
  COPA: [
    1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52, 55, 58,
  ],
  EURO: [
    2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50, 53, 56, 59,
  ],
  PREMIER: [
    0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57,
  ],
  SUPER: [
    1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52, 55, 58,
  ],
};

let minutosSelecionados = [];
let mercadoSelecionado = "";
let moedasSelecionadas = [];
let textoPersonalizado = "";

function updateMinutos() {
  const liga = document.querySelector('input[name="liga"]:checked')?.value;
  const minutosDiv = document.getElementById("minutos");
  minutosDiv.innerHTML = "";
  minutosSelecionados = [];
  if (liga) {
    minutos[liga].forEach((minuto) => {
      minutosDiv.innerHTML += `<label><input type="checkbox" name="minuto" value="${minuto}" onclick="toggleMinuto(${minuto})"> ${minuto}</label>`;
    });
  }
}

function toggleMinuto(minuto) {
  const index = minutosSelecionados.indexOf(minuto.toString());
  if (index === -1) {
    minutosSelecionados.push(minuto.toString());
  } else {
    minutosSelecionados.splice(index, 1);
  }
  gerarTexto();
}

document.querySelectorAll('input[name="mercado"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    mercadoSelecionado = radio.value;
    gerarTexto();
  });
});

document.querySelectorAll('input[name="moeda"]').forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const index = moedasSelecionadas.indexOf(checkbox.value);
    if (checkbox.checked && index === -1) {
      moedasSelecionadas.push(checkbox.value);
    } else if (!checkbox.checked && index !== -1) {
      moedasSelecionadas.splice(index, 1);
    }
    gerarTexto();
  });
});

function formatarMoedas() {
  let linhas = [];
  for (let i = 0; i < moedasSelecionadas.length; i += 2) {
    linhas.push(moedasSelecionadas.slice(i, i + 2).join(" / "));
  }
  return linhas.join("\n");
}

function gerarTexto() {
  const liga = document.querySelector('input[name="liga"]:checked')?.value;
  textoPersonalizado = document.getElementById("texto-personalizado").value;
  if (liga && minutosSelecionados.length > 0 && mercadoSelecionado) {
    let texto = `🏆${liga}\n⏰ ${minutosSelecionados.join(
      " - "
    )}\n✍🏻 ${mercadoSelecionado}\n\n💰Moedas:\n${formatarMoedas()}\n\n${textoPersonalizado}`;
    document.getElementById("output").innerText = texto;
  } else {
    document.getElementById("output").innerText =
      "Por favor, selecione uma liga, os minutos, um mercado e as moedas.";
  }
}

async function copiarTexto() {
  const output = document.getElementById("output");
  try {
    await navigator.clipboard.writeText(output.innerText);
  } catch (err) {
    console.error("Falha ao copiar o texto.", err);
  }
}

function limpar() {
  document
    .querySelectorAll('input[name="liga"]')
    .forEach((radio) => (radio.checked = false));
  document
    .querySelectorAll('input[name="minuto"]')
    .forEach((checkbox) => (checkbox.checked = false));
  document
    .querySelectorAll('input[name="mercado"]')
    .forEach((radio) => (radio.checked = false));
  document
    .querySelectorAll('input[name="moeda"]')
    .forEach((checkbox) => (checkbox.checked = false));
  document.getElementById("minutos").innerHTML = "";
  document.getElementById("output").innerText = "";
  document.getElementById("minuto-green").value = "";
  document.getElementById("texto-personalizado").value = "";
  minutosSelecionados = [];
  mercadoSelecionado = "";
  moedasSelecionadas = [];
  textoPersonalizado = "";
}

function adicionarGreen() {
  const minutoGreen = document.getElementById("minuto-green").value;
  if (minutoGreen && minutosSelecionados.length > 0) {
    const minutoGreenFormatado = `✅${minutoGreen}`;
    const minutosFormatados = minutosSelecionados.map((minuto) =>
      minuto == minutoGreen ? minutoGreenFormatado : minuto
    );
    let texto = `🏆${
      document.querySelector('input[name="liga"]:checked')?.value
    }\n⏰ ${minutosFormatados.join(
      " - "
    )}\n✍🏻 ${mercadoSelecionado}\n\n💰Moedas:\n${formatarMoedas()}\n\n${textoPersonalizado}`;
    texto += `\n\nGREEN 💰💰💰😎😜🤑\n${"✅".repeat(9)}\n${"✅".repeat(9)}`;
    document.getElementById("output").innerText = texto;
  }
}

function adicionarRed() {
  let texto = document.getElementById("output").innerText;
  texto += `\n\n✖️✖️✖️✖️✖️✖️✖️✖️✖️`;
  document.getElementById("output").innerText = texto;
}

function salvarTexto() {
  const texto1 = document.getElementById("texto-personalizado").value;
  localStorage.setItem("textoPersonalizado", texto1);
}

function carregarTexto() {
  const texto1 = localStorage.getItem("textoPersonalizado");
  if (texto1) {
    document.getElementById("texto-personalizado").value = texto1;
    gerarTexto();
  }
}

document.querySelectorAll('input[name="liga"]').forEach((radio) => {
  radio.addEventListener("change", updateMinutos);
});

updateMinutos();
