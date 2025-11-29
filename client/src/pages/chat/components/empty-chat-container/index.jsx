import Lottie from "react-lottie"
import { animationDefaultOptions } from "@/lib/utils"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

const EmptyChatContainer = () => {
  return (
    <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
        <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOptions}
        />
        <div className="text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center">
            <h3 className="poppins-medium">
                Hey<span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">!</span>
                👋 Ready to
                <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"> Chat?</span>
            </h3>

        </div>
        <AboutModal />
    </div>
  )
}

const AboutModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-xs text-gray-400 hover:underline ml-5 mb-4 mt-2">
          About
        </button>
      </DialogTrigger>
      <DialogContent className="bg-[#1b1c24] text-sm text-white border border-[#2f303b] p-6">
        <h2 className="text-lg font-semibold mb-2">About This App</h2>
        <p>This chat application supports real-time messaging, file sharing, and channels.</p>
        <p className="mt-4 text-gray-400">
          Developed with ❤️ by <span className="font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Riddhirup Dass</span>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default EmptyChatContainer