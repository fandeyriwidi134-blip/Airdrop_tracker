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

// Tambah Airdrop
function tambahAirdrop() {
  const nama = document.getElementById("nama").value.trim();
  const link = document.getElementById("link").value.trim();
  const deadline = document.getElementById("deadline").value;
  const status = document.getElementById("status").value;

  if (!nama || !link) {
    alert("Nama dan link wajib diisi!");
    return;
  }

  const data = JSON.parse(localStorage.getItem("airdrops") || "[]");
  data.push({ nama, link, deadline, status });
  localStorage.setItem("airdrops", JSON.stringify(data));

  // Reset form
  document.getElementById("nama").value = "";
  document.getElementById("link").value = "";
  document.getElementById("deadline").value = "";
  document.getElementById("status").value = "belum";

  loadAirdrops();
}

// Load Semua Airdrop
function loadAirdrops() {
  const list = document.getElementById("daftar-airdrop");
  const data = JSON.parse(localStorage.getItem("airdrops") || "[]");
  list.innerHTML = "";

  const today = new Date();

  data.forEach((item, index) => {
    const li = document.createElement("li");

    // Format deadline
    let deadlineText = "–";
    let sisaHari = 0;
    if (item.deadline) {
      const dead = new Date(item.deadline);
      deadlineText = dead.toLocaleDateString();
      sisaHari = Math.ceil((dead - today) / (1000 * 60 * 60 * 24));
    }

    // Warna border berdasarkan deadline
    if (sisaHari <= 7 && sisaHari > 0) {
      li.style.borderLeft = "4px solid orange";
    } else if (sisaHari <= 0 && sisaHari > -7) {
      li.style.borderLeft = "4px solid red";
    }

    // Status badge
    const statusLabel = {
      belum: "🟡 Belum",
      proses: "🔵 Proses",
      selesai: "🟢 Selesai"
    };

    li.innerHTML = `
      <div>
        <a href="${item.link}" target="_blank">${item.nama}</a>
        <small> 📅 ${deadlineText} | ${statusLabel[item.status]}</small>
      </div>
      <span class="hapus" onclick="hapus(${index})">🗑️</span>
    `;
    list.appendChild(li);
  });
}

// Hapus Airdrop
function hapus(index) {
  const data = JSON.parse(localStorage.getItem("airdrops") || "[]");
  data.splice(index, 1);
  localStorage.setItem("airdrops", JSON.stringify(data));
  loadAirdrops();
}

// Export Data
function exportData() {
  const data = localStorage.getItem("airdrops");
  if (!data || data === "[]" || data.length === 0) {
    alert("Tidak ada data untuk di-export!");
    return;
  }

  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `airdrop-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Import Data
document.getElementById("importFile").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const parsed = JSON.parse(ev.target.result);
      if (Array.isArray(parsed)) {
        localStorage.setItem("airdrops", JSON.stringify(parsed));
        loadAirdrops();
        alert("✅ Data berhasil diimpor!");
      } else {
        throw new Error("Format salah");
      }
    } catch (err) {
      alert("❌ Gagal impor: File tidak valid!");
    }
  };
  reader.readAsText(file);
});

// Dark Mode
const darkModeToggle = document.getElementById("darkModeToggle");
if (darkModeToggle) {
  const isDark = localStorage.darkMode === "true";
  if (isDark) {
    document.body.classList.add("dark");
    darkModeToggle.checked = true;
  }

  darkModeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark", darkModeToggle.checked);
    localStorage.darkMode = darkModeToggle.checked;
  });
}

// Load saat halaman dibuka
window.onload = loadAirdrops;
