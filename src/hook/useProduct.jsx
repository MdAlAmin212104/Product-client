import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useProduct = () => {
    const axiosCommon = useAxios();
  
    const { data: product = [] } = useQuery({
      queryKey: ['product'],
      queryFn: async () => {
        const res = await axiosCommon.get(`/products`);
        return res.data;
      },
    });
    return [product];
};

export default useProduct;