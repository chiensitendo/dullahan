import React from "react";

const HomeFooter = () => {

    return <div className="bg-footer">
        <div className="flex items-center justify-center">
            {/* Tail Left */}
            <div className="gray-line gray-line-left"></div>
            {/* Tail Left */}

            <div className="cds--grid text-white d-container pt-8">
                <div className="cds--row pb-16">
                    {/* Left Part */}
                    <div className="cds--col-max-6 cds--col-xlg-6 cds--col-lg-6 cds--col-md-3 cds--col-sm-2">
                    <p className="heading-04">By empowering individuals with<br/> financial knowledge</p>
                    </div>
                    {/* Left Part */}

                    {/* Middle Part */}
                    <div className="cds--col-max-4 place-self-start w-full self-end cds--col-xlg-4 
                    cds--col-lg-4 cds--col-md-2 cds--col-sm-0" style={{placeSelf: "start"}}>
                    <img className="" src="/images/illus_footer.svg"/>
                    </div>
                    {/* Middle Part */}

                    {/* Right Part */}
                    <div className="cds--col-max-6 cds--col-xlg-6 cds--col-lg-6 cds--col-md-3 cds--col-sm-2">
                        <div className="w-full pr-8">
                        <p className="heading-04">We aim to unlock their potential and open doors to a brighter future.</p>
                        </div>
                    </div>
                    {/* Right Part */}

                </div>
                <div className="cds--row">
                <div className="w-full border-top-2-black py-3">
                <p className="body-02">© 2023 IT</p>
            </div>
                </div>
            </div>

            {/* Tail Right */}
            <div className="gray-line"></div>
            {/* Tail Right */}
        </div>
    </div>
    // return <div className="bg-footer pl-8">
    //     <div className="w-full flex pt-8 pb-16">
    //         <div className="w-1/2 pb-2 flex flex-col relative">
    //             <p className="heading-04">By empowering individuals with<br/> financial knowledge</p>
    //             <img className="absolute center-in-the-right" src="/images/illus_footer.svg"/>
    //             </div>
    //         <div className="w-1/2 flex items-center pb-2">
    //             <div className="ml-8 mr-4 relative" style={{ marginBottom: "-0.5px", width: "calc(25% - 32px)" }}>
    //             </div>
    //             <div className="w-full pr-8">
    //                 <p className="heading-04">We aim to unlock their potential and open doors to a brighter future.</p>
    //             </div>
    //         </div>
    //     </div>
    //     <div className="w-full pr-8">
    //         <div className="w-full border-top-2-black py-3">
    //         <p>© 2023 IT</p>
    //         </div>
    //     </div>
    // </div>
}

export default HomeFooter;