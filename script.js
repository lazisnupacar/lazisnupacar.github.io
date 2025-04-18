const toggleBtn = document.querySelector('.toggle-btn');
const toggleBtnIcon = document.querySelector('.toggle-btn i');
const dropDownMenu = document.querySelector('.dropdown-menu');

toggleBtn.onclick = function () {
    dropDownMenu.classList.toggle('open')
    const isOpen = dropDownMenu.classList.contains('open')

    toggleBtnIcon.classList = isOpen
    ? 'fa-solid fa-xmark' //class toggle yang ada di index.html
    : 'fa-solid fa-bars' //class toggle yang ada di index.html
};

// menghilangkan hamburger menu

document.addEventListener('click', function(e){
    if(!toggleBtn.contains(e.target) && !dropDownMenu.contains(e.target)){
        dropDownMenu.classList.remove('open');
        toggleBtnIcon.classList = 'fa-solid fa-bars';
    };
});

// header shadow ketika di scroll
// script.js
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 0) {
        header.classList.add('header-shadow');
    } else {
        header.classList.remove('header-shadow');
    }
});


// toTopBtn
// script.js
const toTopBtn = document.querySelector('.to-top');

window.addEventListener('scroll', function() {
    if (window.scrollY > 100) { // Ubah nilai 100 sesuai dengan posisi scroll yang diinginkan
        toTopBtn.classList.add('show');
    } else {
        toTopBtn.classList.remove('show');
    }
});

toTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

//Hubungi Kami
document.getElementById('whatsapp-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;

    let whatsappNumber = '6289603170126';
    let whatsappMessage = `Halo, nama saya ${name}.\nEmail saya: ${email}.\nPesan saya: ${message}`;

    let whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappURL, '_blank');
});

//Dropdown Laporan
// Laporan1
document.getElementById("laporan1Select").addEventListener("change", function () {
    const iframe = document.getElementById("iframeLaporan1");
    const url = this.value;
    if (url) {
      iframe.src = url;
    }
  });
// Laporan2
document.getElementById("laporan2Select").addEventListener("change", function () {
    const iframe = document.getElementById("iframeLaporan2");
    const url = this.value;
    if (url) {
      iframe.src = url;
    }
  });

//Download File
// Laporan1
  document.getElementById("laporan1Select").addEventListener("change", function () {
    const iframe = document.getElementById("iframeLaporan1");
    const downloadLink = document.getElementById("downloadLaporan1");
  
    const selectedOption = this.options[this.selectedIndex];
    const previewURL = selectedOption.value;
    const downloadURL = selectedOption.getAttribute("data-download");
  
    if (previewURL && downloadURL) {
      iframe.src = previewURL;
      downloadLink.href = downloadURL;
    }
  });
// Laporan2
  document.getElementById("laporan2Select").addEventListener("change", function () {
    const iframe = document.getElementById("iframeLaporan2");
    const downloadLink = document.getElementById("downloadLaporan2");
  
    const selectedOption = this.options[this.selectedIndex];
    const previewURL = selectedOption.value;
    const downloadURL = selectedOption.getAttribute("data-download");
  
    if (previewURL && downloadURL) {
      iframe.src = previewURL;
      downloadLink.href = downloadURL;
    }
  });

//Potret Hidden
document.getElementById("toggleBtn").addEventListener("click", function() {
  const gridItems = document.querySelectorAll(".instagram-grid .grid-item");
  const allItemsVisible = Array.from(gridItems).every(item => item.style.display === "block");

  // Toggle visibility of images
  if (allItemsVisible) {
    // Sembunyikan gambar tambahan
    gridItems.forEach((item, index) => {
      if (index >= 5) {
        item.style.display = "none";
      }
    });
    // Ubah teks tombol menjadi "Lihat Selengkapnya"
    this.textContent = "Lihat Selengkapnya";
  } else {
    // Tampilkan semua gambar
    gridItems.forEach(item => {
      item.style.display = "block";
    });
    // Ubah teks tombol menjadi "Tampilkan Lebih Sedikit"
    this.textContent = "Tampilkan Lebih Sedikit";
  }
});

// Data Tables
const url = "https://raw.githubusercontent.com/lazisnupacar/lazisnupacar.github.io/master/DATAKOIN.xlsx";
let workbook;

fetch(url)
  .then(res => res.arrayBuffer())
  .then(data => {
    workbook = XLSX.read(data, { type: "array" });
    loadSheet('REKAP'); // sheet default
  })
  .catch(err => {
    console.error(err);
    document.getElementById("table-wrapper").innerText = "Gagal memuat file Excel.";
  });

function loadSheet(sheetName) {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) {
    document.getElementById("table-wrapper").innerText = "Sheet tidak ditemukan: " + sheetName;
    return;
  }

  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  if (data.length === 0) {
    document.getElementById("table-wrapper").innerText = "Data kosong di sheet " + sheetName;
    return;
  }

  let html = "<div class='table-scroll'><table id='dataTable'><thead><tr>";
  data[0].forEach(header => {
    html += `<th>${header}</th>`;
  });
  html += "</tr></thead><tbody>";

  for (let i = 1; i < data.length; i++) {
    html += "<tr>";
    for (let j = 0; j < data[0].length; j++) {
      html += `<td>${data[i][j] ?? ""}</td>`;
    }
    html += "</tr>";
  }

  html += "</tbody></table></div>";
  document.getElementById("table-wrapper").innerHTML = html;
}

// Fungsi filter pencarian
function filterTable() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll("#dataTable tbody tr");

  rows.forEach(row => {
    const cells = row.querySelectorAll("td");
    const text = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(" ");
    row.style.display = text.includes(input) ? "" : "none";
  });
}