import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useCount = (search, selectedBrands, selectedCategories, priceRange, sortBy) => {

    const axiosCommon = useAxios();
  
    const { data: count = 0 } = useQuery({
      queryKey: ['count', search, selectedBrands, selectedCategories, priceRange, sortBy],
      queryFn: async () => {
        const res = await axiosCommon.get(`/productsCount`, {
          params: {
            search,
            brands: selectedBrands.join(','),
            categories: selectedCategories.join(','),
            minPrice: priceRange.minPrice,
            maxPrice: priceRange.maxPrice,
            sortBy,
          }
        });
        return res.data.count;
      },
    });
  
    return { count };
};

export default useCount;