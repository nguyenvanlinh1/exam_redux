import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useGetDogsQuery } from "../store/service/dog.service";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { handleSlug } from "../utils/slug";
import LoadingPage from "../components/Loading/LoadingPage";
import { useState } from "react";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "../configs/TypeError";
import PageError from "../components/Error/PageError";
import { toast } from "react-toastify";
import LoadingData from "../components/Loading/LoadingData";
import LoadingButton from "../components/Loading/LoadingButton";

const HomePage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const { data, isLoading, error } = useGetDogsQuery();
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  if (isLoading) {
    return <LoadingData />;
  }

  if (error) {
    if (isFetchBaseQueryError(error)) {
      return <PageError status={error.status} />;
    } else if (isErrorWithMessage(error)) {
      toast.error(error.message);
    }
  }

  const handleDetailProduct = (name: string, id: string) => {
    setLoadingStates((prevState) => ({ ...prevState, [id]: true })); // Set loading state for specific item

    setTimeout(() => setProgress(30), 500);
    setTimeout(() => setProgress(80), 1000);
    setTimeout(() => setProgress(100), 1500);
    setTimeout(() => {
      navigate(`/${handleSlug(name) + "_" + id}`);
      setLoadingStates((prevState) => ({ ...prevState, [id]: false })); // Reset loading state after navigation
    }, 3000);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: "0 100px",
      }}
    >
      <LoadingPage
        progress={progress}
        setProgress={() => setProgress(0)}
        delay={2000}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <b>ID</b>
              </TableCell>
              <TableCell align="center">
                <b>Name</b>
              </TableCell>
              <TableCell align="center">
                <b>Description</b>
              </TableCell>
              <TableCell align="center">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell align="justify">{item.attributes.name}</TableCell>
                <TableCell
                  align="justify"
                  sx={{
                    textOverflow: "hidden",
                    overflow: "hidden",
                  }}
                >
                  {item.attributes.description}
                </TableCell>
                <TableCell align="right">
                  <CustomButton
                    name={
                      loadingStates[item.id] ? (
                        <LoadingButton />
                      ) : (
                        "Xem chi tiết"
                      )
                    }
                    onClick={() =>
                      handleDetailProduct(item.attributes.name, item.id)
                    }
                    disabled={loadingStates[item.id]}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HomePage;
