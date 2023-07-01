import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

const BASE_URL = "http://localhost:8000";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        alert("Error loading data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Both work the same way */}
        <Route index element={<Homepage />} />
        {/* <Route path="/" element={<Homepage />} /> */}
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        {/* Nested route */}
        <Route path="app" element={<AppLayout />}>
          {/* These all are child of app, so url will be like /app/cities for path="cities" , so where these elements will be shown? so we use <Outlet /> component provided by react-router-dom , so we can use <Outlet /> where we want to see these elements, in our case we want to see then in sidebar so we used <Outlet /> in sidebar*/}
          <Route index element={<Navigate replace to="cities" />} />
          {/* By Navigate we are directly navigated to cities , and if we go to /app it will automatically change route to /app/cities, and without replace we cannot move back to previous page so by replace it actually replace history page and we are able to move back to previous page */}
          {/* <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          /> */}
          {/* with this if we go to /app it will take us to /app pnly and show us content of /app/cities  */}
          {/* Index route is default child route which will be matched if no other route matched */}
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          {/* Dynamic route (we can say we used url for storing global state, which can be accessed in every component, It can be done using parameters and query string) */}
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  ); // path="*" means to handle path which we haven't handled manually
}

export default App;
