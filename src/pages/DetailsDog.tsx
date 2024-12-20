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
    return <LoadingData />;
  }
  return (
    <div>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" marginRight={5} width={300}>
            Name
          </Typography>
          <Typography>{data?.data?.attributes?.name}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" marginRight={5} width={850}>
            Description
          </Typography>
          <Typography>{data?.data?.attributes?.description}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" marginRight={5} width={300}>
            Hypoallergenic
          </Typography>
          <Typography>{data?.data?.attributes?.hypoallergenic}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" marginRight={5} width={300}>
            Female_weight ( Min )
          </Typography>
          <Typography>{data?.data?.attributes?.female_weight.min}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" marginRight={5} width={300}>
            Female_weight ( Max )
          </Typography>
          <Typography>{data?.data?.attributes?.female_weight.max}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" marginRight={5} width={300}>
            Male_weight ( Min )
          </Typography>
          <Typography>{data?.data?.attributes?.male_weight.min}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" marginRight={5} width={300}>
            Male_weight ( Max )
          </Typography>
          <Typography>{data?.data?.attributes?.male_weight.max}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" marginRight={5} width={300}>
            Life: ( Min )
          </Typography>
          <Typography>{data?.data?.attributes?.life.min}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" marginRight={5} width={300}>
            Life: ( Max )
          </Typography>
          <Typography>{data?.data?.attributes?.life.max}</Typography>
        </Box>
      </Box>
    </div>
  );
};

export default DetailsDog;
