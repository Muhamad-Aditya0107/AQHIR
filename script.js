const items = [
    ['001', 'Keyboard Vortex NS75', 699000, 'Salah satu keyboard terbaik dari Vortex series', './assets/keyboard.jpg'],
    ['002', 'Deskmat Sades', 200000, 'Desmat dengan build quality yang mantap', './assets/deskmat.jpg'],
    ['003', 'Mouse Sades Oculus V2', 500000, 'Mouse terbaik dengan memiliki 3 jenis konektor', './assets/mouse.jpg'],
    ['004', 'Monitor MSI G244f', 1800000, 'Monitor dengan layar 24INCH', './assets/monitor.jpg']
];

let cart = [];

function renderItems(keyword = "") {
    const listBarang = document.getElementById("listBarang");
    listBarang.innerHTML = "";

    items.filter(item => item[1].toLowerCase().includes(keyword.toLowerCase()))
        .forEach(item => {
            const itemHTML = `
            <div class="col-md-4 col-sm-6 mt-3">
                <div class="card h-100">
                    <img src="${item[4]}" class="card-img-top" alt="${item[1]}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${item[1]}</h5>
                        <p class="card-text">${item[3]}</p>
                        <p class="card-text"><strong>Rp ${item[2].toLocaleString()}</strong></p>
                        <button class="btn btn-primary mt-auto" onclick="addToCart('${item[0]}')">Add To Cart</button>
                    </div>
                </div>
            </div>`;
            listBarang.innerHTML += itemHTML;
        });
}

function addToCart(itemId) {
    const item = items.find(i => i[0] === itemId);
    if (item) {
        cart.push(item);
        updateCartCount();
    }
}

function updateCartCount() {
    const cartCount = cart.length;
    const cartBadge = document.getElementById("cartBadge");

    cartBadge.textContent = cartCount;
}

function renderCart() {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = "";

    cart.forEach((item, index) => {
        const cartItemHTML = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            ${item[1]} - Rp ${item[2].toLocaleString()}
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Hapus</button>
        </li>`;
        cartList.innerHTML += cartItemHTML;
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCart();
}

document.getElementById("formItem").addEventListener("submit", function (event) {
    event.preventDefault();
    const keyword = document.getElementById("keyword").value;
    renderItems(keyword);
});

$('#cartModal').on('show.bs.modal', renderCart);

renderItems();
updateCartCount();