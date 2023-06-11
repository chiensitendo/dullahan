'use client';
import React from "react";
import { PrimaryButton, SecondaryButton } from "carbon-components-react";
import { PlayFilledAlt, ArrowRight } from "@carbon/icons-react";
import { EnterCode } from "../Header";


const DashboardStep = (props: { text: string[] }) => {
    const { text } = props;
    return <div className="mb-4 w-1/3 pr-0.5">
        <SecondaryButton className="body-02 h-full btn-secondary" style={{
            padding: "1rem", width: "100%"
        }}>
            <div className="self-start mt-0.5"><PlayFilledAlt className="self-start mr-2 fill-pinky w-5 h-5" /></div>
            <div className="self-start w-full">{text.map((val, index) => {
                return <React.Fragment key={index}>
                    {val}{index < text.length - 1 && <br />}
                </React.Fragment>;
            })}</div></SecondaryButton>
    </div>
}

const DashboardComponent = () => {

    const DashboardLeftContainer = () => <div className="pl-8 pb-1 w-1/2 flex self-end flex-col h-full">
        <div className="h-full flex items-center">
            <p className="text-white header-text">Take control of your finances</p>
        </div>
        <div className="flex flex-row">
            <DashboardStep text={['Understanding your', 'Budget status']} />
            <DashboardStep text={['Actionable insights.']} />
            <DashboardStep text={['Future financial', 'planning']} />
        </div>
        <PrimaryButton className="btn-primary" renderIcon={ArrowRight}
            style={{ width: "100%", maxWidth: "unset", height: "fit-content", padding: "16px 16px 32px 16px" }}>Try it now</PrimaryButton>
    </div>;

    const DashboardRightContainer = () =>
        <div className="w-1/2 flex items-center h-full pb-1">
            <div className="ml-8 border border-solid border-strong w-1/4 mr-4 self-end" style={{marginBottom: "-0.5px"}}></div>
            <div className="flex h-full flex-col w-full">
                <div className="h-full flex items-center justify-center">
                    <img src="/images/illus_hero.svg" />
                </div>
                <div className="border-solid border-interactive w-full self-end" style={{ borderWidth: "3px", marginBottom: "-3px" }}></div>
            </div>
            <div className="ml-4 border border-solid border-strong w-8 self-end" style={{marginBottom: "-0.5px"}}></div>
        </div>;

    return <div className="w-full pt-7">
        <div className="relative">
            <img className="py-1 w-full" src="/images/wave_grid.svg" alt="Wave Grid" />
            <div className="absolute bottom-0 left-0 w-full h-full flex items-center">
                <DashboardLeftContainer />
                <DashboardRightContainer />
            </div>
        </div>
        <div className="flex items-center w-full pl-8 pt-6">
            <div className="flex items-center w-1/2 self-start"><EnterCode /></div>
            <div className="w-1/2 flex items-center">
                <div className="ml-8 mr-4" style={{ marginBottom: "-0.5px", width: "calc(25% - 32px)" }}></div>
                <div className="text-white w-full pr-8">
                    <p>The report is designed to give the User a clear understanding of their financial situation
                        and empower them to make informed decisions about their future financial planning.</p>
                </div>
            </div>
        </div>
    </div>
}

export default DashboardComponent;