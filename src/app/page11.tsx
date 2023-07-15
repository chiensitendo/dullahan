import AboutComponent from '@/components/home/about'
import DashboardComponent from '@/components/home/dashboard'
import HomeFooter from '@/components/home/home-footer'
import { store } from '@/redux/store'
import Image from 'next/image'
import { Provider } from 'react-redux'

export default function Home() {
  return (
    <Provider store={store}>
      <main>
      <div className="flex background pb-20">
        <DashboardComponent/>
      </div>
      <div className="py-20">
        <AboutComponent/>
      </div>
      <HomeFooter/>
    </main>
    </Provider>
    
  )
}
