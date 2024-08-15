import { useState } from "react";
import useProduct from "../../hook/useProduct";
import useCount from "../../hook/useCount";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(""); // New state for sorting

  // State for filters
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({
    minPrice: 0,
    maxPrice: Infinity,
  });

  const { products, isLoading, error } = useProduct(
    currentPage,
    itemPerPage,
    search,
    selectedBrands,
    selectedCategories,
    priceRange,
    sortBy
  );

  const { count } = useCount(
    search,
    selectedBrands,
    selectedCategories,
    priceRange,
    sortBy
  );

  const handleSortChange = (e) => {
    setSortBy(e.target.value); // Update sortBy state when user selects a sorting option
  };

  const handleItemPerPage = (e) => {
    setItemPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(count / itemPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const form = e.target;
    const minPrice = form.minPrice.value;
    const maxPrice = form.maxPrice.value;
    setPriceRange({
      minPrice: parseInt(minPrice) || 0,
      maxPrice: parseInt(maxPrice) || Infinity,
    });
    form.reset();
  };

  return (
    <div>
      <div className="flex justify-center">
        <label className="input input-bordered flex items-center gap-2 md:w-2/3">
          <input
            type="text"
            className="grow"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search products..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      <div className="md:flex gap-4">
        <div className="md:w-[400px] ml-4 mt-8">
          <h1 className="text-3xl font-bold my-4">Brand</h1>
          <div className="space-y-4">
            {[
              "XYZ Electronics",
              "ProTech",
              "SeriesWear",
              "SoundMaster",
              "TechWave",
            ].map((brand) => (
              <div key={brand} className="form-control">
                <label className="flex cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                  <span className="label-text ml-4 dark:text-white">{brand}</span>
                </label>
              </div>
            ))}
          </div>

          <h1 className="text-3xl font-bold my-4">Category</h1>
          <div className="space-y-4">
            {[
              "Electronics",
              "Computers",
              "Wearables",
              "Home Entertainment",
              "Accessories",
            ].map((category) => (
              <div key={category} className="form-control">
                <label className="flex cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span className="label-text ml-4 dark:text-white">{category}</span>
                </label>
              </div>
            ))}
          </div>

          <h1 className="text-3xl font-bold my-4">Price</h1>
          <form onSubmit={handleFilter} className="space-y-6">
            <label htmlFor="Min">Min : </label>
            <input
              type="number"
              name="minPrice"
              className="input input-bordered"
              placeholder="Min"
            />
            <br />
            <label htmlFor="Max">Max : </label>
            <input
              type="number"
              name="maxPrice"
              className="input input-bordered"
              placeholder="Max"
            />
            <br />
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Filters
            </button>
          </form>

          <div className="sorting-options mt-6">
            <label>Sort by: </label>
            <br />
            <select
              value={sortBy} onChange={handleSortChange}
              className="select select-bordered mt-2"
            >
              <option value="">Default</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="dateNewestFirst">Date Added: Newest First</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-8">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading products</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="card bg-base-100 shadow-xl">
                <figure className="h-[200px]">
                  <img src={product.productImage} alt={product.productName} />
                </figure>
                <div className="flex justify-between mt-4">
                  <h1 className="ml-2">Price {product.price}</h1>
                  <h4 className="mr-2">{product.category}</h4>
                </div>
                <div className="card-body">
                  <div className="flex justify-between ">
                    <h2 className="card-title">{product.productName}</h2>
                    <h1>Rating: {product.ratings}</h1>
                  </div>
                  <p>{product.description}</p>
                  <h5 className="text-[12px]">
                    Product Add Date: {product.productCreationDate}
                  </h5>
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>

      <div className="pagination text-center mb-10 dark:text-black">
        <p className="my-4 dark:text-white">Current page {currentPage}</p>
        <button
          onClick={handlePrevPage}
          className="mr-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Prev
        </button>
        {Array.from({ length: Math.ceil(count / itemPerPage) }, (_, page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`mr-2 px-4 py-2 rounded ${
              currentPage === page
                ? "bg-orange-500 text-white dark:text-black"
                : "bg-gray-200 hover:bg-gray-300 dark:text-black"
            }`}
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
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default Home;
