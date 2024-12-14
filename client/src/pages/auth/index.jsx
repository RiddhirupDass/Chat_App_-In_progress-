import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {useState} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Background from "@/assets/login2.png";
import { useToast } from "@/components/ui/use-toast"
import apiClient from "@/lib/api-client";
import {SIGNUP_ROUTE} from "@/utils/constants";
import {LOGIN_ROUTE} from "@/utils/constants";
import {useNavigate} from "react-router-dom";
import {useAppStore} from "@/store/index";



function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const { toast } = useToast();
    const navigate = useNavigate();
    const {setUserInfo} = useAppStore();

    function validateSignup() {
        if(!email.length){
            toast({
                title: "Email is Required!",
              })
            return false;
        }
        else if(!password.length){
            toast({
                title: "Password is Required!",
              })
            return false;
        }
        else if(confirmpassword !== password){
            toast({
                title: "Password and Confirm Password must be same...",
              })
            return false;
        }
        return true;
    };

    function validateLogin() {
        if(!email.length){
            toast({
                title: "Email is Required!",
              })
            return false;
        }
        else if(!password.length){
            toast({
                title: "Password is Required!",
              })
            return false;
        }
        return true;
    };

    async function handleLogin() {
        if(validateLogin()){
            const response = await apiClient.post(LOGIN_ROUTE, {email, password},{withCredentials: true});
            if(response.data.user.id){
                setUserInfo(response.data.user);
                if(response.data.user.profileSetup){
                    navigate("/chat");
                }else{
                    navigate("/profile");
                }
            }
            console.log({response});
        }
    }

    async function handleSignup() {
        if(validateSignup()){
            const response = await apiClient.post(SIGNUP_ROUTE, {email, password},{withCredentials: true});
            if(response.status === 201){
                setUserInfo(response.data.user);
                navigate("/profile");
            }
            console.log({response});
        }
    }

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
        <div className="h-[80vh] w-[80vw] grid bg-white border-2 border-white rounded-3xl shadow-xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] xl:grid-cols-2">
            <div className="flex flex-col gap-10 items-center justify-center">
                <div className="flex items-center justify-center">
                    <h1 className="font-bold text-5xl md:text-6xl">Welcome</h1>
                </div>
                <div className="flex items-center justify-center w-full p-5">
                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList className="bg-transparent w-full">
                        <TabsTrigger className="w-full border-b-2 data-[state=active]:border-indigo-800" value="login">Login</TabsTrigger>
                        <TabsTrigger className="w-full border-b-2 data-[state=active]:border-indigo-800" value="signup">Signup</TabsTrigger>
                    </TabsList>
                    <TabsContent className="w-full flex flex-col gap-5 mt-10" value="login">
                        <Input placeholder="Email" type="email" value={email} onChange={(event)=>{setEmail(event.target.value)}}/>
                        <Input placeholder="Password" type="password" value={password} onChange={(event)=>{setPassword(event.target.value)}}/>
                        <Button className="rounded-full" onClick={handleLogin}>Login</Button>
                    </TabsContent>
                    <TabsContent className="w-full flex flex-col gap-5" value="signup">
                        <Input placeholder="Email" type="email" value={email} onChange={(event)=>{setEmail(event.target.value)}}/>
                        <Input placeholder="Password" type="password" value={password} onChange={(event)=>{setPassword(event.target.value)}}/>
                        <Input placeholder="Confirm Password" type="password" value={confirmpassword} onChange={(event)=>{setConfirmpassword(event.target.value)}}/>
                        <Button className="rounded-full" onClick={handleSignup}>Signup</Button>
                    </TabsContent>
                </Tabs>
                </div>
            </div>
            <div className="hidden xl:flex justify-center items-center">
                <img src={Background} alt="background image"  />
            </div>
        </div>
    </div>
  )
}

export default Auth
