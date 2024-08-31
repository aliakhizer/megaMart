//fetch method  it is define in the window object. which we can use to perform request
//this method will return promises
//promise fullfil or rejected

fetch("https://fakestoreapi.com/products")
  .then((response) => {
    return response.json(); // convert in json format backend and frontend communicate through
  })
  .then((products) => {
    updateProductCards(products);
    filterProductCards(products);
    searchProductCards(products);
  })
  .catch((eror) => {
    console.log("error");
  });

function updateProductCards(products) {
  let products = "";
  products.forEach((product) => {
    const fillStar = Math.floor(product.rating.rate);
    const emptyStar = `5 - ${fillStar}`;

    let startImage = "";

    for (let i = 0; i < fillStar; i++) {
      startImage += ` <img src="./images/Star 3.png" alt="">

              `;
    }
    for (let i = 0; i < emptyStar; i++) {
      startImage += `<img src="./images/Star 4.png" alt=" empty star image">
              `;
    }

    products += ` <div class="card">
        
          <div class="card-img">
            <img src=${product.image} class="card-image" alt="phone img" />
          </div>

          <div class="card-content">
            <div class="card-des">
              <div class="phone-title">${product.category}</div>
              <div class="phone-price">${product.price}</div>
            </div>
            <div class="card-rating">
              <div class="rate">
                 ${startImage}
                
              </div>
              <button class="add-to-card">add to card</button>
            </div>
          </div>
        </div> `;
  });

  document.getElementById("card-container").innerHTML = products;

  let count = 0;
  document.querySelectorAll(".add-to-card").forEach((button) => {
    button.onclick = function () {
      count++;
      document.getElementById("cart-count").innerHTML = count;
    };
  });
}

function filterProductCards(products) {
  document
    .querySelector("#category-dropdown")
    .addEventListener("change", function () {
      const selectedCategory = this.value.toLowerCase();
      console.log(selectedCategory);

      const filterproducts =
        selectedCategory === "all"
          ? products
          : products.filter(
              (product) => product.category.toLowerCase() === selectedCategory
            );

      updateProductCards(filterproducts);
    });
}

function searchProductCards(products) {
  document
    .querySelector(".search-box input")
    .addEventListener("keyup", function () {
      const searchTerm = this.value.toLowerCase();

      console.log("product", products);
      const searchedProducts = products.filter((product) =>
        product.category.toLowerCase().includes(searchTerm)
      );

      updateProductCards(searchedProducts);
    });
}
