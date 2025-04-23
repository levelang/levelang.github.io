
const firebaseConfig = {
  apiKey: "AIzaSyCyvyPiQDOO-7j3Dz3_ab-v7K2Ki4fwwYg",
  authDomain: "leveluptranslates-4d423.firebaseapp.com",
  databaseURL: "https://leveluptranslates-4d423-default-rtdb.firebaseio.com",
  projectId: "leveluptranslates-4d423",
  storageBucket: "leveluptranslates-4d423.appspot.com",
  messagingSenderId: "522004977412",
  appId: "1:522004977412:web:5246a26ad6ba8bc8b6a251"
};

firebase.initializeApp(firebaseConfig);

firebase.database().ref("jogos").on("value", snapshot => {
  const catalogo = document.getElementById("catalogo");
  catalogo.innerHTML = "";
  const data = snapshot.val();
  for (const id in data) {
    const jogo = data[id];
    const card = document.createElement("div");
    card.style.cssText = "width:220px;position:relative;overflow:hidden;border-radius:12px;background:#1a1a2e;box-shadow:0 0 15px #00aaff55;margin:10px;cursor:pointer;transition:transform 0.3s;";
    card.innerHTML = `
      <img src="${jogo.imagem}" alt="${jogo.nome}" style="width:100%;display:block;">
      <div style='position:absolute;top:0;left:0;width:100%;height:100%;background:#000000cc;color:white;opacity:0;transition:opacity 0.3s;padding:15px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;text-align:center;'>
        <span style="font-size:14px;color:#00ffff;">${jogo.descricao}</span>
      </div>
    `;
    card.addEventListener("mouseover", () => card.querySelector("div").style.opacity = 1);
    card.addEventListener("mouseout", () => card.querySelector("div").style.opacity = 0);
    catalogo.appendChild(card);
  }
});
