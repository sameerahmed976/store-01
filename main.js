if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

function init() {
  const deleteButton = document.querySelectorAll(".btn-danger");
  console.log("🚀 ~ file: main.js:2 ~ deleteButton", deleteButton);

  for (var i = 0; i < deleteButton.length; i++) {
    var button = deleteButton[i];
    button.addEventListener("click", removeCartItem);
  }

  const quantityInput = document.querySelectorAll(".cart-quantity-input");

  quantityInput.forEach((qi) => {
    qi.addEventListener("change", changeInput());
  });

  const addToCart = document.querySelectorAll(".shop-item-button");

  addToCart.forEach((atc) => {
    atc.addEventListener("click", (e) => {
      const button = e.target;
      const shopItem = e.target.parentElement.parentElement;

      const title = shopItem.querySelector(".shop-item-title").innerText;
      console.log(
        "🚀 ~ file: main.js:46 ~ atc.addEventListener ~ title",
        title
      );
      const price = parseFloat(
        shopItem.querySelector(".shop-item-price").innerText.replace("$", " ")
      );
      console.log(
        "🚀 ~ file: main.js:48 ~ atc.addEventListener ~ price",
        price
      );
      const image = shopItem.querySelector(".shop-item-image").src;
      console.log(
        "🚀 ~ file: main.js:50 ~ atc.addEventListener ~ image",
        image
      );

      addCart(title, price, image);

      updateCartTotal();
    });
  });
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function changeInput() {
  return (e) => {
    let input = parseInt(e.target.value);
    console.log(
      "🚀 ~ file: main.js:27 ~ qi.addEventListener ~ quantityItems",
      input
    );

    if (isNaN(input) || input <= 0) {
      input = 1;
    }
    updateCartTotal();
  };
}

function addCart(title, price, image) {
  const cartItem = document.createElement("div");

  cartItem.className = "cart-row";
  // cartItem.innerText = title;
  console.log("🚀 ~ file: main.js:71 ~ addCart ~ cartItem", cartItem);

  const cartItemsName = document.querySelectorAll(".cart-item-title");

  for (ct of cartItemsName) {
    if (ct.innerText == title) {
      alert("Item added already");
      return;
    }
  }

  cartItem.innerHTML = ` 
          <div class="cart-item cart-column">
            <img class="cart-item-image" src=${image} width="100" height="100">
            <span class="cart-item-title">${title}</span>
          </div>
          <span class="cart-price cart-column">$${price}</span>
          <div class="cart-quantity cart-column">
            <input  class="cart-quantity-input" type="number" value="1" min="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
          </div>
`;

  const cartItems = document.querySelector(".cart-items");
  console.log("🚀 ~ file: main.js:74 ~ addCart ~ cartItems", cartItems);

  cartItems.append(cartItem);
  cartItems.addEventListener("click", (e) => {
    // console.log("delete");
    if (e.target.classList.contains("btn-danger")) {
      e.target.parentElement.parentElement.remove();
      updateCartTotal();
    }
    if (e.target.classList.contains("cart-quantity-input")) {
      let input = parseInt(e.target.value);
      console.log(
        "🚀 ~ file: main.js:27 ~ qi.addEventListener ~ quantityItems",
        input
      );

      if (isNaN(input) || input <= 0) {
        input = 1;
      }
      // console.log("click");
      updateCartTotal();
    }
  });

  // const quantityValue = cartItems.addEventListener;
  // console.log(
  //   "🚀 ~ file: main.js:115 ~ addCart ~ quantityValue",
  //   quantityValue
  // );
}

function updateCartTotal() {
  const carItemContainer = document.querySelectorAll(".cart-row");

  let total = 0;

  for (cartItem of carItemContainer) {
    // console.log(cartItem);
    const price = parseFloat(
      cartItem.querySelector(".cart-price").innerText.replace("$", "")
    );
    console.log(
      "🚀 ~ file: main.js:20 ~ carItemContainer.forEach ~ price",
      price
    );
    const quantity = parseFloat(
      cartItem.querySelector(".cart-quantity-input").value
    );
    console.log(
      "🚀 ~ file: main.js:27 ~ carItemContainer.forEach ~ quantity",
      quantity
    );

    total += price * quantity;
    console.log(
      "🚀 ~ file: main.js:37 ~ carItemContainer.forEach ~ total",
      total
    );

    total = Math.round(total * 100) / 100;
    document.querySelector(".cart-total-price").innerText = `$ ${total}`;
  }
}
