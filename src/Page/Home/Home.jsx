import useProduct from "../../hook/useProduct";

const Home = () => {
  const [products] = useProduct();
  console.log(products);
  return (
    <div>
      <h1 className="text-center dark:text-white my-4 font-bold text-4xl">
        Product List {products.length}
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {products.length > 0 &&
          products.map((product) => (
            <div key={product._id} className="card bg-base-100 w-96 shadow-xl">
              <figure className=" h-[200px]">
                <img src={product.productImage} alt="Shoes" />
              </figure>
              <div className="flex justify-between mt-4">
                <h1 className="ml-2">price {product.price}</h1>
                <h4>{product.category}</h4>
              </div>
              <div className="card-body">
                <div className="flex justify-between ">
                <h2 className="card-title">{product.productName}</h2>
                <h1>Rating : {product.ratings}</h1>
                </div>
                <p>{product.description}</p>
                <h5>Product Add Date : { product.productCreationDate}</h5>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
