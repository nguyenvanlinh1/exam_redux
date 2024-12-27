import { Box, Button, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import HTTP_CODE from "../../utils/httpCode";
import HTTP_CODE_STRING from "../../utils/httpCodeString";

export const PageErrorRedirect = () => {
  const { status } = useParams();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Typography variant="h3" color="red" gutterBottom>
        {status || "Unknown Error"}
      </Typography>
      <Typography variant="h5" color="black">
        {HTTP_CODE_STRING[status as keyof typeof HTTP_CODE_STRING]}
      </Typography>
      <Typography variant="h5" color="black">
        {HTTP_CODE[parseInt(status || "") as keyof typeof HTTP_CODE]}
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
