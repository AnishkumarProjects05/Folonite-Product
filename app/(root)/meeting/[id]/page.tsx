"use client";
import { useUser  } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';
import { useGetCallById } from '@/hooks/useGetCallById';
import Loader from '@/components/Loader';

const Meeting =  ({ params: { id } }: { params: { id: string } }) => {

  const { user ,isLoaded } = useUser ();
  const [isSetupComplete, setisSetupComplete] = useState(false);
  const {call,isCallLoading} = useGetCallById(id);
  if(!isLoaded || isCallLoading) return <Loader />

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {isSetupComplete ? (
            <MeetingRoom />
          ):(
            <MeetingSetup setisSetupComplete={setisSetupComplete} />
          )}

        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting