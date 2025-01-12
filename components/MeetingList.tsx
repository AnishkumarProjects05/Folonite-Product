"use client"; // Ensure this
import {useState} from "react"//  is a client component
import React from 'react'
import Image from 'next/image'
import HomeCard from './HomeCard';
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { Description } from "@radix-ui/react-dialog";
import { link } from "fs";
import { useToast } from "@/hooks/use-toast";
import { title } from "process";

const MeetingList = () => {
    const router = useRouter();
    const [meetingState, setmeetingState] = useState<'isScheduleMeeting' |'isJoiningMeeting'  | 'isInstantMeeting' | undefined>();
    const {user} = useUser();
    const client = useStreamVideoClient();
    const [value, setvalue] = useState({
      dataTime: new Date(),
      description: '',
      link: '',

    })
    const [callDetails, setcallDetails] = useState<Call>()
    const {toast} = useToast();
    const createMeeting = async() => {
      if(!client || !user) return;
      try{
        if(!value.dataTime){
          toast({
            title: "Please select a date and Time"
           
          })
        }
        const id = crypto.randomUUID();
        const call = client.call('default',id);
        if(!call) throw new Error('Call can  not create');
        const startsAt = value.dataTime.toISOString()|| new Date(Date.now()).toISOString();
        const description = value.description || 'Instant Meeting';
        await call.getOrCreate({
          data: {
            starts_at: startsAt,
            custom:{
              description,
            }
          }
        })

        setcallDetails(call);
        if(!value.description){ router.push(`/meeting/${call.id}?isSetupComplete=true`);}
        toast({title})


      }
      catch(error){
        console.log(error);
        toast({
          title: "Failed to call"
         
        })

      }
      
      
    }
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <HomeCard 
            img= "/icons/add-meeting.svg"
            title="New Meeting"
            descripton="Start an instant meeting"
            handleClick={()=>setmeetingState('isInstantMeeting')}
            className="bg-cyan-900"
        />
        <HomeCard
        img= "/icons/schedule.svg"
        title="Schedule Meeting"
        descripton="Plan your meeting"
        handleClick={()=>setmeetingState('isScheduleMeeting')}
        className="bg-green-500"
         />
        <HomeCard 
        img= "/icons/recordings.svg"
        title="View Recordings"
        descripton="Check out your recordings"
        handleClick={()=>setmeetingState('isJoiningMeeting')}
        className="bg-red-500"/>
        <HomeCard 
        img= "/icons/join-meeting.svg"
        title="Join Meeting"
        descripton="Via link"
        handleClick={()=>setmeetingState('isJoiningMeeting')}
        className="bg-indigo-600"/>
        <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setmeetingState(undefined)}
        title="Start a instant meeting"
        buttonText="Start Meeting"
        handleClick={createMeeting} className={""} children={undefined} image={""} buttonIcon={""}        
        />

    </section>
  )
}

export default MeetingList