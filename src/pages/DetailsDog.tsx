import { useParams } from "react-router-dom";
import { extractId } from "../utils/getIdBySlug";
import { useGetDogQuery } from "../store/service/dog.service";
import { Box, Typography } from "@mui/material";
import LoadingData from "../components/Loading/LoadingData";

const DetailsDog = () => {
  const param = useParams();
  const dogId = extractId(param?.slugbyname);

  const { data, isLoading } = useGetDogQuery(dogId);
  if (isLoading) {
    return <LoadingData/>;
  }
  return (
    <div>
      <Box>
        <Typography>{data?.data?.attributes?.name}</Typography>
        <Typography>{data?.data?.attributes?.description}</Typography>
        <Typography>{data?.data?.attributes?.hypoallergenic}</Typography>
        <Typography>{data?.data?.attributes?.female_weight.min}</Typography>
        <Typography>{data?.data?.attributes?.female_weight.max}</Typography>
        <Typography>{data?.data?.attributes?.male_weight.min}</Typography>
        <Typography>{data?.data?.attributes?.male_weight.max}</Typography>
        <Typography>{data?.data?.attributes?.life.min}</Typography>
        <Typography>{data?.data?.attributes?.life.max}</Typography>
      </Box>
    </div>
  );
};

export default DetailsDog;
