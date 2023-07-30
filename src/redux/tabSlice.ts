import { PayloadAction, createSlice } from "@reduxjs/toolkit"




export interface TabState {
  activeTab: string
}

export enum SECTION_TABS {
  INCOME = "income-section",
  EXPENSE = "expense-section",
  CURRENT_BALANCE = "current-balance-section",
  DEBT = "debt-section" 
}

const initialState: TabState = {
  activeTab: SECTION_TABS.CURRENT_BALANCE
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
  },
});

// Action creators are generated for each case reducer function
export const { setActiveTab } =
tabSlice.actions;

export default tabSlice.reducer;