/*import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
   <main className='flex h-screen w-full items-center justify-center'>
    <SignIn />
   </main>
  )
}

export default SignInPage*/
import { SignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
  const router = useRouter();

  return (
    <main className='flex h-screen w-full items-center justify-center'>
      <SignIn
        afterSignInUrl="/"
      />
    </main>
  );
};

export default SignInPage;