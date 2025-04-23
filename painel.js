
import { auth, db, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, collection, addDoc, getDocs } from './firebase-config.js';

const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("logout");
const painel = document.getElementById("painel");
const authSection = document.getElementById("auth-section");

loginBtn.onclick = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

logoutBtn.onclick = () => {
  signOut(auth);
};

onAuthStateChanged(auth, user => {
  if (user && user.email === "leveluptranslates@gmail.com") {
    painel.style.display = "block";
    authSection.style.display = "none";
    carregarJogos();
  } else {
    painel.style.display = "none";
    authSection.style.display = "block";
  }
});

document.getElementById("salvar").onclick = async () => {
  const nome = document.getElementById("nome").value;
  const imagem = document.getElementById("imagem").value;
  const descricao = document.getElementById("descricao").value;
  const download = document.getElementById("download").value;
  await addDoc(collection(db, "jogos"), { nome, imagem, descricao, download });
  alert("Jogo salvo!");
  carregarJogos();
};

async function carregarJogos() {
  const container = document.getElementById("jogos");
  container.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "jogos"));
  querySnapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.innerHTML = `<b>${data.nome}</b><br><img src="${data.imagem}" style="width:150px;"><br>${data.descricao}<br><a href="${data.download}" target="_blank">Download</a><hr>`;
    container.appendChild(div);
  });
}
