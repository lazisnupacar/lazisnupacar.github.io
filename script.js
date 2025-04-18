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
const url = "https://raw.githubusercontent.com/lazisnupacar/lazisnupacar.github.io/master/DATA%20WARGA%20LANDSCAPE.xlsx"; // Ganti dengan URL raw file Excel di GitHub
    let workbook;

    // Load file Excel dari GitHub
    fetch(url)
      .then(res => res.arrayBuffer())
      .then(data => {
        // Parse file Excel
        workbook = XLSX.read(data, { type: "array" });
        loadSheet(workbook.SheetNames[0]); // Tampilkan sheet pertama secara default
      })
      .catch(err => {
        console.error(err);
        document.getElementById("table-container").innerText = "Gagal memuat Excel.";
      });

    // Fungsi untuk memuat dan menampilkan sheet
    function loadSheet(sheetName) {
      const sheet = workbook.Sheets[sheetName];
      if (!sheet) {
        document.getElementById("table-container").innerText = "Sheet tidak ditemukan: " + sheetName;
        return;
      }

      // Convert sheet ke HTML
      const html = XLSX.utils.sheet_to_html(sheet, { editable: false, header: "" });
      document.getElementById("table-container").innerHTML = html;
    }