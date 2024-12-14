import {create} from "zustand";
import {createAuthSlice} from "@/store/slices/auth-slice"

export const useAppStore = create()((...a) => ({

            ...createAuthSlice(...a),
        
}));