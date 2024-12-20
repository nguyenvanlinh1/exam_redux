import { FaSpinner } from "react-icons/fa";
import "./loadingData.css"

const LoadingData = () => {
  return (
    <div className="loading-container">
      <FaSpinner className="spinner" />
    </div>
  )
}

export default LoadingData