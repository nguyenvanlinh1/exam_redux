import { useParams } from "react-router-dom";
import { extractId } from "../utils/getIdBySlug";
import { useGetDogQuery } from "../store/service/dog.service";
import { Grid2 } from "@mui/material";
import LoadingData from "../components/Loading/LoadingData";
import CustomText from "../components/CustomText";
import { isErrorWithMessage, isFetchBaseQueryError } from "../configs/TypeError";
import PageError from "../components/Error/PageError";
import { toast } from "react-toastify";

const DetailsDog = () => {
  const param = useParams();
  const dogId = extractId(param?.slugbyname);
  

  const { data, isLoading, error } = useGetDogQuery(dogId);
  console.log(error);
  
  if (isLoading) {
    return <LoadingData />;
  }
  if(error){
    if(isFetchBaseQueryError(error)){
      return <PageError status={error.status}/>
    }
    else if(isErrorWithMessage(error)){
      return toast.error(error.message)
    }
  }
  return (
    <div>
      <Grid2 container paddingX={20} paddingTop={5} spacing={2}>
        <CustomText name="Name" info={data?.data?.attributes?.name}/>
        <CustomText name="Description" info={data?.data?.attributes?.description}/>
        <CustomText name="Hypoallergenic" info={data?.data?.attributes?.hypoallergenic}/>
        <CustomText name="Female_weight ( Min )" info={data?.data?.attributes?.female_weight.min}/>
        <CustomText name="Female_weight ( Max )" info={data?.data?.attributes?.female_weight.max}/>
        <CustomText name="Male_weight ( Min )" info={data?.data?.attributes?.male_weight.min}/>
        <CustomText name="Male_weight ( Max )" info={data?.data?.attributes?.male_weight.max}/>
        <CustomText name="Life ( Min )" info={data?.data?.attributes?.life.min}/>
        <CustomText name="Life ( Max )" info={data?.data?.attributes?.life.max}/>
      </Grid2>
    </div>
  );
};

export default DetailsDog;
