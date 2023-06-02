


interface IPrice {
        name: string;
        text: string;
        price: number;
        subtext: string;
        benefits1: string[];
        benefits2: string[];
}
const PriceCard = ({price}:{price:IPrice}) => {
  return (
    <div className="border p-5 text-black my-6 rounded">
        <h4 className="font-semibold">{price.name}</h4>
        <p className="text-[14px] my-[18px]">{price.text}</p>
        <h2 className="text-4xl font-bold">${price.price} <span className="text-sm text-[#333]">/mo</span></h2>
        <p className="text-sm mt-6 h-[40px]">{price.subtext}</p>
        <button className="w-[100%] h-[40px] bg-[#0069B4] text-[#fff] rounded my-[14px]">
            Buy {price.name}
        </button>
        <p className="font-bold text-sm my-[15px]">WHAT'S INCLUDED</p>
        <p className="text-[#0069B4]">First Month</p>
        {price.benefits1.length >0 &&
       <>
       {price.benefits1.map((benefit,index)=>{
        return (
            <div key={index}>
              <p className="text-sm my-[7px] pl-3">{benefit} </p> 
            </div>
        )
       })}
       </>
        }
       {price.benefits2.length >0 &&
       <>
       <p className="pl-0 text-[#0069B4]">Every Other Month After</p>
       {price.benefits2.map((benefit,index)=>{
        return (
            <div key={index}>
              <p className="text-sm my-[7px] pl-3">{benefit} </p> 
            </div>
        )
       })}
       </>
       }
        
    </div>
  )
}

export default PriceCard