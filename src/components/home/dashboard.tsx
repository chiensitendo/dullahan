'use client';
import React from "react";
import { PrimaryButton, SecondaryButton } from "carbon-components-react";
import { PlayFilledAlt, ArrowRight } from "@carbon/icons-react";
import { EnterCode } from "../Header";


const DashboardStep = (props: { text: string[] }) => {
    const { text } = props;
    return <div className="btn-dashboard-step">
        <SecondaryButton className="body-02 h-full btn-secondary" style={{
            padding: "1rem", width: "100%", height: "100%"
        }}>
            <span className="self-start mr-2 mt-1 w-5 h-5"><PlayFilledAlt className="fill-pinky" /></span>
            <span className="self-start w-full">{text.map((val, index) => {
                return <React.Fragment key={index}>
                    {val}{index < text.length - 1 && <br />}
                </React.Fragment>;
            })}</span>
        </SecondaryButton>
    </div>
}

const DashboardComponent = () => {

    return <div className="w-full pt-7">
        <div className="relative backgrounddd" style={{ minHeight: 496, maxHeight: 496 }}>
            <div className="absolute bottom-0 left-0 w-full h-full flex items-center justify-center">
                <div className="border border-solid border-strong gray-line gray-line-left self-end"></div>
                <div className="cds--grid text-white d-container">
                    <div className="cds--row h-full">
                        {/* Left Part */}
                        <div className="cds--col-max-8 cds--col-xlg-8 cds--col-lg-8 cds--col-md-4 cds--col-sm-2 d-left-child">

                            {/* Left Child */}
                            <div className="h-full flex flex-col justify-between">
                                <div className="flex items-center h-full">
                                    <p className="text-white header-text header-text-1">Take control of your finances</p>
                                </div>
                                <div>
                                    <div className="dashboard-step-group">
                                        <DashboardStep text={['Budget Assessment']} />
                                        <DashboardStep text={['Actionable insights']} />
                                        <DashboardStep text={['Financial Forecasting']} />
                                    </div>
                                    <PrimaryButton className="btn-primary" renderIcon={ArrowRight}
                                        style={{ width: "100%", maxWidth: "unset", height: "fit-content", padding: "16px 16px 32px 16px" }}>
                                        Try it now</PrimaryButton>
                                </div>
                            </div>
                            <div className="border border-solid border-strong d-left-gray-line"></div>
                            {/* Left Child */}
                        </div>
                        {/* Left Part */}

                        <div className="cds--col-max-2 border border-solid border-strong w-full self-end cds--col-xlg-2 cds--col-lg-2 cds--col-md-0 cds--col-sm-0"
                            style={{ marginBottom: "-1px" }}></div>

                        {/* Right Part */}
                        <div className="cds--col-max-6 cds--col-xlg-6 cds--col-lg-6 cds--col-md-4 cds--col-sm-2">
                            <div className="flex flex-col justify-between h-full">
                                <div className="flex items-center justify-center h-full">
                                    <img className="w-full max-w-full" src="/images/illus_hero.svg" />
                                </div>
                                <div className="border-solid border-interactive w-full self-end"
                                    style={{
                                        borderWidth: "3px",
                                        marginBottom: "-1.5px"
                                    }}></div>
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
                    <div className="flex items-center self-start"><EnterCode /></div>
                    </div>
                    {/* Left Part */}

                    {/* Middle Part */}
                    <div className="cds--col-max-2 w-full self-end cds--col-xlg-2 cds--col-lg-2 cds--col-md-0 cds--col-sm-0"></div>
                    {/* Middle Part */}
                    
                    {/* Right Part */}
                    <div className="cds--col-max-6 cds--col-xlg-6 cds--col-lg-6 cds--col-md-4 cds--col-sm-2">
                        <div className="w-full pr-8">
                            <p className="text-white heading-03-body-02">The report is designed to give the User a clear understanding of their financial situation
                                and empower them to make informed decisions about their future financial planning.</p>
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
}

export default DashboardComponent;