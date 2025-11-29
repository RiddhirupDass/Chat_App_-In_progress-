/*import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import apiClient from "@/lib/api-client";
import { useAppStore } from "@/store";
import { useEffect } from "react";
import { GET_ALL_CONTACTS_ROUTES, CREATE_CHANNEL_ROUTE } from "@/utils/constants";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multipleselect";
  

const CreateChannel = () => {

    const {setSelectedChatType, setSelectedChatData, addChannel} = useAppStore();
    const [newChannelModal, setNewChannelModal] = useState(false);
    const [allContacts, setAllContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [channelName, setChannelName] = useState("");

    useEffect(() => {
      const getData = async () => {
      const response = await apiClient.get(GET_ALL_CONTACTS_ROUTES, {
        withCredentials: true,
        });
      setAllContacts(response.data.contacts);
      };
      getData();
    }, []);

    const createChannel = async () => {
        try {
            if (channelName.length > 0 && selectedContacts.length > 0) {
                const response = await apiClient.post(CREATE_CHANNEL_ROUTE, {
                    name: channelName,
                    members: selectedContacts.map((contact) => contact.value)
                }, { withCredentials: true });

                if (response.status === 201) {
                    addChannel(response.data.channel);
                    setNewChannelModal(false);
                    setChannelName("");
                    setSelectedContacts([]);
                }
            }
        } catch (error) {
            console.log({error});
        }
    };

  return (
    <>
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <FaPlus className="text-neutral-400 text-opacity-90 font-light text-sm hover:text-neutral-100 cursor-pointer transition-all duration-300" 
                onClick={() => setNewChannelModal(true)}
                />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] text-white border-none rounded-md mb-2 p-3">
                <div className="rounded-full absolute -top-1 -right-1"></div>
            <p>Create New Channel</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
      <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Please fill up details for new channel</DialogTitle>
          <DialogDescription>
            
          </DialogDescription>
        </DialogHeader>
        <div>
            <Input 
            placeholder="Channel Name"
            className="bg-[#2a2b33] text-white border-none focus:border-none focus:outline-none focus:ring-0 focus:ring-offset-0"
            onChange={(e) => setChannelName(e.target.value)}
            value={channelName}
            />
        </div>
        <div>
            <MultipleSelector
            className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white"
            defaultOptions={allContacts}
            placeholder="Search Contacts"
            value={selectedContacts}
            onChange={setSelectedContacts}
            emptyIndicator={
                <p className="text-gray-600 text-lg text-center leading-10">
                    No contacts found
                </p>
            }
            />
        </div>
        <div>
            <Button className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" onClick={ createChannel }>
                Create Channel
            </Button>
        </div>
      </DialogContent>
    </Dialog>

    </>
  )
}

export default CreateChannel;*/


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
import { Input } from "@/components/ui/input";
import apiClient from "@/lib/api-client";
import { useAppStore } from "@/store";
import { useEffect } from "react";
import { GET_ALL_CONTACTS_ROUTES, CREATE_CHANNEL_ROUTE } from "@/utils/constants";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multipleselect";
import { use } from "react";
  

const CreateChannel = () => {

    const {setSelectedChatType, setSelectedChatData, addChannel} = useAppStore();
    const [newChannelModal, setNewChannelModal] = useState(false);
    const [allContacts, setAllContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [channelName, setChannelName] = useState("");

    /*useEffect(() => {
      const getData = async () => {
      const response = await apiClient.get(GET_ALL_CONTACTS_ROUTES, {
        withCredentials: true,
        });
      setAllContacts(response.data.contacts);
      };
      getData();
    }, []);*/

    useEffect(() => {
        setAllContacts([]);
    }, []);

 const searchContacts = async (searchTerm) => {
  try {
    const response = await apiClient.get(GET_ALL_CONTACTS_ROUTES, {
      params: { searchTerm },
      withCredentials: true
    });

    if (response.status === 200 && response.data.contacts) {
      const formattedOptions = response.data.contacts.map(contact => ({
        label: contact.name,
        value: contact.id
      }));

      setAllContacts((prevSearch) => {
        const lastSearch = response.data.contacts;
        const merged = [...prevSearch, ...lastSearch].filter(
            (contact, index, array) => index === array.findIndex((c)=>c.id === contact.id)
        );
        return merged;
      }); // optional
      return formattedOptions; //  important
    } else {
      setAllContacts([]);
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
 };


    const createChannel = async () => {
        try {
            if (channelName.length > 0 && selectedContacts.length > 0) {
                const response = await apiClient.post(CREATE_CHANNEL_ROUTE, {
                    name: channelName,
                    members: selectedContacts.map((contact) => contact.value)
                }, { withCredentials: true });

                if (response.status === 201) {
                    addChannel(response.data.channel);
                    setNewChannelModal(false);
                    setChannelName("");
                    setSelectedContacts([]);
                }
            }
        } catch (error) {
            console.log({error});
        }
    };

  return (
    <>
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <FaPlus className="text-neutral-400 text-opacity-90 font-light text-sm hover:text-neutral-100 cursor-pointer transition-all duration-300" 
                onClick={() => setNewChannelModal(true)}
                />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] text-white border-none rounded-md mb-2 p-3">
                <div className="rounded-full absolute -top-1 -right-1"></div>
            <p>Create New Channel</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
      <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Please fill up details for new channel</DialogTitle>
          <DialogDescription>
            
          </DialogDescription>
        </DialogHeader>
        <div>
            <Input 
            placeholder="Channel Name"
            className="bg-[#2a2b33] text-white border-none focus:border-none focus:outline-none focus:ring-0 focus:ring-offset-0"
            onChange={(e) => setChannelName(e.target.value)}
            value={channelName}
            />
        </div>
        <div>
            <MultipleSelector
            className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white"
            defaultOptions={allContacts}
            placeholder="Search Contacts"
            value={selectedContacts}
            onSearch={searchContacts}
            onChange={setSelectedContacts}
            emptyIndicator={
                <p className="text-gray-600 text-lg text-center leading-10">
                    No contacts found
                </p>
            }
            />
        </div>
        <div>
            <Button className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" onClick={ createChannel }>
                Create Channel
            </Button>
        </div>
      </DialogContent>
    </Dialog>

    </>
  )
}

export default CreateChannel;