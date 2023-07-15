import { PayloadAction, createSlice } from "@reduxjs/toolkit"




export interface TabState {
  activeTab: string,
  isAdvanceAction: boolean
}

export enum SECTION_TABS {
  INCOME = "income-section",
  EXPENSE = "expense-section",
  CURRENT_BALANCE = "current-balance-section",
  DEBT = "debt-section" 
}

const initialState: TabState = {
  activeTab: SECTION_TABS.INCOME,
  isAdvanceAction: false
}

export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
        return {
            ...state,
            activeTab: action.payload
        }
    },
    setIsAdvanceAction: (state, action: PayloadAction<boolean>) => {
      state.isAdvanceAction = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setActiveTab, setIsAdvanceAction } =
tabSlice.actions;

export default tabSlice.reducer;