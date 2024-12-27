import {
  Pagination,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Dog, useGetDogPageQuery } from "../store/service/dog.service";
import { useNavigate } from "react-router-dom";
import { handleSlug } from "../utils/slug";
import { useEffect, useState } from "react";
import {
  CustomButton,
  LoadingButton,
  LoadingData,
  LoadingPage,
} from "../components";
import {
  DEFAULT_PAGE,
  DEFAULT_PROGRESS,
  PROGRESS_COMPLETE,
  PROGRESS_MID,
  PROGRESS_START,
  TIME_TO_COMPLETE,
  TIME_TO_MID,
  TIME_TO_START,
} from "../constant/constant";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "../configs/TypeError";
import { toast } from "react-toastify";
import { debounce } from "../configs/debouce";

const HomePage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<Dog[]>([]);
  const [isScrollingLoading, setIsScrollingLoading] = useState(false);

  const [progress, setProgress] = useState(DEFAULT_PROGRESS);
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [isPagination, setIsPagination] = useState<Boolean>(true);
  const {
    data: dataPage,
    isLoading: isLoadingPage,
    error: errorPage,
  } = useGetDogPageQuery(page);

  useEffect(() => {
    const handleScroll = () => {
      if (isPagination || isLoadingPage || isScrollingLoading) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 30) {
        setIsScrollingLoading(true);
        const debouncedSetPage = debounce(() => {
          setPage((prevPage) => prevPage + 1);
        }, 1000);
        debouncedSetPage();
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isPagination, isLoadingPage, isScrollingLoading]);

  useEffect(() => {
    if (dataPage?.data && !isLoadingPage) {
      setData((prevData) => [...prevData, ...dataPage.data]);
      setIsScrollingLoading(false);
    }
  }, [dataPage, isLoadingPage]);

  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  if (errorPage) {
    if (isFetchBaseQueryError(errorPage)) {
      navigate(`/error/${errorPage.status}`);
    } else if (isErrorWithMessage(errorPage)) {
      toast.error(errorPage.message);
    }
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setTimeout(() => setProgress(PROGRESS_START), TIME_TO_START);
    setTimeout(() => setProgress(PROGRESS_MID), TIME_TO_MID);
    setTimeout(() => {
      setProgress(PROGRESS_COMPLETE);
      setPage(value);
      scroll(0, 0);
    }, TIME_TO_COMPLETE);
    navigate(`/breads?page=${value}`);
  };

  const handleDetailProduct = (name: string, id: string) => {
    setLoadingStates((prevState) => ({ ...prevState, [id]: true }));

    setTimeout(() => setProgress(PROGRESS_START), TIME_TO_START);
    setTimeout(() => setProgress(PROGRESS_MID), TIME_TO_MID);
    setTimeout(() => setProgress(PROGRESS_COMPLETE), TIME_TO_COMPLETE);
    setTimeout(() => {
      navigate(`/${handleSlug(name) + "_" + id}`);
      setLoadingStates((prevState) => ({ ...prevState, [id]: false }));
    }, TIME_TO_START + TIME_TO_COMPLETE);
  };

  const handleClick = () => {
    setIsPagination(!isPagination);
    if (isPagination) {
      navigate("/");
    }
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
      <CustomButton
        name={isPagination ? "Pagination" : "No Pagination"}
        onClick={handleClick}
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
            {isPagination
              ? dataPage?.data?.map((item, index) => (
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
                      {(page - 1) * 10 + index + 1}
                    </TableCell>
                    <TableCell align="justify">
                      {item.attributes?.name}
                    </TableCell>
                    <TableCell
                      align="justify"
                      sx={{
                        textOverflow: "hidden",
                        overflow: "hidden",
                      }}
                    >
                      {item.attributes?.description}
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
                          handleDetailProduct(item.attributes?.name, item.id)
                        }
                        disabled={loadingStates[item.id]}
                      />
                    </TableCell>
                  </TableRow>
                ))
              : data?.map((item, index) => (
                  <TableRow
                    key={`${item.id}-${index}`}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      width={100}
                      align="center"
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell align="justify">
                      {item.attributes?.name}
                    </TableCell>
                    <TableCell
                      align="justify"
                      sx={{
                        textOverflow: "hidden",
                        overflow: "hidden",
                      }}
                    >
                      {item.attributes?.description}
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
                          handleDetailProduct(item.attributes?.name, item.id)
                        }
                        disabled={loadingStates[item.id]}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            {isScrollingLoading && (
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  width={100}
                  align="center"
                >
                  <Skeleton variant="rectangular" height={100} />
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  width={100}
                  align="center"
                >
                  <Skeleton variant="rectangular" height={100} />
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  <Skeleton variant="rectangular" height={100} />
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  width={150}
                  align="center"
                >
                  <Skeleton variant="rectangular" height={100} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {isPagination === true && (
        <Pagination
          count={29}
          color="primary"
          page={page}
          onChange={handleChange}
          sx={{ display: "flex", justifyContent: "center", my: 2 }}
        />
      )}
    </div>
  );
};

export default HomePage;
