import CountdownTimer from "@/components/CountdownTimer";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser()
  // console.log('page.tsx=> user: ', user)

  /* practice typescript ---starts */

  let person: { name: string; age: number; active: boolean } =
    { name: 'ali', age: 23, active: true }

  let flags: { [key: string]: boolean } = { isLoading: true, isError: false, isSent: true }


  type User = {
    [key: string]: string | number  // so this is umberala/parent/set other has to be underumberela/child(having parental charc)/subset
    id: number;
    readonly isActive: string;

  }


  let arr1: User[] = [
    { id: 123, isActive: 'true', name: 'alice' },
    { id: 890, isActive: 'false', name: 'james' },
  ]
  //  arr1[0].name = 'ajeeb'
  //  arr1[0].isActive = 'yes false'
  //  console.log(arr1)












  /* practice typescript ---ends */





  const counter = 'countdown timer'
  const temp: string = "This intentionally evokes JavaScript’s runtime typeof operator, but it operates at the level of TypeScript types and is much more precise. For more on typeof, see Item 8. Be careful about deriving types from values, however. It’s usually better to define types first and declare that values are assignable to them."

  



  return (
    <div >
      <h1 className="text-2xl text-center font-bold my-5">
        {
          user ? `Welcome! ${user.firstName} ${user.lastName}` : 'Welcome Guest'
        }

        <span className="text-sm tracking-wider mx-1">its your home.</span>
      </h1>
      <div className="flex justify-center items-center">
        <CountdownTimer />
      </div>

      {[...Array(15)].map((_, i) => {
        return (
          <div className="border  p-5 m-4 rounded-lg">
            <p className="text-stone-600">{++i}</p>
            {temp}
          </div>
        )
      })}




    </div>
  );
}
