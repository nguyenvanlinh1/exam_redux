import { FaSpinner } from "react-icons/fa";
import "./loadingData.css"

export const LoadingData = () => {
  return (
    <div className="loading-container">
      <FaSpinner className="spinner" />
    </div>
  )
}
