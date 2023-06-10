const AboutComponent = () => {

    return <div className="w-full flex">
        <div className="w-1/2">
            <p className="header-text pb-6">About <del >us</del><br /> <span className="text-focus">the project</span></p>
            <p>Many people have limited perspectives when it comes to financial targets. We bridge that gap by providing guidance and resources for financial success.
                Our projects aim to educate and inspire individuals to recognize the importance of personal finance management,
                instilling the principles of saving, investing, and sound financial decision-making.
                <br />
                <br />
                At IcedTee, we provide practical, actionable information ranging from budgeting tips to investment strategies. Our team aims to create valuable content, designed to demystify the complexities of finance and make it accessible to everyone.
            </p>
        </div>
        <div className="w-1/2 flex items-center">
            <div className="ml-8 mr-4" style={{ marginBottom: "-0.5px", width: "calc(25% - 32px)" }}></div>
            <div className="w-full pr-8">
                <p>At IceTee, we are a small team of passionate individuals who believe in the power of technology to enhance lives, especially in personal finance.
                    <br />
                    <br />
                    Our mission is simple: <span className="font-bold text-focus">help people improve their financial understanding and take control of their future.</span></p>
                <div className="pt-8">
                    <div style={{ width: "100%", height: 0, paddingBottom: "63%", position: "relative" }}>
                        <iframe src="https://giphy.com/embed/3og0IExSrnfW2kUaaI" width="100%" height="100%"
                            style={{ position: "absolute" }} frameBorder="0" className="giphy-embed" allowFullScreen></iframe></div>
                </div>
            </div>
        </div>
    </div>
}

export default AboutComponent;