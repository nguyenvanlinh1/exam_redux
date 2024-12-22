import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import { LoadingData, PageError } from "../components";

const HomePage = React.lazy(() => import("../pages/HomePage"));
const DetailsDog = React.lazy(() => import("../pages/DetailsDog"))

const NOTFOUND = 404;

const Routers = () => {
  return (
    <div>
      <Suspense fallback={<LoadingData/>}>
        <Routes>
          <Route path="" element={<HomePage />}></Route>
          <Route path="/:slugbyname" element={<DetailsDog />}></Route>
          <Route path="*" element={<PageError status={NOTFOUND} />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default Routers;
