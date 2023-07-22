import { NextPage } from "next";
import React, { useEffect } from "react";
import useAuth, { AUTH_STATUS } from "./use-auth";
import { useDispatch } from "react-redux";
import { getCustomerMeData, getLineChartData, getTimelineChartData } from "@/redux/customerSlice";
import { useRouter } from "next/router";


const withResult = (WrapperComponent: NextPage<any>) => {
    // eslint-disable-next-line react/display-name
    return (props: any) => {
        const {authData, authStatus, setAuth} = useAuth();
        const dispatch = useDispatch();
        const router = useRouter();
        useEffect(() => {
            if (authData) {
                dispatch(getCustomerMeData({auth: authData}));
                dispatch(getLineChartData({auth: authData}));
                dispatch(getTimelineChartData({auth: authData}));
            } else if (authStatus === AUTH_STATUS.FALSE) {
                router.push("/");
            }
            
        },[authData, dispatch, router, authStatus]);
        return <WrapperComponent authData = {authData} loading = {props.loading} />;
    }
}


export default withResult;