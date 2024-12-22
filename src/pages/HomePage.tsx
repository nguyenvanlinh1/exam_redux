import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useGetDogsQuery } from "../store/service/dog.service";
import { useNavigate } from "react-router-dom";
import { handleSlug } from "../utils/slug";
import { useState } from "react";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "../configs/TypeError";
import { toast } from "react-toastify";
import {
  CustomButton,
  LoadingButton,
  LoadingPage,
  PageError,
} from "../components";
import {
  DEFAULT_PAGE,
  DEFAULT_PROGRESS,
  PROGRESS_COMPLETE,
  PROGRESS_MID,
  PROGRESS_START,
  ROW_PER_PAGE_END,
  ROW_PER_PAGE_MID,
  ROW_PER_PAGE_START,
  TIME_TO_COMPLETE,
  TIME_TO_MID,
  TIME_TO_START,
} from "../constant/constant";

const HomePage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);
  const { data, error } = useGetDogsQuery();
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  // if (isLoading) {
  //   return <LoadingData />;
  // }

  if (error) {
    if (isFetchBaseQueryError(error)) {
      return <PageError status={error.status} />;
    } else if (isErrorWithMessage(error)) {
      toast.error(error.message);
    }
  }

  const handleDetailProduct = (name: string, id: string) => {
    setLoadingStates((prevState) => ({ ...prevState, [id]: true }));

    setTimeout(() => setProgress(PROGRESS_START), TIME_TO_START);
    setTimeout(() => setProgress(PROGRESS_MID), TIME_TO_MID);
    setTimeout(() => setProgress(PROGRESS_COMPLETE), TIME_TO_COMPLETE);
    setTimeout(() => {
      navigate(`/${handleSlug(name) + "_" + id}`);
      setLoadingStates((prevState) => ({ ...prevState, [id]: false }));
    }, TIME_TO_START + TIME_TO_MID + TIME_TO_COMPLETE);
  };

  // so trang
  const [page, setPage] = useState(DEFAULT_PAGE);

  // so phan tu tren 1 trang
  const [rowsPerPage, setRowsPerPage] = useState(ROW_PER_PAGE_START);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(DEFAULT_PAGE);
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
        setProgress={() => setProgress(DEFAULT_PROGRESS)}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <b>Số thứ tự</b>
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
            {data?.data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    width={100}
                    align="center"
                  >
                    {page * rowsPerPage + index + 1}
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
                  <TableCell align="right" width={150}>
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
      <TablePagination
        rowsPerPageOptions={[
          ROW_PER_PAGE_START,
          ROW_PER_PAGE_MID,
          ROW_PER_PAGE_END,
        ]}
        component="div"
        count={data?.data.length ?? DEFAULT_PAGE}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ display: "flex", justifyContent: "center" }}
        labelRowsPerPage="Số hàng mỗi trang:"
      />
    </div>
  );
};

export default HomePage;
