import React from "react";

const HomeFooter = () => {

    return <div className="bg-footer pl-8">
        <div className="w-full flex pt-8 pb-16">
            <div className="w-1/2 pb-2 flex flex-col relative">
                <p className="heading-04">By empowering individuals with<br/> financial knowledge</p>
                <img className="absolute center-in-the-right" src="/images/illus_footer.svg"/>
                </div>
            <div className="w-1/2 flex items-center pb-2">
                <div className="ml-8 mr-4 relative" style={{ marginBottom: "-0.5px", width: "calc(25% - 32px)" }}>
                </div>
                <div className="w-full pr-8">
                    <p className="heading-04">We aim to unlock their potential and open doors to a brighter future.</p>
                </div>
            </div>
        </div>
        <div className="w-full pr-8">
            <div className="w-full border-top-2-black py-3">
            <p>© 2023 IT</p>
            </div>
        </div>
    </div>
}

export default HomeFooter;