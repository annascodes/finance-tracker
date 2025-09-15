import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className="text-3xl text-center font-bold my-5">Sign in <span className="text-sm tracking-wider">page</span> </h1>

      <SignIn />
    </div>
  )
}