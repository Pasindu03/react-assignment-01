
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {Home} from "./pages/Home.tsx";
import {RootLayout} from "./components/RootLayout.tsx";
import {CustomerDash} from "./pages/CustomerDash.tsx";
import {ItemDash} from "./pages/ItemDash.tsx";
import {OrdersDash} from "./pages/OrdersDash.tsx";
import {OrderDetailsDash} from "./pages/OrderDetailsDash.tsx";


function App() {
    const routes = createBrowserRouter([
        {path:'',element:<RootLayout/>,children:[
                {path: '/', element: <Home/>},
                {path:'/customer',element:<CustomerDash/>},
                {path:'/items',element:<ItemDash/>},
                {path:'/orders',element:<OrdersDash/>},
                {path:'/orderdetail',element:<OrderDetailsDash/>},
                ]}
    ])
    return (
        <>
            <RouterProvider router={routes}/>

        </>
    )
}

export default App