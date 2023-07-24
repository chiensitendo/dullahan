import { NextPage } from "next";
import React, { useEffect } from "react";
import useAuth, { AUTH_STATUS } from "./use-auth";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerMeData, getLineChartData, getTimelineChartData } from "@/redux/customerSlice";
import { useRouter } from "next/router";
import { RootState } from "@/redux/store";


const withResult = (WrapperComponent: NextPage<any>) => {
    // eslint-disable-next-line react/display-name
    return (props: any) => {
        const {authData, authStatus, setAuth} = useAuth();
        const dispatch = useDispatch();
        const router = useRouter();
        const {isLoadLineChartSuccess} = useSelector((state: RootState) => state.customer);
        useEffect(() => {
            if (authData) {
                dispatch(getCustomerMeData({auth: authData}));
                dispatch(getLineChartData({auth: authData}));
                
            } else if (authStatus === AUTH_STATUS.FALSE) {
                router.push("/");
            }
            
        },[authData, dispatch, router, authStatus]);
        
        useEffect(() => {
            if (authData && isLoadLineChartSuccess) {
                dispatch(getTimelineChartData({auth: authData}));
            }
        },[isLoadLineChartSuccess, authData, dispatch]);
        return <WrapperComponent authData = {authData} loading = {props.loading} />;
    }
}


export default withResult;