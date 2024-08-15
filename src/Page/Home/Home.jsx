import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const NumberOfPage = Math.ceil(count / itemPerPage);
  const pages = [...Array(NumberOfPage).keys()];

  useEffect(() => {
    fetch(
      `http://localhost:5000/products?page=${currentPage}&size=${itemPerPage}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [currentPage, itemPerPage]);

  useEffect(() => {
    fetch("http://localhost:5000/productsCount")
      .then((res) => res.json())
      .then((data) => setCount(data.count));
  }, []);

  const handleItemPerPage = (e) => {
    const val = parseInt(e.target.value);
    console.log(val);
    setItemPerPage(val);
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div>
      <h1 className="text-center dark:text-white my-4 font-bold text-4xl">
        Product List {products.length}
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {products.length > 0 &&
          products.map((product) => (
            <div key={product._id} className="card bg-base-100 w-96 shadow-xl">
              <figure className="h-[200px]">
                <img src={product.productImage} alt="Shoes" />
              </figure>
              <div className="flex justify-between mt-4">
                <h1 className="ml-2">Price {product.price}</h1>
                <h4>{product.category}</h4>
              </div>
              <div className="card-body">
                <div className="flex justify-between ">
                  <h2 className="card-title">{product.productName}</h2>
                  <h1>Rating : {product.ratings}</h1>
                </div>
                <p>{product.description}</p>
                <h5 className="text-[12px]">
                  Product Add Date : {product.productCreationDate}
                </h5>
              </div>
            </div>
          ))}
      </div>
      <div className="pagination text-center mb-10 dark:text-black">
        <p className="my-4 dark:text-white">Current click page {currentPage}</p>
        <button
          onClick={handlePrevPage}
          className="mr-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Prev
        </button>
        {pages.map((page) => (
          <button
            className={`mr-2 px-4 py-2 rounded ${
              currentPage === page
                ? "bg-orange-500 text-white dark:text-black"
                : "bg-gray-200 hover:bg-gray-300 dark:text-black"
            }`}
            onClick={() => setCurrentPage(page)}
            key={page}
          >
            {page}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          className="mr-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Next
        </button>
        <select
          value={itemPerPage}
          onChange={handleItemPerPage}
          className="px-4 py-2 rounded border dark:text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default Home;
