import {Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import { HOST, LOGOUT_ROUTE } from "@/utils/constants";
import { FiEdit2 } from "react-icons/fi";
import { IoPowerSharp } from "react-icons/io5";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { getColor, colors } from "@/lib/utils";
import apiClient from "@/lib/api-client";

const ProfileInfo = () => {
    const { userInfo, setUserInfo } = useAppStore();
    const navigate = useNavigate();

    const logOut = async () => {
        try {
            const response = await apiClient.post(LOGOUT_ROUTE,{}, {withCredentials: true});
            if (response.status === 200) {
                navigate("/auth");
                setUserInfo(null);
            }
        }catch (error) {
            console.error(error);
        }
    }


  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33] ">
        <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 relative">
                 <Avatar className="h-12 w-12 rounded-full overflow-hidden">  
                              {userInfo.image ? (
                                <AvatarImage
                                src={`${HOST}/${userInfo.image}`} alt="Profile image" className="object-cover w-full h-full bg-black" />
                              ) : (
                                <div className={`uppercase h-12 w-12 text-lg flex items-center justify-center rounded-full ${getColor(userInfo.color)}`}>
                                  {userInfo.firstName ? (
                                    userInfo.firstName.split("").shift()
                                  ) : (
                                    userInfo.email.split("").shift()
                                  )}
                                </div>
                              )}
                            </Avatar>
            </div>
            <div>
                {
                    userInfo.firstName && userInfo.lastName ? (
                        <h3 className="text-white text-lg font-semibold">
                            {userInfo.firstName} {userInfo.lastName}
                        </h3>
                    ) : (
                        <h3 className="text-white text-lg font-semibold">
                            {userInfo.email}
                        </h3>
                    )
                }
            </div>
        </div>
        <div className="flex gap-3">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger onClick={() => navigate("/profile")}>
                    <FiEdit2 className="text-purple-500 text-xl font-medium" />
                </TooltipTrigger>
                <TooltipContent className="bg-[#1c1b1e] text-white border-none rounded-md p-2">
                    <div className="rounded-full absolute -top-1 -right-1"></div>
                <p>Edit Profile</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger onClick={logOut}>
                    <IoPowerSharp className="text-purple-500 text-xl font-medium hover:text-red-500" />
                </TooltipTrigger>
                <TooltipContent className="bg-[#1c1b1e] text-white border-none rounded-md p-2">
                    <div className="rounded-full absolute -top-1 -right-1"></div>
                <p>Log Out</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        </div>
    </div>
  )
}

export default ProfileInfo