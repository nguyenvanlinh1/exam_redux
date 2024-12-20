import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HTTP_CODE from "../../utils/httpCode";

export interface IPageError {
  status?:
    | number
    | "FETCH_ERROR"
    | "PARSING_ERROR"
    | "TIMEOUT_ERROR"
    | "CUSTOM_ERROR";
}

const PageError = (props: IPageError) => {
  const { status } = props;
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Typography variant="h1" color="primary" gutterBottom>
        {status}
      </Typography>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        {HTTP_CODE[status as keyof typeof HTTP_CODE]
          ? HTTP_CODE[status as keyof typeof HTTP_CODE]
          : "Lỗi không xác định"}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ marginTop: 2 }}
      >
        Quay về Trang chủ
      </Button>
    </Box>
  );
};

export default PageError;
