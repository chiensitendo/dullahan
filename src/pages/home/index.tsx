import { PrimaryButton } from "carbon-components-react";
import { NextPage } from "next";
const Home2Page: NextPage = () => {
    console.log(process.env['HOST']);
    return <div className="background h-10">
        <PrimaryButton>
  Button
</PrimaryButton>
    </div>
}

export default Home2Page;