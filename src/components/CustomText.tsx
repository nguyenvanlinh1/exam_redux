import { Grid2 } from "@mui/material";

interface IText {
  name: string;
  info: any;
}

const CustomText = ({ name, info }: IText) => {
  return (
    <>
      <Grid2 size={3}>
        <b>{name}</b>
      </Grid2>
      <Grid2 size={9}>{info.toString()}</Grid2>
    </>
  );
};

export default CustomText;
