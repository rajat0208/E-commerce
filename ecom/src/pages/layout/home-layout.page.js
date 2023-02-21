import React from "react";
import CustomComponent from "../../components"
import { Outlet } from "react-router-dom";
const HomePageLayout = () => {
    return (<>
        <CustomComponent.MenuComponent />
        <Outlet />
        <CustomComponent.HomePageFooterComponent />
    </>)
}
export default HomePageLayout