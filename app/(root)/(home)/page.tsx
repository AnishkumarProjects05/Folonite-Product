"use client"; // Ensure this is a client component

import MeetingList from '@/components/MeetingList';
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date()); // Update the time every second
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);


  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      {/* Add the background image here */}
      <div className='h-[300px] w-full rounded-[20px] bg-cover bg-center' style={{ backgroundImage: "url('/images/hero-background.png')" }}>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py8 lg:p-11'>
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base'>Upcoming meeting in 12:30 AM</h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {formattedTime} {/* Dynamic Time */}
            </h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>
              {formattedDate} {/* Dynamic Date */}
            </p>
          </div>
        </div>
      </div>
      <MeetingList />
    </section>
  );
};

export default Home;