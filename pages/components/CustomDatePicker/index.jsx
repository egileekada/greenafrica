import React from 'react'
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Box from '@mui/material/Box';
import millify from "millify";
import { format } from "date-fns"; 

export default function CustomDatePicker(props) {

    const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

    const [open, setOpen] = React.useState(false);
    const customInputRef = React.useRef();
    const [selectedDate, setSelectedDate] = React.useState(new Date()); 
    
    const handleDateChange = (date) => { 
        setSelectedDate(date);
        setOpen(false);
    }; 

    React.useEffect(()=> {
        props.value(selectedDate) 
    },[selectedDate])



  function hasContent(date) {
    const lowfare = props?.data;
     
    console.log(date)
    for (const key in lowfare) {
        // console.log(lowfare[key].DepartureDate);
        // console.log(date);
      if (lowfare[key].DepartureDate === date) {
        return (
          <p className="">
            {lowfare[key].currency}
            {millify(Math.round(lowfare[key].amount))}
          </p>
        );
      }
    }
    return <p></p>;
  }

    const CustomInput =(props)=> { 
        return(  
            <div
                ref={customInputRef}
                onClick={() => 
                    setOpen(true)
                }
                role="button"
                className="booking__wrapper items-center w-full lg:w-[180px] justify-center h-[55px] hover:border-primary-main flex"
                >
                <span className="mr-2 ml-1 my-auto hidden md:block">
                    <svg
                    width="26"
                    height="22"
                    viewBox="0 0 26 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M25.9158 4.7268V19.9868C25.9158 21.0986 25.0132 21.9991 23.9025 21.9991L12.9579 21.9989H2.01339C0.90152 21.9989 8.39233e-05 21.0984 8.39233e-05 19.9865V4.72656L25.9158 4.7268ZM19.2175 17.2344H22.1969V14.2538H19.2163V17.2344H19.2175ZM19.2175 11.6596H22.1969V8.67902H19.2163V11.6596H19.2175ZM14.0504 17.2344H17.031V14.2538H14.0504V17.2344ZM14.0504 11.6596H17.031V8.67902H14.0504V11.6596ZM8.88441 17.2344H11.865V14.2538H8.88441V17.2344ZM8.88441 11.6596H11.865V8.67902H8.88441V11.6596ZM3.71845 17.2344H6.69903V14.2538H3.71845V17.2344ZM3.71845 11.6596H6.69903V8.67902H3.71845V11.6596Z"
                        fill="#261F5E"
                    />
                    <path
                        d="M8.39233e-05 3.66582V2.01233C8.39233e-05 0.900466 0.902674 0 2.01339 0L23.9025 0.000237024C25.0143 0.000237024 25.9158 0.900703 25.9158 2.01257V3.66581L8.39233e-05 3.66582Z"
                        fill="#261F5E"
                    />
                    </svg>
                </span>
                <div className="flex-auto pl-5 px-4  my-auto  md:px-0">
                    <p className="text-xs -mb-0 text-[#979797]">DEPARTING</p>
                    <p className=' font-normal ' >{props.inputProps.value}</p>
                </div>
            </div> 
        )
    }

    const CustomDay =(day, _value, DayComponentProps) => {   

        let date = format(new Date(DayComponentProps.key), "yyyy-MM-dd")  

        if(!DayComponentProps.disabled){
            return(
                <button onClick={()=> handleDateChange(day.$d)} style={ DayComponentProps.today ? {border: " 1px dashed #9E9BBF "} :!DayComponentProps.selected? { backgroundColor: "#1F195512" }: { backgroundColor: "#1F1955", color: "#47FF5A" }} className={' w-[40px] h-[45px] flex flex-col items-center mx-[1px] pt-1 '} >
                    <p className=' text-sm font-bold ' >{day.$D}</p>
                    <p className={!DayComponentProps.selected ? ' text-[10px] -mt-3 font-semibold text-[#9E9BBF] ': ' text-[10px] -mt-3 font-semibold '} >{hasContent(date)}</p>
                </button>
            )
        } else{ 
            return(
                <button style={ DayComponentProps.today ? {border: " 1px dashed #9E9BBF "} :!DayComponentProps.selected? { backgroundColor: "#1F195512" }: { backgroundColor: "#1F1955", color: "#47FF5A" }} className={' w-[40px] h-[45px] cursor-not-allowed flex flex-col items-center mx-[1px] pt-1 '} >
                    <p className=' text-sm font-bold ' >{day.$D}</p>
                    <p className={!DayComponentProps.selected ? ' text-[10px] -mt-3 font-semibold text-[#9E9BBF] ': ' text-[10px] -mt-3 font-semibold '} >{hasContent(date)}</p>
                </button>
            )
        }

    }

    return ( 
        <LocalizationProvider dateAdapter={AdapterDayjs}> 
            <DatePicker
                label="Custom input"
                value={selectedDate} 
                onChange={handleDateChange}
                disablePast
                open={open} 
                inputFormat="DD-MM-YYYY"
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)} 
                PopperProps={{ anchorEl: customInputRef.current }}
                renderInput={CustomInput} 
                renderDay={(day, _value, DayComponentProps)=>CustomDay(day, _value, DayComponentProps)} 
                
            />  
        </LocalizationProvider> 
    )
} 