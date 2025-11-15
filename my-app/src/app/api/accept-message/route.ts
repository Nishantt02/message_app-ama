import { getServerSession } from "next-auth"; // used to access user from session
import UserModel from "../../../models/User";
import { authOptions } from "../auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";



export async function POST(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "user not found" },
      { status: 401 }
    );
  }

  const userId = session.user._id || session.user.id;

  try {
    const { acceptingMessages } = await request.json();

    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessages: acceptingMessages },
      { new: true }
    );

    if (!updateUser) {
      return Response.json(
        { success: false, message: "user not updated" },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, message: "user updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("failed to update the user acceptingMessages");
    return Response.json(
      {
        success: false,
        message: "failed to update the user",
      },
      { status: 500 }
    );
  }
}


//it is the get request for the getting of the status.
// of enable and diable wheater it is enable or disable
export async function GET(request:Request){
     await dbConnect();
    const session=await getServerSession(authOptions); // here get the session and data in session
    
     const user=session?.user // get the user data from the session
     if(!session || !session.user){
        return Response.json({
            success:false,
            message:"user not found"
        },
        {status:404})
     }
     const userId=user._id || user.id; // get the userid from the user
    const founduser=await UserModel.findById(userId) //find the user from the userid
     try {
        // find the user by userid
       
        if(!founduser){
           return Response.json({
               success:false,
               message:"failed to update the  user"
           },{status:404})
        }
        return Response.json({
           success:true,
               isAcceptingMessages:founduser.isAcceptingMessages
        },{status:200})
   
     } catch (error) {
         console.log('failed to update the user ')
        return Response.json({
            success:false,
            message:'failed to update the user'
        },{
            status:500
        })
     }
     
}