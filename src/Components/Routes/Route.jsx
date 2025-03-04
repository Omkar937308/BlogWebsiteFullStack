import { Outlet } from "react-router-dom"
import Header from "../Header/Header"
import Foot from "../Footer/Foot"
export default function Routes() {
    return (
        <>
            <Header />
            <Outlet />
            <Foot />
        </>
    )
}