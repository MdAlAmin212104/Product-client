import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useProduct = (currentPage, itemPerPage, search) => {
  const axiosCommon = useAxios();
  
  const { data: products = [], error, isLoading } = useQuery({
    queryKey: ['product', currentPage, itemPerPage, search],
    queryFn: async () => {
      const res = await axiosCommon.get(`/products?page=${currentPage}&size=${itemPerPage}&search=${search || ''}`);
      return res.data;
    },
  });

  return { products, error, isLoading };
};

export default useProduct;

