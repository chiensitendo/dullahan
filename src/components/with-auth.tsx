import { startNewSeason } from "@/apis/apis";
import { NextPage } from "next";
import React, { useEffect } from "react";
import useAuth from "./use-auth";
import { useDispatch } from "react-redux";
import { getFormData } from "@/redux/formSlice";


const withAuth = (WrapperComponent: NextPage<any>) => {
    // eslint-disable-next-line react/display-name
    return (props: any) => {
        const {authData, setAuth} = useAuth();
        const dispatch = useDispatch();
        useEffect(() => {
            // startNewSeason().then(res => {
            //     setAuth(res.data);
            // });
            if (authData) {
                dispatch(getFormData({auth: authData}));
            }
            
        },[authData]);
        return <WrapperComponent authData = {authData} loading = {props.loading} />;
    }
}


export default withAuth;