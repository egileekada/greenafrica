import React from 'react' 
import FlightIcon from "assets/svgs/flight_icon.svg";
import {useIsOverflow}  from './component/useIsOverflow';

export default function CustomSlider(props) { 

    const ref = React.useRef(null);  
    const isOverflow = useIsOverflow(ref); 
    const scroll = (scrolloffset) =>{
        ref.current.scrollLeft += scrolloffset 
    };     

    const handleScroll = (e) => { 
        const bottom = e.target.scrollWidth - ref.current.scrollLeft === e.target.clientWidth;
        if (bottom) { 
            console.log("bottom")
            scroll(-100000)
        }
     } 

    return (
        <div className=' flex items-center ' > 
            {isOverflow && ( 
                <button onClick={()=> scroll(-309)} className=' w-[46px] h-[46px] -mr-5 z-[40] bg-[#261F5E] rounded-full hidden md:flex justify-center items-center  ' >
                    <img src="/images/slick_left.svg" />
                </button>
            )}
            <div onScroll={handleScroll} className=' flex flex-1 overflow-x-auto hidescroll ' ref={ref} >
                <div className=' w-auto flex gap-6 ' > 
                    {props?.data?.map((destination, index) => (
                        <a
                            className="my-4 w-[309px] "
                            href={`/destination/${destination.destination}?origin=${destination.origin}`}
                            key={index}
                        >
                            <div className="relative">
                            <FlightIcon className="inline-block absolute" />
                            <h1 className="text-primary-main pl-5 font-semibold text-lg mb-2 rounded-full bg-grey-light py-2 text-center w-[80%]">
                                {destination.destination_fullname}
                            </h1>
                            </div>
                            <p className="text-base text-primary-main font-light ml-8">
                            Starting at ₦{destination.lowest_fare}
                            </p>
                            {destination.image_url ? ( 
                            <img
                                src={`${destination.image_url}`}
                                alt={destination.destination}
                                className="object-cover w-full h-[180px] rounded-lg"
                            />
                            ): (
                            <div className="object-cover w-full bg-primary-main h-[180px] rounded-lg"/>
                            )}
                        </a>
                    ))}
                </div>
            </div>
            {isOverflow && ( 
                <button onClick={()=> scroll(309)} className=' w-[46px] h-[46px] -ml-5 z-[40] bg-[#261F5E] rounded-full hidden md:flex justify-center items-center  ' >
                    <img src="/images/slick_right.svg" />
                </button>
            )}
        </div>
    )
} 