import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  import {SEARCH_CONTACTS_ROUTE, HOST} from "@/utils/constants";
import { Input } from "@/components/ui/input";
import Lottie from "react-lottie"
import { animationDefaultOptions } from "@/lib/utils"
import apiClient from "@/lib/api-client";
import { ScrollArea } from "@/components/ui/scroll-area";
import {Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor, colors } from "@/lib/utils";
import { useAppStore } from "@/store";
  

const NewDM = () => {

    const {setSelectedChatType, setSelectedChatData} = useAppStore();
    const [OpenNewConntactModel, setOpenNewConntactModel] = useState(false);
    const [searchedContacts, setsearchedContacts] = useState([]);

    const searchContacts = async (searchTerm) => {
        try {
            const response = await apiClient.post(SEARCH_CONTACTS_ROUTE, 
                { searchTerm }, 
                { withCredentials: true }
            );
            if (response.status === 200 && response.data.contacts) {
                setsearchedContacts(response.data.contacts);
            }
            else {
                setsearchedContacts([]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const selectNewContact = (contact) => {
        setOpenNewConntactModel(false);
        setsearchedContacts([]);
        setSelectedChatType("contact");
        setSelectedChatData(contact);
    }

  return (
    <>
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <FaPlus className="text-neutral-400 text-opacity-90 font-light text-sm hover:text-neutral-100 cursor-pointer transition-all duration-300" 
                onClick={() => setOpenNewConntactModel(true)}
                />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] text-white border-none rounded-md mb-2 p-3">
                <div className="rounded-full absolute -top-1 -right-1"></div>
            <p>Select New Contact</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    <Dialog open={OpenNewConntactModel} onOpenChange={setOpenNewConntactModel}>
      <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Please select a contact</DialogTitle>
          <DialogDescription>
            
          </DialogDescription>
        </DialogHeader>
        <div>
            <Input 
            placeholder="Search for a contact"
            className="bg-[#2a2b33] text-white border-none focus:border-none focus:outline-none focus:ring-0 focus:ring-offset-0"
            onChange={(e) => searchContacts(e.target.value)}
            />
        </div>

        {
            searchedContacts.length > 0 && (
                <ScrollArea className="h-[250px]">
            <div className="flex flex-col gap-5">
                {
                    searchedContacts.map((contact) => (
                        <div key={contact._id} className="flex items-center gap-3 cursor-pointer" onClick={()=>selectNewContact(contact)}>
                            <div className="w-12 h-12 relative">
                                             <Avatar className="h-12 w-12 rounded-full overflow-hidden">  
                                                 {contact.image ? (
                                                 <AvatarImage
                                                 src={`${HOST}/${contact.image}`} alt="Profile image" className="object-cover w-full h-full bg-black rounded-full" />
                                                 ) : (
                                                 <div className={`uppercase h-12 w-12 text-lg flex items-center justify-center rounded-full ${getColor(contact.color)}`}>
                                                     {contact.firstName ? (
                                                     contact.firstName.split("").shift()
                                                     ) : (
                                                      contact.email.split("").shift()
                                                     )}
                                                 </div>
                                                 )}
                                             </Avatar>
                            </div>
                            <div className="flex flex-col">
                            <span>
                            {
                                
                                contact.firstName && contact.lastName ? (
                                    <h3 className="text-white text-lg font-semibold">
                                        {contact.firstName} {contact.lastName}
                                    </h3>
                                ) : contact.email
                                
                            }
                            </span>
                            <span className="text-xs">
                            {contact.email} 
                            </span>
                            </div>
                        </div>
                    ))
                }
            </div>
                </ScrollArea>
            )
        }

        {
            searchedContacts.length <= 0 && (
                <div className="flex-1 md:flex md:mt-0 flex-col justify-center items-center hidden duration-1000 transition-all">
                    <Lottie
                    isClickToPauseDisabled={true}
                    height={100}
                    width={100}
                    options={animationDefaultOptions}
                    />
                    <div className="text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center">
                        <h3 className="poppins-medium">
                            Search 
                            <span className="text-purple-500"> New </span>
                            Contact 👤
                        </h3>

                    </div>
                </div>            
            )
        }
      </DialogContent>
    </Dialog>

    </>
  )
}

export default NewDM;