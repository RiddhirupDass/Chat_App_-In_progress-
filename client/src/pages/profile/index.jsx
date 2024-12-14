import {useAppStore} from "@/store/index";
import { useEffect, useState } from "react";
import {IoArrowBack} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getColor, colors } from "@/lib/utils";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast, useToast } from "@/components/ui/use-toast"
import apiClient from "@/lib/api-client";
import { UPDATE_PROFILE_ROUTE } from "@/utils/constants";





const Profile = () => {
  const navigate = useNavigate();
  const {userInfo, setUserInfo} = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  useEffect(()=>{
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setSelectedColor(userInfo.color);
  },[userInfo]);

  const validateProfile = () => {
    if(!firstName){
      toast({
        title: "First name is Required!",
      })
      return false;
    }
    else if (!lastName){
      toast({
        title: "Last name is Required!",
      })
      return false;
    }
    return true;
  }
  
  const handleBack= ()=>{
    if(userInfo.profileSetup){
      navigate("/chat");
    }
    else{
      toast({
        title: "Please setup profile to continue",
      });
    }
  }
  const saveChanges = async () => {
    if(validateProfile()){
      try {
        const response = await apiClient.post(UPDATE_PROFILE_ROUTE, {firstName, lastName, color: selectedColor}, {withCredentials: true});
        if(response.status === 200 && response.data){
          setUserInfo({...response.data});
          toast({
            title: "Profile updated successfully!",
          })
          navigate("/chat");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="bg-[#2B2E4A] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div onClick={handleBack}>
        <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer"/>
        </div>
        <div className="grid grid-cols-2">
          <div className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
          onMouseEnter={() => {setHovered(true)}}
          onMouseLeave={() => {setHovered(false)}}
          >
            <Avatar className="h-32 w-32 md:h-48 md:w-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                src={image} alt="Profile image" className="object-cover w-full h-full bg-black" />
              ) : (
                <div className={`uppercase h-32 w-32 md:h-48 md:w-48 text-5xl flex items-center justify-center rounded-full ${getColor(selectedColor)}`}>
                  {firstName ? (
                    firstName.split("").shift()
                  ) : (
                    userInfo.email.split("").shift()
                  )}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer">
                {image ? <FaTrash className="text-white text-3xl cursor-pointer"/> : <FaPlus className="text-white text-3xl cursor-pointer"/>}
              </div>
            )}
            {/*<input/>*/}
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col items-center justify-center gap-5 text-white">
            <div className="w-full">
              <Input placeholder="Email" type="email" disabled value={userInfo.email} className="rounded-lg p-6 bg-[#201E43]"/>
            </div>
            <div className="w-full">
              <Input placeholder="First Name" type="text" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} className="rounded-lg p-6 bg-[#201E43]"/>
            </div>
            <div className="w-full">
              <Input placeholder="Last Name" type="text" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} className="rounded-lg p-6 bg-[#201E43]"/>
            </div>
            <div className="flex gap-5 w-full">
              {colors.map((color, index) => {
                return(
                <div className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-75 ${(selectedColor === index)? "outline outline-white/50 outline-2": ""}`} key={index} onClick={()=>{setSelectedColor(index)}}>
                  
                </div>
              );
                })}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300 " onClick={saveChanges}>Save Changes</Button>
        </div>
      </div>
      
    </div>
  )
}

export default Profile