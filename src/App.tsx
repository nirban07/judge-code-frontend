import './App.css';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Details from './pages/details';
import Logs from './pages/logs';

function App() {


  return (
    <div className='w-full'>
      <BrowserRouter>
        <nav className=' flex justify-center mt-10'>
          <Tabs defaultValue="account" className="w-[400px] justify-center flex">
            <TabsList>
              <Link to={"/details"}><TabsTrigger value="account"> Details</TabsTrigger></Link>
              <Link to={"/logs"}><TabsTrigger value="password"> Logs</TabsTrigger></Link>
            </TabsList>
            {/* <TabsContent value="account">Make changes to your account here.</TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent> */}
          </Tabs>
        </nav>

        <Routes>
          <Route path='details' element={<Details />} />
          <Route path='logs' element={<Logs />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
