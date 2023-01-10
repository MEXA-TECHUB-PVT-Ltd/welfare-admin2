import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import LoginPage from "./scenes/loginPage/login"
import MembershipReq from "./scenes/membershipReq"
import MembershipReqView from "./scenes/memberReqView"
import ManageMembers from "./scenes/manageMembers"
import Library from "./scenes/library"
import MonthlyReportData from "./scenes/MonthlyReports"
import ReportsData from "./scenes/ReportsData"
import Council from "./scenes/Council"
import Meetings from "./scenes/meetings"
import Events from "./scenes/events"
import ReportsDataView from "./scenes/reportsDataView"
import EventView from "./scenes/eventView"
import ManageMembersView from "./scenes/manageMembersView"
import PdfViewer from "./scenes/pdfView"
import SettingsData from "./scenes/settingsData"
import MembershipReqUcGroup from "./scenes/membershipReqUCgroup"
import MembershipReqViewUcGroup from "./scenes/memberReqViewUCgroup"
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.location.pathname === '/') {
      setIsSidebar(false)
    }
  }, []);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {pathname === '/' ? null :
            <Sidebar isSidebar={isSidebar} />
          }
          <main className="content">
            {pathname === '/' ? null :
              <Topbar setIsSidebar={setIsSidebar} />

            }
            <Routes>

              <Route path="/" element={<LoginPage />} />

              <Route path="/home" element={<Dashboard />} />
              <Route path="/membershipRequests" element={<MembershipReq />} />

              <Route path="/UcGroupRequests" element={<MembershipReqUcGroup />} />
              <Route path="/membershipRequestsUcGroupView" element={<MembershipReqViewUcGroup />} />


              <Route path="/membershipRequestsView" element={<MembershipReqView />} />
              {/* <Route path="/reportsDataView" element={<MembershipReqView />} /> */}

              <Route path="/manageMembers" element={<ManageMembers />} />
              <Route path="/manageMembersView" element={<ManageMembersView />} />

              <Route path="/library" element={<Library />} />
              <Route path="/monthlyReports" element={<MonthlyReportData />} />
              <Route path="/reportsData" element={<ReportsData />} />
              <Route path="/council" element={<Council />} />
              <Route path="/meetings" element={<Meetings />} />
              <Route path="/events" element={<Events />} />
              <Route path="/reportsView" element={<ReportsDataView />} />
              
              <Route path="/eventView" element={<EventView />} />
              <Route path="/pdfView" element={<PdfViewer />} />
              <Route path="/settings" element={<SettingsData />} />









              {/* <Route path="/admins" element={<AdminUsers />} />
              <Route path="/payment" element={<PaymentData />} />






              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} /> */}
            </Routes>
          </main>
        </div>



        {/* <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
             <Routes>

              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={<Dashboard />} />

              <Route path="/admins" element={<AdminUsers />} />

              <Route path="/staff" element={<StaffMembers />} />
              <Route path="/company" element={<Company />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/supplyOrder" element={<SupplyOrder />} />
              <Route path="/purchaseOrder" element={<PurchaseOrder />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/payment" element={<PaymentData />} />


              <Route path="/supplyOrderDetail" element={<SupplyOrderDetail />} />
              <Route path="/salesOrder" element={<SalesOrder />} />
              <Route path="/invoice" element={<InvoiceData />} />
              <Route path="/invoiceSingle" element={<InvoiceSingle />} />




              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes> 
          </main>
        </div> */}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;



// import * as React from "react";
// import { Route, Routes, Link } from "react-router-dom";

// const Home = () => <h1>Home</h1>;
// const Profile = () => <h1>Profile</h1>;
// const Settings = () => <h1>Settings</h1>;

// const routes = [
//   {
//     path: "/",
//     main: () => <Home />,
//     sidebar: () => (
//       <p>
//         This is your home page. You'll see your feed which is made up of the
//         people you follow.
//       </p>
//     )
//   },
//   {
//     path: "/profile",
//     main: () => <Profile />,
//     sidebar: () => (
//       <p>
//         This is your profile page. You'll be able to see all your profile
//         information as well as the people you follow.
//       </p>
//     )
//   },
//   {
//     path: "/settings",
//     main: () => <Settings />,
//     sidebar: () => (
//       <p>
//         This is your settings page. You can change your name, image, and
//         anything else associated with your account.
//       </p>
//     )
//   }
// ];

// export default function App() {
//   return (
//     <div className="wrapper">
//       <div className="sidebar">
//         <ul className="nav">
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/profile">Profile</Link>
//           </li>
//           <li>
//             <Link to="/settings">Settings</Link>
//           </li>
//         </ul>
//         <Routes>
//           {routes.map(({ path, sidebar }) => (
//             <Route key={path} path={path} element={sidebar()} />
//           ))}
//         </Routes>
//       </div>

//       <Routes>
//         {routes.map(({ path, main }) => (
//           <Route key={path} path={path} element={main()} />
//         ))}
//       </Routes>
//     </div>
//   );
// }

