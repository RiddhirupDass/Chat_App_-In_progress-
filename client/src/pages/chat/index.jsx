import { useAppStore } from "@/store"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"
import ContactsContainer from "./components/contacts-container";
import EmptyChatContainer from "./components/empty-chat-container";
import ChatContainer from "./components/chat-container";

const Chat = () => {
  const {
    userInfo, 
    selectedChatType, 
    isUploading,
    isDownloading,
    fileUploadProgress,
    fileDownloadProgress,
  } = useAppStore();
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
    <div className="flex h-[100vh] text-white overflow-hidden">
      {
        isUploading && (
          <div className="fixed top-0 left-0 z-10 w-[100vw] h-[100vh] bg-black/80 bg-opacity-50 flex items-center justify-center flex-col gap-5 backdrop-blur-lg ">
            <h5 className="text-5xl animate-pulse">Uploading... {fileUploadProgress}%</h5>
          </div>
        )
      }
      {
        isDownloading && (
          <div className="fixed top-0 left-0 z-10 w-[100vw] h-[100vh] bg-black/80 bg-opacity-50 flex items-center justify-center flex-col gap-5 backdrop-blur-lg ">
            <h5 className="text-5xl animate-pulse">Downloading... {fileDownloadProgress}%</h5>
          </div>
        )
      }
      <ContactsContainer />
      {
        selectedChatType === undefined ? ( <EmptyChatContainer /> ) : ( <ChatContainer /> )
      }
    </div>
  )
}

export default Chat