import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import { LoadingData, PageError } from "../components";
import { NOT_FOUND_STATUS } from "../constant/constant";

const HomePage = React.lazy(() => import("../pages/HomePage"));
const DetailsDog = React.lazy(() => import("../pages/DetailsDog"))

const Routers = () => {
  return (
    <div>
      <Suspense fallback={<LoadingData/>}>
        <Routes>
          <Route path="" element={<HomePage />}></Route>
          <Route path="/:slugbyname" element={<DetailsDog />}></Route>
          <Route path="*" element={<PageError status={NOT_FOUND_STATUS} />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default Routers;
