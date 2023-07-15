import { NextPage } from "next";
import { useRouter } from "next/router";

const InfoPage: NextPage = () => {
    const {query: {code: code}} = useRouter();
    return <div>
        {code && <p>Your code is: {code}</p>}
    </div>
}

export default InfoPage;