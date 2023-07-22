import { startNewSeason } from "@/apis/apis";
import { NextPage } from "next";
import React, { useEffect } from "react";
import useAuth from "./use-auth";
import { useDispatch } from "react-redux";
import { getFormData } from "@/redux/formSlice";


const withAuth = (WrapperComponent: NextPage<any>) => {
    // eslint-disable-next-line react/display-name
    return (props: any) => {
        const {authData, setAuth, setIsNew} = useAuth();
        const dispatch = useDispatch();
        useEffect(() => {
            if (authData && !authData.is_new) {
                dispatch(getFormData({auth: authData}));
            }
        },[authData, dispatch]);
        return <WrapperComponent authData = {authData} setIsNew = {setIsNew} loading = {props.loading} />;
    }
}


export default withAuth;