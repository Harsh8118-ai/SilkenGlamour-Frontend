import React from 'react'
import { LogoColor } from '../../Style';



export default function About() {
  return (
    
    <>
    <div className='m-0 h-full w-full bg-MainBGColorYellow'>
    <div className="flex flex-col xl:mx-7 items-center justify-center "> 
      <h2 className={`text-2xl font-bold text-center m-3 ${LogoColor}`}>Pick Your Favorite Salon & Parlour at Home Service</h2>
      <p className="text-center text-sm mb-8 font-bold">
        Best Quality Products | Trained & Verified Beauticians | Pocket-Friendly Offers | Delhi NCR, Noida, Faridabad, Greater Noida
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

        <div title='UPPER ABOUT BOX'>
          <div className="flex flex-col-reverse lg:flex-row sm:mb-5 mb-8
        sm:hover:shadow-gray-400 sm:hover:shadow sm:shadow-none shadow-gray-400 shadow sm:text-right m-3 text-center lg:-mr-4">
            <div className='shadow-sm shadow-gray-900 rounded-xl'>
              <h3 className="font-bold sm:items-end sm:text-center lg:text-right text-xl">Head & Body Massage</h3>
              <p id='About-P'>
                Pamper your inner and outer body at home with our soothing and relaxing body massage services because In & out beauty matters! Get personalized salon services brought to your doorstep with our Salon at Home.
              </p></div>
            <div className='h-full w-full lg:align-top flex justify-center mt-2'>
              <img src="About\HeadBody.webp" alt="Head & Body Massage" className='' />
            </div>
          </div>

          <div className="flex flex-col-reverse lg:flex-row sm:mb-5 mb-8 sm:mr-8
        sm:hover:shadow-gray-400 sm:hover:shadow sm:shadow-none shadow-gray-400 shadow sm:text-right m-3 text-center">
            <div className='shadow-sm shadow-gray-900 rounded-xl'>
              <h3 className="font-bold sm:items-end sm:text-center lg:text-right text-xl ">Facial & Cleanup</h3>
              <p id='About-P'>
                Let your beautiful face talk. Enjoy the best offers on facial massage in your own comfort space to revamp the quality of your facial skin with our Salon at Home services.
              </p></div>
            <div className='h-full w-full lg:align-top flex justify-center mt-2'>
              <img src="About\Facial.webp" alt="Head & Body Massage" className='' />
            </div>
          </div>

          <div className="flex flex-col-reverse lg:flex-row sm:mb-5 mb-8
        sm:hover:shadow-gray-400 sm:hover:shadow sm:shadow-none shadow-gray-400 shadow sm:text-right m-3 text-center lg:-mr-3">
            <div className='shadow-sm shadow-gray-900 rounded-xl'>
              <h3 className="font-bold sm:items-end sm:text-center lg:text-right text-xl">Waxing at home</h3>
              <p id='About-P'>
                Don't have time to go to the salon? Don’t worry! Get rid of unwanted hair at home with our personalized salon services brought to your comfort and privacy. Save your precious time with our Salon at Home services.
              </p></div>
            <div className='h-full w-full lg:align-top flex justify-center mt-2'>
              <img src="About\Waxing.webp" alt="Head & Body Massage" className='' />
            </div>
          </div>

        </div>

        <div title='MID IMAGE' className='flex justify-center items-center'>
          <img src="About\Mid.webp" alt="" className='rounded-full m-auto mt-8 mb-8 sm:mt-12 sm:mb-0' />
        </div>

        <div title='DOWN ABOUT BOX'>

          <div className='flex flex-col lg:flex-row mb-8 sm:mb-0 mt-4 sm:mt-2 
        sm:hover:shadow-gray-400 sm:hover:shadow sm:shadow-none shadow-gray-400 shadow sm:text-left mx-3  text-center'>

            <div className='h-full w-full sm:align-top flex justify-center mt-2'>
              <img src="About\Hair.webp" alt="Head & Body Massage" /></div>
            <div className=''>
              <h3 className="font-bold lg:text-left sm:text-center text-xl sm:text-lg">Hair Spa at home</h3>

              <p id='About-P'>
                From oil massaging to hair coloring, we have all the amazing salon services to make your hair more beautiful with hassle-free Hair Spa solutions delivered to your home. Get salon-perfect hair without leaving your home.
              </p></div>

          </div>

          <div className='flex flex-col lg:flex-row mb-8 sm:mb-2 mt-8 sm:ml-9 sm:mt-1
        sm:hover:shadow-gray-400 sm:hover:shadow sm:shadow-none shadow-gray-400 shadow sm:text-left mx-3  text-center'>

            <div className='h-full w-full sm:align-top flex justify-center mt-2'>
              <img src="About\Mani.webp" alt="Head & Body Massage" /></div>

            <div className='shadow-sm shadow-gray-900 rounded-xl'>
              <h3 className="font-bold lg:text-left sm:text-center text-xl sm:text-lg">Manicure & Pedicure</h3>

              <p id='About-P'>
              Get the perfect curation and care for your nails, hands, and feet delivered to your home with the best and most glamorizing mani-pedi offers in our Salon at Home services.
              </p></div>

          </div>

          <div className='flex flex-col lg:flex-row sm:mb-5 mb-8 sm:mt-2 mt-8 
        sm:hover:shadow-gray-400 sm:hover:shadow sm:shadow-none shadow-gray-400 shadow sm:text-left mx-3 text-center'>

            <div className='h-full w-full sm:align-top flex justify-center mt-2'>
              <img src="About\Bleach.webp" alt="Head & Body Massage" /></div>

            <div className='shadow-sm shadow-gray-900 rounded-xl'>
              <h3 className="font-bold lg:text-left text-xl sm:text-center sm:text-lg">Bleach & D-tan</h3>

              <p id='About-P'>
              Avoid wax and threading pain by opting for the effective and amazing bleach & D-tan treatment with our Salon at Home services. Enjoy the convenience of salon services in the comfort of your home.
              </p></div>

          </div>
          

        </div>
      </div>
    </div>
    
    
    </div>
    </>

  );
}