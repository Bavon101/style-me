"use client"

import { Switch } from "@headlessui/react";
import PriceCard from "../components/PriceCard";
import { useState } from "react";

export default function Page() {
    const [enabled, setEnabled] = useState(false)
    const Pricing = [
        {
            name:"Free",
            text:"Everything you need to grow your brand",
            price:0,
            subtext:"",
            benefits1: [
                "1 Pinterest Account"," ! Instagram Account","1 Facebook Page"
            ],
            benefits2:[]
        },
        {
            name:"Pro",
            text:"Everything you need to grow your brand",
            price:enabled ? 15.00 : 24.99,
            subtext:enabled ? "$155.88 billed annually" : "Save $84 a year by switching to annual",
            benefits1: [
                "First Month Free","50 credits","200 images","Every other month after"
            ],
            benefits2:["Cost Free","15 credits","60 images"]
        },
        {
            name:"Advanced",
            text:"Advanced features for growing multiple brands",
            price:enabled ? 39.99 : 19.99,
            subtext:enabled ? "$239.88 billed annually" : "Save $240 a year by switching to annual",
            benefits1: [
                "First Month Free","50 credits","200 images","Every other month after"
            ],
            benefits2:["Cost Free","15 credits","60 images"]
        },
        {
            name:"Max",
            text:"Unlimited access for managing multiple accounts",
            price:enabled ? 39.99 : 24.99,
            subtext:enabled ? "$479.88 billed annually" : "Save $480 a year by switching to annual",
            benefits1: [
                "First Month Free","50 credits","200 images","Every other month after"
            ],
            benefits2:["Cost Free","15 credits","60 images"]
        },
    ]
  return (
    <div className="bg-white py-12 px-4 sm:px-0">
        <div className="sm:w-[95%] m-auto">
           <div className=" sm:text-center text-black">
    <h1 className="font text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
    Plans & Pricing
              </h1>
              <p className="py-8">Try Tailwind's time-saving features free, no credit card required</p>
              <div className="flex justify-center content-center">
               <p className={`mt-[8px] mr-[4px] ${enabled ? "text-teal-900" : "text-teal-700" }`}>Annually</p> 
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-teal-900' : 'bg-teal-700'}
          relative inline-flex h-[38px] w-[87px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-12' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
     <p className={`mt-[8px] ml-[4px]  ${!enabled ? "text-teal-900" : "text-teal-700" }`}>Monthly</p> 
    </div>
    </div>

    {/* card prices */}
    <div className="sm:flex justify-between my-10 gap-3">
        {Pricing.map((price,index)=>{
            return (
                <PriceCard price={price} key={index}  />
            )
        })

        }
    </div> 
        </div>
    
    </div>
  );
}
