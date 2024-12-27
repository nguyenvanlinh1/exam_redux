import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import { LoadingData, PageError } from "../components";
import { NOT_FOUND_STATUS } from "../constant/constant";
import { PageErrorRedirect } from "../components/Error/PageErrorRedirect";

const HomePage = React.lazy(() => import("../pages/HomePage"));
const DetailsDog = React.lazy(() => import("../pages/DetailsDog"))

const Routers = () => {
  return (
    <div>
      <Suspense fallback={<LoadingData/>}>
        <Routes>
          <Route path="" element={<HomePage />}></Route>
          <Route path="/breads" element={<HomePage />} />
          <Route path="/:slugbyname" element={<DetailsDog />}></Route>
          <Route path="*" element={<PageError status={NOT_FOUND_STATUS} />}></Route>
          <Route path="/error/:status" element={<PageErrorRedirect />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default Routers;
