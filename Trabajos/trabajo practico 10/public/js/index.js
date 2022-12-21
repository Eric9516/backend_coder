const getProducts = async () => {
    try{
    const response = await fetch("/api/products");
    const products = await response.json();
    return products;
    }
    catch (error){
     console.log(error);
    }
}

const renderProducts = async () => {
const productsContainer = document.getElementById("productsContainer")

const products = await getProducts()

productsContainer.innerHTML = await makeListProduct(products)
}

const makeListProduct = async (products) => {
    const archivoTemplate = await fetch("views/products-table.hbs");
    const templateText = await archivoTemplate.text();
    const templateCompiled = Handlebars.compile(templateText);
    return templateCompiled({ products });
};

const getProductBtn = document.getElementById("getProductBtn")
getProductBtn.addEventListener("click", renderProducts)