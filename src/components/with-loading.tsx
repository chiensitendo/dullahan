import { setNotification, setShouldReturnHome } from "@/redux/notiSlice";
import { RootState } from "@/redux/store";
import { Loading, ToastNotification } from "carbon-components-react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const LoadingContainer = () => {

    return <div className="fixed modal top-0 left-0  flex items-center justify-center">
        <Loading
        className="z-50"
      description="Active loading indicator" withOverlay={false}
    />
    </div>
}

const withLoading = (WrapperComponent: NextPage<any>) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const { isLoading, notification, shouldReturnHome } = useSelector((state: RootState) => state.notification);

    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
      if (notification) {
        setTimeout(() => {
          dispatch(setNotification(undefined));
        }, 3001);
      }
    },[notification, dispatch]);

    useEffect(() => {
      if (shouldReturnHome) {
        router.push("/");
      }
      return () => {
        dispatch(setShouldReturnHome(false));
      };
    },[shouldReturnHome, dispatch, router]);
    return (
      <React.Fragment>
        {isLoading && <LoadingContainer/>}
        {notification && <ToastNotification
        subtitle={notification.message}
        timeout={3000}
        onClose={e => {
          dispatch(setNotification(undefined));
          return true;
        }}
        style={{
          zIndex: 9001,
          position: 'fixed',
          left: 10,
          top: 10
        }}
        title={notification.title}
      />}
        <WrapperComponent loading = {isLoading} />
      </React.Fragment>
    );
  };
};

export default withLoading;
