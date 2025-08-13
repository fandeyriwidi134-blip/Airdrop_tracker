function loadAirdrops() {
  const list = document.getElementById("daftar-airdrop");
  const data = JSON.parse(localStorage.getItem("airdrops") || "[]");
  list.innerHTML = "";
  data.forEach((item, index) => {
    const li = document.createElement("li");
    const deadline = item.deadline ? new Date(item.deadline).toLocaleDateString() : "–";
    li.innerHTML = `
      <div>
        <a href="${item.link}" target="_blank">${item.nama}</a>
        <small> 📅 ${deadline}</small>
      </div>
      <span class="hapus" onclick="hapus(${index})">🗑️</span>
    `;
    list.appendChild(li);
  });
}

function tambahAirdrop() {
  const nama = document.getElementById("nama").value.trim();
  const link = document.getElementById("link").value.trim();
  const deadline = document.getElementById("deadline").value;
  if (!nama || !link) {
    alert("Nama dan link wajib diisi!");
    return;
  }
  const data = JSON.parse(localStorage.getItem("airdrops") || "[]");
  data.push({ nama, link, deadline });
  localStorage.setItem("airdrops", JSON.stringify(data));
  document.getElementById("nama").value = "";
  document.getElementById("link").value = "";
  document.getElementById("deadline").value = "";
  loadAirdrops();
}

function hapus(index) {
  const data = JSON.parse(localStorage.getItem("airdrops") || "[]");
  data.splice(index, 1);
  localStorage.setItem("airdrops", JSON.stringify(data));
  loadAirdrops();
}

window.onload = loadAirdrops;
