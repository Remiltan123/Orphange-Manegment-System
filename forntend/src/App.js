
import './App.css';
import { Navbar } from './Components/Navbars/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { DonerLogin } from './Pages/DonerLogin';
import { OrpanageLogin } from './Pages/OrpanageLogin.jsx';
import { OrphanageShow } from './Pages/OrphanageShow.jsx';
import { OrphanageNavbar } from './Components/Navbars/OrpanageNavbar/OrphanageNavbar.jsx';
import { GiveReDonor } from './Components/AboutOrphange/GiveReDonor/GiveReDonor.jsx';
import { ViewReStatus } from './Components/AboutOrphange/ViewReStatus/ViewReStatus.jsx';
import { GiveFeedback } from './Components/AboutOrphange/GiveFeedback/GiveFeedback.jsx';
import { DonorShoe } from './Pages/DonorShoe.jsx';
import { DonorNavbar } from './Components/Navbars/DonarNavbar/DonorNavbar.jsx';
import { DoViewDetails } from './Components/AboutDonor/ViewDetails/DoViewDetails.jsx';
import { DoViewHistory } from './Components/AboutDonor/ViewHistory/DoViewHistory.jsx';
import { DoViewFeedback } from './Components/AboutDonor/ViewFeedback/DoViewFeedback.jsx';
import { OrphanageSelect } from './Pages/OrphanageSelect.jsx';
import { DonationForm } from './Components/AboutDonor/DonationForm/DonationForm.jsx';
import { AdobtRegister } from './Pages/AdobtRegister.jsx';
import { AdobtLogin } from './Pages/AdobtLogin.jsx';
import { Addchild } from './Components/AboutOrphange/AddnewChild/Addchild.jsx';
import { Addmorechild } from './Components/AboutOrphange/Addmorechild/Addmorechild.jsx';
import { ViewChild } from './Components/AboutOrphange/ViewChild/ViewChild.jsx';
import AdoptViewChild from './Components/AboutAdopt/AdoptViewChild/AdoptViewChild.jsx';

import { AcceptAdoption } from './Components/AboutOrphange/AcceptAdoption/AcceptAdoption.jsx';
import { AdoptNavbar } from './Components/Navbars/AdobtNavbar/AdobtNavbar.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SeeRequested } from './Components/AboutOrphange/SeeRequested/SeeRequested.jsx';
import { Forgotpassword } from './Components/AboutDonor/forgotpassword/forgotpassword.jsx';
import { ResetPassword } from './Components/AboutDonor/ResetPassword/ResetPassword.jsx';
import { ArrgentAdminpanal } from './Components/AboutOrphange/ArrgentAdminpanal/ArrgentAdminpanal.jsx';

import { WantsDonetion } from './Components/WantsDonetion/WantsDonetion.js';
import { OrphanageDetials } from './Pages/OrphanageDetials.jsx';
import { AdoptionShow } from './Pages/AdoptionShow.jsx';
import { ORdetails } from './Components/AboutAdopt/MoreaboutOnechild/ORdetails.jsx';










function App() {
  return (
    <>
    <BrowserRouter>
      <ToastContainer />
      <Routes>
  
        <Route path='/' element={<><Navbar/> <HomePage/></>} ></Route>
        <Route path="/ArrengtDonetion" element={<><Navbar/> <WantsDonetion/></>} />
        
        
        <Route path='/OrphanageSelect' element={<OrphanageSelect/>}></Route>
        <Route path='/OrphanageLogin/:id' element={<OrpanageLogin/>}></Route>
        <Route path='/Orphanage/:token' element={<OrphanageShow/>} />
          <Route path='/Orphanage/GiveReDonor/:token' element={<> <GiveReDonor/></>} />
          <Route path='/Orphanage/seerequested/:token' element={<> <SeeRequested /></>} />
          <Route path='/Orphanage/ViewReStatus/:token' element={<><ViewReStatus/></>} />
          <Route path='/Orphanage/ArrgentAdmin/:token' element={<ArrgentAdminpanal/>} />
          <Route path='/Orphanage/Add Child/:token' element={<><Addchild/></>} />
          <Route path='/Orphanage-Name/Add Child/moredetilas' element={<> <Addmorechild/></>} />
          <Route path='/Orphanage/UpdateChild/:token' element={<><ViewChild/></>} />
          <Route path='/Orphanage/AcceptAdoption/:token' element={<> <AcceptAdoption /></>} />

          

        <Route path='/DonerLogin' element={<DonerLogin/>}></Route>
          <Route path='/Donor/:token' element={<DonorShoe/>} />
          <Route path='/Donor/ViewDetails/:token' element={<><DonorNavbar/> <DoViewDetails/></>} />
          <Route path='/Donor/ViewHistory/:token' element={<><DonorNavbar/> <DoViewHistory/></>} />
          <Route path='/Donor/ViewFeedback/:token' element={<><DonorNavbar/> <DoViewFeedback/></>} />
          <Route path="/forgotpassword" element={<Forgotpassword/>} />
          <Route path="/resetpassword/:token" element={<ResetPassword/>} />
          <Route path='/Donor/ViewDetails/Donetion/:token' element={<><DonorNavbar/> <DonationForm/></>} />
          <Route path='/Donor/seeorphange/:token' element={<><DonorNavbar/><OrphanageDetials/></>} />


        <Route path='/Adopt' element={<AdobtLogin/>}></Route>
        <Route path='/Adobt/Regester' element={<AdobtRegister/>}></Route>
        <Route path='/Adopt/Show/:token' element={<><AdoptNavbar/> <AdoptionShow/></>}> </Route>
        <Route path='/Adobt/ViewChild/:token' element={<><AdoptNavbar/><AdoptViewChild/></>}></Route>
        <Route path='/Adopter/vieworphange/:token' element={<><AdoptNavbar/><ORdetails/></>} />
        

        

        
      </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
