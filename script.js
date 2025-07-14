// UNTUK FORMM 

document.addEventListener('DOMContentLoaded', function() {
    // Menunggu seluruh konten HTML dimuat sebelum menjalankan script

    // Mendapatkan semua tombol dengan class 'book-tour-button'
    const bookTourButtons = document.querySelectorAll('.book-tour-button');

    // Iterasi setiap tombol 'Pesan Tiket'
    bookTourButtons.forEach(button => {
        // Menambahkan event listener untuk setiap klik tombol
        button.addEventListener('click', function() {
            // Mengambil nama tur dari atribut 'data-tour-name' tombol
            const tourName = this.dataset.tourName;
            // Mengambil harga tur dari atribut 'data-tour-price' tombol
            const tourPrice = this.dataset.tourPrice;

            // Membuat URL tujuan ke 'form.html' dengan parameter tur dan harga
            // encodeURIComponent digunakan untuk memastikan karakter khusus (misal spasi) dienkode dengan benar di URL
            window.location.href = `form.html?tour=${encodeURIComponent(tourName)}&price=${encodeURIComponent(tourPrice)}`;
        });
    });

    const tourSearchInput = document.getElementById('tourSearchInput');
    const tourTypeFilter = document.getElementById('tourTypeFilter');
    const priceFilter = document.getElementById('priceFilter');
    const searchTourButton = document.getElementById('searchTourButton');
    const tourGrid = document.getElementById('tourGrid');
    const tourCards = document.querySelectorAll('.tour-card');

    function filterTours() {
        const searchTerm = tourSearchInput.value.toLowerCase();
        const selectedTourType = tourTypeFilter.value;
        const selectedPriceRange = priceFilter.value;

        tourCards.forEach(card => {
            const tourName = card.querySelector('.card-title').textContent.toLowerCase();
            const tourLocation = card.dataset.tourLocation ? card.dataset.tourLocation.toLowerCase() : '';
            const tourType = card.dataset.tourType;
            const priceText = card.querySelector('.price-text').textContent;
            const tourPrice = parseInt(priceText.replace(/[^0-9]/g, '')); // Extract number from "IDR 1.500.000"

            const matchesSearch = tourName.includes(searchTerm) || tourLocation.includes(searchTerm);
            const matchesTourType = selectedTourType === '' || tourType === selectedTourType;
            let matchesPriceRange = true;

            if (selectedPriceRange === 'low') {
                matchesPriceRange = tourPrice >= 0 && tourPrice <= 500000;
            } else if (selectedPriceRange === 'medium') {
                matchesPriceRange = tourPrice >= 500001 && tourPrice <= 1000000;
            } else if (selectedPriceRange === 'high') {
                matchesPriceRange = tourPrice >= 1000001;
            }

            if (matchesSearch && matchesTourType && matchesPriceRange) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add event listeners
    searchTourButton.addEventListener('click', filterTours);
    tourSearchInput.addEventListener('keyup', filterTours); // Filter on key up for search
    tourTypeFilter.addEventListener('change', filterTours); // Filter on dropdown change
    priceFilter.addEventListener('change', filterTours); // Filter on dropdown change

    // Initial filter when the page loads
    filterTours();

});

        // UNTUK LOGIN SEBELUM PEMESANAN

        //LOGINNN SEBELUM PEMESANAN

document.addEventListener('DOMContentLoaded', () => {

    // === LOGIKA PEMESANAN TIKET (DENGAN CEK LOGIN) ===
    const bookButtons = document.querySelectorAll('.book-tour-button');

    bookButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 1. Cek apakah ada pengguna yang login dari localStorage
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

            if (loggedInUser) {
                // 2. Jika SUDAH login, lanjutkan proses pemesanan
                const tourName = e.target.dataset.tourName;
                const tourPrice = e.target.dataset.tourPrice;
                
                // Tampilkan pesan konfirmasi yang dipersonalisasi
                alert(`Terima kasih, ${loggedInUser.username}!\n\nPesanan Anda untuk "${tourName}" telah dikonfirmasi.\nTotal Pembayaran: IDR ${new Intl.NumberFormat('id-ID').format(tourPrice)}`);
                
                console.log(`Booking successful for user: ${loggedInUser.email}, Tour: ${tourName}`);
                // Di aplikasi nyata, di sini Anda akan mengarahkan ke halaman pembayaran
                // window.location.href = `payment.html?tour=${tourName}&price=${tourPrice}`;
            } else {
                // 3. Jika BELUM login, tampilkan peringatan dan arahkan ke halaman login
                alert('Anda harus login terlebih dahulu untuk memesan tiket.');
                window.location.href = 'login.html';
            }
        });
    });


    // === LOGIKA PENCARIAN DAN FILTER WISATA ===
    const searchButton = document.getElementById('searchTourButton');
    const searchInput = document.getElementById('tourSearchInput');
    const typeFilter = document.getElementById('tourTypeFilter');
    const priceFilter = document.getElementById('priceFilter');
    const tourCards = document.querySelectorAll('.tour-card');

    function filterTours() {
        const searchText = searchInput.value.toLowerCase();
        const selectedType = typeFilter.value;
        const selectedPriceRange = priceFilter.value;

        tourCards.forEach(card => {
            const tourName = card.querySelector('.card-title').textContent.toLowerCase();
            const tourLocation = card.dataset.tourLocation.toLowerCase();
            const tourType = card.dataset.tourType;
            const price = parseInt(card.querySelector('.book-tour-button').dataset.tourPrice, 10);

            // Cek kecocokan harga
            let priceMatch = false;
            if (selectedPriceRange === "") {
                priceMatch = true;
            } else if (selectedPriceRange === "low" && price <= 500000) {
                priceMatch = true;
            } else if (selectedPriceRange === "medium" && price > 500000 && price <= 1000000) {
                priceMatch = true;
            } else if (selectedPriceRange === "high" && price > 1000000) {
                priceMatch = true;
            }
            
            // Cek kecocokan teks pencarian, tipe wisata, dan rentang harga
            const textMatch = tourName.includes(searchText) || tourLocation.includes(searchText);
            const typeMatch = selectedType === "" || tourType === selectedType;

            // Tampilkan atau sembunyikan card berdasarkan hasil filter
            if (textMatch && typeMatch && priceMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Tambahkan event listener untuk tombol cari dan filter
    if (searchButton) {
        searchButton.addEventListener('click', filterTours);
    }

    
});