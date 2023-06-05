'use client';

import { PrimaryButton } from "carbon-components-react";

const DashboardComponent = () => {

    return <div className="w-full pt-7">
        <div className="relative">
            <img className="py-1 w-full" src="/images/wave_grid.svg" alt="Wave Grid" />
            <div className="absolute bottom-0 left-0 w-full">
                <div className="pl-8 pb-1">
                    <PrimaryButton>Try it now</PrimaryButton>
                </div>
                <div></div>
            </div>
        </div>
    </div>
}

export default DashboardComponent;