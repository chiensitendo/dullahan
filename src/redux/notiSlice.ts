import { AuthData } from "@/components/use-auth";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";



export interface Notification {
    message: string,
    title: string
}

export interface CodeModal {
    isOpen: boolean,
    userToken?: AuthData,
    isSuccess: boolean,
    code?: string,
}

export interface NotificationState {
  isLoading: boolean,
  notification?: Notification,
  codeModal: CodeModal,
  shouldReturnHome: boolean,
  shouldTryIt: boolean,
  shouldTrySession?: AuthData,
  isFromHome: boolean
}

const initialState: NotificationState = {
    isLoading: false,
    codeModal: {
        isOpen: false,
        isSuccess: false
    },
    shouldReturnHome: false,
    shouldTryIt: false,
    isFromHome: false
}

export const notiSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setNotification: (state, action: PayloadAction<Notification | undefined>) => {
        state.notification = action.payload;
    },
    triggerEnterCode: (state, action: PayloadAction<boolean>) => {
        state.codeModal.isOpen = action.payload;
        if (!state.codeModal.isOpen) {
            state.codeModal.code = "";
        } 
    },
    updateCode: (state, action: PayloadAction<string>) => {
        state.codeModal.code = action.payload;
    },
    submitCode: (state, action: PayloadAction<string>) => {

    },
    submitCodeSuccess: (state, action) => {
        state.codeModal.isSuccess = true;
        state.codeModal.userToken = action.payload.data;
        state.codeModal.code = "";
    },
    submitCodeFailure: (state) => {
        state.codeModal.isSuccess = false;
    },
    resetEnterCode: (state) => {
        state.codeModal = {
            isOpen: false,
            isSuccess: false,
            code: ""
        }
    },
    setShouldReturnHome: (state, action: PayloadAction<boolean>) => {
        state.shouldReturnHome = action.payload;
    },
    startNewSesson: (state) => {

    },
    startNewSessonSuccess: (state, action) => {
        state.shouldTrySession = action.payload.data;
        state.shouldTryIt = true;
    },
    startNewSessonFailure: (state) => {
        state.shouldTrySession = undefined;
        state.shouldTryIt = false;
    },
    clearShouldTryIt: (state) => {
        state.shouldTryIt = false;
        state.shouldTrySession = undefined;
        state.isFromHome = true;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoading, setNotification, triggerEnterCode, submitCode, submitCodeSuccess, 
    submitCodeFailure, resetEnterCode, setShouldReturnHome, updateCode, startNewSesson, 
    startNewSessonSuccess, 
    startNewSessonFailure, clearShouldTryIt } =
notiSlice.actions;

export default notiSlice.reducer;