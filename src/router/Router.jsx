import React from 'react';
import { createBrowserRouter, } from "react-router-dom";
import MainLayout from '../layout/MainLayout';
import Home from '../pages/home/Home';
import Community from '../pages/home/community/Community';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import AllPackages from '../pages/allPackages/AllPackages';
import Dashboard from '../pages/dashBoard/Dashboard';
import Myprofile from '../pages/dashBoard/Myprofile/Myprofile';
import ManageUsers from '../pages/dashBoard/manageUsers/ManageUsers';
import PackageDetail from '../pages/allPackages/PackageDetail';
import SimilarTypeofTour from '../pages/home/tourType/SimilarTypeofTour';
import AllStories from '../pages/allStories/AllStories';
import StoryDetail from '../pages/storyDetail/StoryDetail';
import TourGuideDetails from '../pages/tourGuideDetail/TourGuideDetails';
import Bookings from '../pages/bookings/Bookings';
import MyBookings from '../pages/dashBoard/myBookings/MyBookings';
import MywishList from '../pages/dashBoard/MyWishList/MywishList';
import WishListDetails from '../pages/dashBoard/wishlistDetails/WishListDetails';
import AddPackage from '../pages/dashBoard/addPackage/AddPackage';
import MyAssignedTour from '../pages/dashBoard/myassignedTour/MyAssignedTour';
import Blog from '../pages/blog/Blog';
import Contact from '../pages/contact/Contact';
import ErrorPage from '../shared/Error';
import About from '../pages/about us/About';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "community",
                element: <Community></Community>
            },
            {
                path: "/register",
                element: <Register></Register>
            }, {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/all-packages",
                element: <AllPackages></AllPackages>
            },
            {
                path: "/all-Stories",
                element: <AllStories></AllStories>
            },
            {
                path: "/blogs",
                element: <Blog></Blog>
            },
            {
                path: "/contact-us",
                element: <Contact></Contact>

            },
            {
                path: "/about-us",
                element: <About></About>

            },
            {
                path: "/package-details/:id",
                loader: ({ params }) => fetch(`https://trip-trove-server.vercel.app/packageDetail/${params.id}`),
                element: <PackageDetail></PackageDetail>
            },
            {
                path: "/tourTypes/:tourName",
                element: <SimilarTypeofTour></SimilarTypeofTour>
            },
            {
                path: "/tourGuide-details/:id",
                loader: ({ params }) => fetch(`https://trip-trove-server.vercel.app/tourGuide/${params.id}`),
                element: <TourGuideDetails></TourGuideDetails>
            },
            {
                path: "/story-detail/:id",
                loader: ({ params }) => fetch(`https://trip-trove-server.vercel.app/story-detail/${params.id}`),
                element: <StoryDetail></StoryDetail>
            },
            {
                path: "/bookings/:id",
                loader: ({ params }) => fetch(`https://trip-trove-server.vercel.app/my-bookings/${params.id}`),
                element: <Bookings></Bookings>
            }
        ]
    },
    {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                index: true,
                element: <Myprofile></Myprofile>
            },
            {
                path: "MyAssignedTour",
                element: <MyAssignedTour></MyAssignedTour>
            },
            {
                path: "myProfile",
                element: <Myprofile></Myprofile>
            },
            {
                path: "manage-users",
                element: <ManageUsers></ManageUsers>
            },
            {
                path: "addPackage",
                element: <AddPackage></AddPackage>
            }
            ,
            {
                path: "myBookings",
                element: <MyBookings></MyBookings>
            },
            {
                path: "myWishlist",
                element: <MywishList></MywishList>
            },
            {
                path: "w-package-details/:id",
                loader: ({ params }) => fetch(`https://trip-trove-server.vercel.app/wishlist-detail/${params.id}`),
                element: <WishListDetails></WishListDetails>
            },

        ]
    }
]);



export default router;