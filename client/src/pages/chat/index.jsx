import { useAppStore } from "@/store"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"


const Chat = () => {
  const {userInfo} = useAppStore();
  const navigate = useNavigate();
  const { toast } = useToast()

  useEffect(() => {
    if(!userInfo.profileSetup){
      toast({
        description: "Please setup profile to continue...",
      });
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  return (
    <div>Chat</div>
  )
}

export default Chat