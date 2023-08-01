"use client";
import React, { useEffect } from "react";
import { PrimaryButton, SecondaryButton } from "carbon-components-react";
import { PlayFilledAlt, ArrowRight } from "@carbon/icons-react";
import { EnterCode } from "../Header";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  clearShouldTryIt,
  startNewSesson,
  triggerEnterCode,
} from "@/redux/notiSlice";
import useAuth from "../use-auth";
import { FORM_LINK } from "@/type/const";
import { clearForm } from "@/redux/formSlice";

const DashboardStep = (props: { text: string[] }) => {
  const { text } = props;
  return (
    <div className="btn-dashboard-step">
      <SecondaryButton
        className="btn-dashboard-step-btn body-02 h-full btn-secondary"
        style={{
          padding: "1rem",
          width: "100%",
          height: "100%",
          cursor: "default",
        }}
      >
        <span className="self-start mr-2 mt-1 w-5 h-5">
          <PlayFilledAlt className="fill-pinky" />
        </span>
        <span className="self-start w-full">
          {text.map((val, index) => {
            return (
              <React.Fragment key={index}>
                {val}
                {index < text.length - 1 && <br />}
              </React.Fragment>
            );
          })}
        </span>
      </SecondaryButton>
    </div>
  );
};

const DashboardComponent = () => {
  const { shouldTryIt, shouldTrySession } = useSelector(
    (state: RootState) => state.notification
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useAuth();
  useEffect(() => {
    if (shouldTryIt && shouldTrySession) {
      dispatch(clearShouldTryIt());
      dispatch(clearForm());
      auth.clearAuth();
      auth.setAuth({
        access_token: shouldTrySession.access_token,
        expires_in: shouldTrySession.expires_in,
        refresh_token: shouldTrySession.refresh_token,
        token_type: shouldTrySession.token_type,
        is_new: true,
      });
      router.push(FORM_LINK);
    }
  }, [shouldTryIt, shouldTrySession]);
  return (
    <div className="w-full pt-7">
      <div
        className="relative backgrounddd"
        style={{ minHeight: 496, maxHeight: 496 }}
      >
        <div className="absolute bottom-0 left-0 w-full h-full flex items-center justify-center">
          <div className="border border-solid border-strong gray-line gray-line-left self-end"></div>
          <div className="cds--grid text-white d-container">
            <div className="cds--row h-full">
              {/* Left Part */}
              <div className="cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-4 cds--col-sm-2 d-left-child">
                {/* Left Child */}
                <div className="h-full flex flex-col justify-between">
                  <div className="flex items-center h-full">
                    <p className="text-white header-text header-text-1">
                      Take control of your finances
                    </p>
                  </div>
                  <div>
                    <div className="dashboard-step-group">
                      <DashboardStep text={["Budget Assessment"]} />
                      <DashboardStep text={["Actionable insights"]} />
                      <DashboardStep text={["Financial Forecasting"]} />
                    </div>
                    <PrimaryButton
                      className="btn-primary"
                      renderIcon={ArrowRight}
                      style={{
                        width: "100%",
                        maxWidth: "unset",
                        height: "fit-content",
                        padding: "16px 16px 32px 16px",
                      }}
                      onClick={() => {
                        dispatch(startNewSesson());
                      }}
                    >
                      Try it now
                    </PrimaryButton>
                  </div>
                </div>
                <div className="border border-solid border-strong d-left-gray-line"></div>
                {/* Left Child */}
              </div>
              {/* Left Part */}

              <div
                className="cds--col-max-2 border border-solid border-strong w-full self-end cds--col-xlg-2 cds--col-lg-2 cds--col-md-0 cds--col-sm-0"
                style={{ marginBottom: "-1px" }}
              ></div>

              {/* Right Part */}
              <div className="cds--col-max-6 cds--col-xlg-6 cds--col-lg-6 cds--col-md-4 cds--col-sm-2">
                <div className="flex flex-col justify-between h-full">
                  <div className="flex items-center justify-center h-full">
                    <img
                      className="w-full max-w-full"
                      src="/images/illus_hero.svg"
                    />
                  </div>
                  <div
                    className="border-solid border-interactive w-full self-end"
                    style={{
                      borderWidth: "3px",
                      marginBottom: "-1.5px",
                    }}
                  ></div>
                </div>
              </div>
              {/* Right Part */}
            </div>
          </div>
          <div className="border border-solid border-strong gray-line self-end"></div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        {/* Tail Left */}
        <div className="gray-line gray-line-left"></div>
        {/* Tail Left */}

        <div className="cds--grid text-white d-container py-6">
          <div className="cds--row">
            {/* Left Part */}
            <div className="cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-4 cds--col-sm-2">
              <div className="flex items-center self-start">
                <EnterCode
                  onClick={() => {
                    dispatch(triggerEnterCode(true));
                  }}
                />
              </div>
            </div>
            {/* Left Part */}

            {/* Middle Part */}
            <div className="cds--col-max-2 w-full self-end cds--col-xlg-2 cds--col-lg-2 cds--col-md-0 cds--col-sm-0"></div>
            {/* Middle Part */}

            {/* Right Part */}
            <div className="cds--col-max-6 cds--col-xlg-6 cds--col-lg-6 cds--col-md-4 cds--col-sm-2">
              <div className="w-full pr-8">
                <p className="text-white heading-03-body-02">{`This report is tailored to give you a clear understanding of your current financial situation. It's designed to empower you with the insights you need to make informed decisions and plan for your financial future confidently. By analyzing your finances, it will help you set achievable financial targets, such as clearing your debts and establishing savings milestones, guiding you towards financial freedom and a more prosperous future.`}</p>
              </div>
            </div>
            {/* Right Part */}
          </div>
        </div>

        {/* Tail Right */}
        <div className="gray-line"></div>
        {/* Tail Right */}
      </div>
    </div>
  );
};

export default DashboardComponent;
