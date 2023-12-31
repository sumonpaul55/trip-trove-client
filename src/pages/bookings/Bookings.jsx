import React, { useState } from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hook/useAuth';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./bookings.css"
import useGetTourGuide from '../../hook/useGetTourGuide';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAxiosPublic from '../../hook/useAxiosPublic';
import { toast } from 'react-toastify';
const image_apiKey = import.meta.env.VITE_IMAGE_API_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_apiKey}`

const Bookings = () => {
    const [startDate, setStartDate] = useState(new Date());
    const bookedData = useLoaderData()
    const navigate = useNavigate()
    const [processing, setProcessing] = useState(false)
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const { tourGuide } = useGetTourGuide()
    const { price, spot_photo, tour_guide_email, tour_guide_image, tour_guide_name, trip_title } = bookedData;
    const location = useLocation()
    const handleBookings = async (e) => {
        setProcessing(true)
        e.preventDefault()
        const form = e.target;
        if (user && user?.email) {
            const imageFile = form.image.files[0]
            const formData = new FormData();
            formData.append('key', image_apiKey);
            formData.append('image', imageFile);
            const res = await axios.post(image_hosting_api, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.data.success) {
                const name = form.name.value;
                const email = form.email.value;
                const date = startDate.toLocaleDateString();
                const tourGuide = form.tourGuideName.value;
                const userEmail = user?.email;
                const touristImg = res.data?.data?.display_url
                const status = "In review"
                const bookingInfo = {
                    name, email, date, tourGuide, price, userEmail, spot_photo, tour_guide_email, tour_guide_image, tour_guide_name, touristImg, trip_title, status
                }
                const response = await axiosPublic.post("/myBookings", bookingInfo)
                if (response.data.insertedId) {
                    setProcessing(false)
                    Swal.fire({
                        title: "Are you Sure to booking?",
                        text: "You can managed it form your my booking",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, Login"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            toast(`${trip_title} booked Successfully`, {
                                autoClose: 2000,
                                position: "bottom-right"
                            })
                            navigate("/dashboard/myBookings")
                        }
                    });
                }
            }
        } else {
            Swal.fire({
                title: "You have to login first!",
                text: "You won't be able to book it without login!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { form: location } })
                }
            });
        }
    }

    return (
        <main className='pt-14'>
            <section className='pt-10 pb-20'>
                <div className='container mx-auto'>
                    <div className='bg-slate-700 text-white py-10 px-6'>
                        <form onSubmit={handleBookings}>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10'>
                                <div>
                                    <label htmlFor="">Tourist Name</label>
                                    <input type="text" placeholder='Touris Name' name='name' defaultValue={user?.displayName} required className='text-black w-full px-2 py-1 outline-none rounded-md' />
                                </div>
                                <div>
                                    <label htmlFor="">Tourist Email</label>
                                    <input type="text" placeholder='Touris Email' name='email' defaultValue={user?.email} required className='text-black w-full px-2 py-1 outline-none rounded-md' />
                                </div>
                                {/* only image in this side */}
                                <div>
                                    <label htmlFor="">Your image</label>
                                    <input type="file" name='image' required className='w-full px-2 py-1 outline-none text-black rounded-md bg-white' />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 items-center'>
                                <div>
                                    <label htmlFor="" className='font-bold'>Price $</label>
                                    <input type="text" defaultValue={price} disabled className='text-black w-full px-2 py-1 outline-none rounded-md' />
                                </div>
                                <div className='text-black'>
                                    <label htmlFor="" className='font-bold text-white'>Date</label>
                                    <DatePicker required selected={startDate} onChange={(date) => setStartDate(date)} className='py-1 rounded-md w-full' />
                                </div>
                                <div className='text-black'>
                                    <label htmlFor="" className='font-bold text-white'>Tour Guide name</label>
                                    <select name="tourGuideName" required id="" className='w-full py-1 px-3 rounded-md'>
                                        {
                                            tourGuide?.map((items, idx) => (
                                                <option className='text-black' key={idx} value={items.name}>{items.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='text-center'>
                                <input type="submit" value="Book Now" className='px-2 py-1 bg-pink-600 text-white mt-10 md:px-8 cursor-pointer' />
                            </div>
                        </form>
                    </div>
                    {
                        processing && <div className='fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-40 flex justify-center items-center'>
                            <div className='animate-spin p-4 bg-black'></div>
                        </div>
                    }
                </div>
            </section>
        </main>
    );
};

export default Bookings;