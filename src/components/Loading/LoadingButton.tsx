import { ImSpinner10 } from "react-icons/im";

const LoadingButton = () => {
  return (
    <div className="spinner-container" style={{backgroundColor:"#FFA21A"}}>
      <ImSpinner10 style={{color:"white", backgroundColor:"#FFA21A"}}/>
    </div>
  );
};

export default LoadingButton;
