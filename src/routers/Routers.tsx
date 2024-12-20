import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import DetailsDog from "../pages/DetailsDog"
import PageError from "../components/Error/PageError"

const NOTFOUND = 404

const Routers = () => {
  return (
    <div>
        <Routes>
            <Route path="" element={<HomePage/>}></Route>
            <Route path="/:slugbyname" element={<DetailsDog/>}></Route>
            <Route path="*" element={<PageError status={NOTFOUND}/>}></Route>
        </Routes>
    </div>
  )
}

export default Routers