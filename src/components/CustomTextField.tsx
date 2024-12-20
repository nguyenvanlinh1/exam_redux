import { Box, TextField, Typography } from "@mui/material";

interface ITextField {
  title: string;
  name: string;
  value: string;
  required?: boolean;
  inputRef?: React.Ref<any> | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

const CustomTextField = ({
  title,
  name,
  value,
  required,
  onChange,
  inputRef,
  errorMessage,
}: ITextField) => {
  return (
    <Box sx={{display:"flex", flexDirection:"column", gap: 1}}>
      <Typography variant="h6" fontWeight={600}>
        {title}
      </Typography>
      <TextField
        name={name}
        value={value.trim()}
        required={required}
        inputRef={inputRef}
        onChange={onChange}
        onDrop={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
      ></TextField>
      {errorMessage && (
        <Typography variant="body1" fontWeight={500} sx={{ color: "red" }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default CustomTextField;
