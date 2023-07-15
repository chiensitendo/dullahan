import AboutComponent from "@/components/home/about";
import DashboardComponent from "@/components/home/dashboard";
import HomeFooter from "@/components/home/home-footer";
import { NextPage } from "next";

const IndexPage: NextPage = () => {

    return <main>
        <div className="flex background pb-20">
        <DashboardComponent/>
      </div>
      <div className="py-20">
        <AboutComponent/>
      </div>
      <HomeFooter/>
    </main>
}

export default IndexPage;