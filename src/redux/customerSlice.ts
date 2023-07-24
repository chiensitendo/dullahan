import { AuthData } from "@/components/use-auth";
import { LineChartDataResponse, TimelineChartDataResponse, UserSeason } from "@/type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CustomerState {
  isSuccess: boolean | undefined;
  item?: UserSeason;
  lineChart?: LineChartDataResponse;
  timelineChart?: TimelineChartDataResponse;
  isLoadLineChartSuccess: boolean
}

const initialState: CustomerState = {
  isSuccess: undefined,
  isLoadLineChartSuccess: false
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    getCustomerMeData: (state, action: PayloadAction<{ auth: AuthData }>) => {},
    getCustomerMeDataSuccess: (state, action) => {
      const { data } = action.payload as { data: UserSeason };
      state.item = data;
      state.isSuccess = true;
    },
    getCustomerMeDataFailure: (state) => {
      state.isSuccess = false;
    },
    getLineChartData: (state, action: PayloadAction<{ auth: AuthData }>) => {
      state.isLoadLineChartSuccess = false;
    },
    getLineChartDataSuccess: (state, action) => {
      const { data } = action.payload as { data: LineChartDataResponse };
      state.lineChart = data;
      state.isLoadLineChartSuccess = true;
    },
    getLineChartDataFailure: (state) => {
      state.isLoadLineChartSuccess = false;
    },
    getTimelineChartData: (state, action: PayloadAction<{ auth: AuthData }>) => {},
    getTimelineChartDataSuccess: (state, action) => {
      const { data } = action.payload as { data: TimelineChartDataResponse };
      state.timelineChart = data;
    },
    getTimelineChartDataFailure: (state) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  getCustomerMeData,
  getCustomerMeDataSuccess,
  getCustomerMeDataFailure,
  getLineChartData,
  getLineChartDataFailure,
  getLineChartDataSuccess,
  getTimelineChartData,
  getTimelineChartDataSuccess,
  getTimelineChartDataFailure
} = customerSlice.actions;

export default customerSlice.reducer;
