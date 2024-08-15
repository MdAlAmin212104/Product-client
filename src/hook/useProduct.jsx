import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useProduct = (currentPage, itemPerPage, search, selectedBrands, selectedCategories, priceRange) => {
  const axiosCommon = useAxios();
  const { data: products = [], error, isLoading } = useQuery({
    queryKey: ['product', currentPage, itemPerPage, search, selectedBrands, selectedCategories, priceRange],
    queryFn: async () => {
      const res = await axiosCommon.get(`/products`, {
        params: {
          page: currentPage,
          size: itemPerPage,
          search,
          brands: selectedBrands.join(','),
          categories: selectedCategories.join(','),
          minPrice: priceRange.minPrice,
          maxPrice: priceRange.maxPrice
        }
      });
      return res.data;
    },
  });

  return { products, error, isLoading };
};

export default useProduct;
