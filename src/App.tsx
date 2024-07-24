import { useState } from 'react'
import React from 'react';

import './App.css'

import LandingPage from './pages/landingPage/landingPage'
import CustomizePage from './pages/customizePage/customizePage'
import CreditPage from './pages/creditPage/creditPage'

import UserNavbar from './component/navbar'
import UserFooter from './component/footer'

import initialDataSetter from './initialDataLoad';

export default function App() {
  const [page,setPage] = useState('landing')
  const [loadTrue, setLoadTrue] = useState(false)

  const handlePage = (props:string) => {
    setPage(props)
    sessionStorage.setItem('currentPage', props);
  }

  React.useEffect(() => {
    initialDataSetter()
    setPage(sessionStorage.getItem('currentPage') as string)

    const checkSessionStorage = () => {
      if (
        sessionStorage.getItem('allStudent') &&
        sessionStorage.getItem('oneStudentInfo') &&
        sessionStorage.getItem('oneStudentSchoolmate')
      ) {
        setLoadTrue(true);
      } else {
        setTimeout(checkSessionStorage, 2000); // Check every 2 seconds
      }
    };

    checkSessionStorage();
}, []);



  return (<>

    <UserNavbar handlePage={handlePage} activePage={page}/>

    {(() => {
        if (loadTrue) {
          switch (page) {
            case 'landing':
              return <LandingPage handlePage={handlePage} />
            case 'customize':
              return <CustomizePage />
            case 'credit':
              return <CreditPage />
          }
        } else {
          return (
            <div className="mt-20 h-screen">
              <p className="text-center text-4xl">Loading the data, please wait...</p>
            </div>
          );
        }
      })()}
    
    {/* {
    
    (() => {
      if (loadTrue){
        console.log('jhancok')
        switch (page){
          case 'landing' : return <LandingPage handlePage={handlePage}/>;
          case 'customize': return <CustomizePage/>;
          case 'credit' : return <CreditPage/>;
        }
      }else{
        return(
          <div className="mt-20">
            <p className='text-center text-4xl'>Refresh this page.</p>
          </div>
        )
      }
    })

    } */}


    <UserFooter/>
    </>)
}