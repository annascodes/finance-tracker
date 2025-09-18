'use client'
import CountdownTimer from "@/components/CountdownTimer";
import { useUser } from "@clerk/nextjs";
/* import { currentUser } from "@clerk/nextjs/server"; // in server component */

export default  function Home() {
 /*  const user = await currentUser()  // in: server component */
 const {isLoaded, isSignedIn, user} = useUser()

  return (
    <div >
      <h1 className="text-2xl text-center font-bold my-5">
        {
          user ? `Welcome! ${user.externalAccounts[0].firstName} ${user.externalAccounts[0].lastName}` : 'Welcome Guest'
        }

        <span className="text-sm tracking-wider mx-1">its your home.</span>
      </h1>

      
         




    </div>
  );
}
