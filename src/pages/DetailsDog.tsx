import { useNavigate, useParams } from "react-router-dom";
import { extractId } from "../utils/getIdBySlug";
import { useGetDogQuery } from "../store/service/dog.service";
import { Grid2 } from "@mui/material";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "../configs/TypeError";
import { toast } from "react-toastify";
import { CustomText, LoadingData } from "../components";
import { Helmet } from "react-helmet-async";

const DetailsDog = () => {
  const param = useParams();
  const navigate = useNavigate();
  const dogId = extractId(param?.slugbyname);

  const { data, isLoading, error } = useGetDogQuery(dogId);

  if (isLoading) {
    return <LoadingData />;
  }
  if (error) {
    if (isFetchBaseQueryError(error)) {
      navigate(`/error/${error.status}`);
    } else if (isErrorWithMessage(error)) {
      toast.error(error.message);
    }
  }
  return (
    <>
      <Helmet>
        <title>Chi tiết về {data?.data?.attributes?.name}</title>
        <meta name="description" content={`Thông tin chi tiết về ${data?.data?.attributes?.name}`} />
      </Helmet>
      <Grid2 container paddingX={20} paddingTop={5} spacing={2}>
        <CustomText name="Name" info={data?.data?.attributes?.name} />
        <CustomText
          name="Description"
          info={data?.data?.attributes?.description}
        />
        <CustomText
          name="Hypoallergenic"
          info={data?.data?.attributes?.hypoallergenic}
        />
        <CustomText
          name="Female_weight ( Min )"
          info={data?.data?.attributes?.female_weight.min}
        />
        <CustomText
          name="Female_weight ( Max )"
          info={data?.data?.attributes?.female_weight.max}
        />
        <CustomText
          name="Male_weight ( Min )"
          info={data?.data?.attributes?.male_weight.min}
        />
        <CustomText
          name="Male_weight ( Max )"
          info={data?.data?.attributes?.male_weight.max}
        />
        <CustomText
          name="Life ( Min )"
          info={data?.data?.attributes?.life.min}
        />
        <CustomText
          name="Life ( Max )"
          info={data?.data?.attributes?.life.max}
        />
      </Grid2>
    </>
  );
};

export default DetailsDog;
