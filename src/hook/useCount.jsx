import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useCount = (search, selectedBrands, selectedCategories, priceRange) => {

    const axiosCommon = useAxios();
  
    const { data: count = 0 } = useQuery({
      queryKey: ['count', search, selectedBrands, selectedCategories, priceRange],
      queryFn: async () => {
        const res = await axiosCommon.get(`/productsCount`, {
          params: {
            search,
            brands: selectedBrands.join(','),
            categories: selectedCategories.join(','),
            minPrice: priceRange[0],
            maxPrice: priceRange[1]
          }
        });
        return res.data.count;
      },
    });
  
    return { count };
};

export default useCount;