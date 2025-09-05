import { assets } from "../assets/assets"


const Footer = () => {
  return (
    <div className="md:mx-10">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

            {/* left */}
            <div>
                 <img src={assets.logo} alt="" />
                 <p className="w-full md:w-2/3 text-gray-600 leading-6 mt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>

            {/* center */}
             <div>
                  <p className="text-xl font-medium mb-5">COMPANY</p>
                  <ul className=" flex flex-col gap-2 text-gray-600">
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                  </ul>
             </div>
             
             {/* right */}
             <div>
                   <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                   <ul className=" flex flex-col gap-2 text-gray-600">
                    <li>23232334</li>
                    <li>me.abhijain17@gmail.com</li>
                   </ul>
             </div>
        </div>

        <div className="flex items-center justify-center py-5 text-sm">
            {/* comment */}
           <hr />
           <p>copyright 2025@ Prescripto -All rights are Reserved</p>
        </div>
    </div>
  )
}

export default Footer