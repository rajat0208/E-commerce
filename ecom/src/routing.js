import React, { useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, useSearchParams, Outlet } from "react-router-dom"
import Pages from "./pages";
import { useState } from 'react';
import CustomComponent from './components';

const BrandPage = () => {
    // //state hook
    let [brandDetail, setBrandDetail] = useState('Apple');
    let [product, setProdcut] = useState();
    let [category, setCategory] = useState();
    const [loading, setLoading] = useState(true);

    let [query, setQuery] = useSearchParams();

    let params = useParams();

    useEffect(() => {
        // frist time
        // api call => brand data fetch , product data fetch , category data fetch
        fetchData()
    }, [])

    const fetchData = useCallback(async () => {

    })

    useEffect(() => {
        fetchData()
    }, [brandDetail])

    useEffect(() => {
        setTimeout(() => {
            setBrandDetail("one")
        }, 3000)

    }, [category])

    return (<>
        <table>
            <thead>
                <th>S.N</th>
                <th>Name</th>
                <th>Status</th>
                <th>Action</th>
            </thead>
            <tbody>
                {
                    brandDetail ? <>component</> : <>loading...</>
                }
            </tbody>
        </table>
        <p>{params.id}</p>
        <p>{brandDetail}</p>
        <p>{category}</p>
    </>)
}
const Routing = () => {
    return (<>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Pages.HomePageLayout />}>
                    <Route index element={<Pages.Homepage />} />
                    <Route path="register" element={<Pages.AuthPage />} />
                    <Route path="login" element={<Pages.AuthPage />} />
                    <Route path="brand/:id" element={<BrandPage />} />
                    <Route path="category/:slug" element={<>Smartphone category list</>} />
                </Route>

                <Route path='/admin' element={<Pages.AdminLayout />}>
                    <Route index element={<CustomComponent.AdminDashboard/>} />
                    <Route path='product' element={<>Admin Product</>} />
                    <Route path='user' element={<>Admin User</>} />
                    <Route path='user/:id' element={<>Admin User Detail or Update</>} />
                </Route>

                <Route path="*" element={<Pages.ErrorPage />} />
            </Routes>

        </BrowserRouter>
    </>)
}
export default Routing;