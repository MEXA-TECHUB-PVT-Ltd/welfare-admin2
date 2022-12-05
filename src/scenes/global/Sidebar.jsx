import React,{ useState ,useEffect} from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import InventoryIcon from '@mui/icons-material/Inventory';
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import BusinessIcon from '@mui/icons-material/Business';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import Groups2Icon from '@mui/icons-material/Groups2';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import GradingIcon from '@mui/icons-material/Grading';
import { useNavigate } from 'react-router-dom';
import PaymentIcon from '@mui/icons-material/Payment';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import CollectionsIcon from '@mui/icons-material/Collections';
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: "#52ad4a",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Welfare
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Username
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
              email
                </Typography>
              </Box>
            </Box>
          )} */}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
             
            />
              {/* <Item
              title="Admin Users"
              to="/admins"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
             
            /> */}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Membership Requests"
              to="/membershipRequests"
              icon={<CardMembershipIcon />}
              selected={selected}
              setSelected={setSelected}
              // onClick={()=>{
              //   localStorage.setItem('breadcrumb', JSON.stringify(selected));
              //   navigate('/staff');
              // }}
            />
             <Item
              title="Manage Members"
              to="/manageMembers"
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
              // onClick={()=>{
              //   localStorage.setItem('breadcrumb', JSON.stringify(selected));
              //   navigate('/staff');
              // }}
            />
             <Item
              title="Events"
              to="/events"
              icon={<EventIcon />}
              selected={selected}
              setSelected={setSelected}
              // onClick={()=>{
              //   localStorage.setItem('breadcrumb', JSON.stringify(selected));
              //   navigate('/staff');
              // }}
            />
              <Item
              title="Meetings"
              to="/meetings"
              icon={<MeetingRoomIcon />}
              selected={selected}
              setSelected={setSelected}
              // onClick={()=>{
              //   localStorage.setItem('breadcrumb', JSON.stringify(selected));
              //   navigate('/staff');
              // }}
            />
             <Item
              title="Council"
              to="/council"
              icon={<CorporateFareIcon />}
              selected={selected}
              setSelected={setSelected}
              // onClick={()=>{
              //   localStorage.setItem('breadcrumb', JSON.stringify(selected));
              //   navigate('/staff');
              // }}
            />
             <Item
              title="Reports"
              to="/reportsData"
              icon={<MenuBookIcon />}
              selected={selected}
              setSelected={setSelected}
              // onClick={()=>{
              //   localStorage.setItem('breadcrumb', JSON.stringify(selected));
              //   navigate('/staff');
              // }}
            />
             {/* <Item
              title="Reports View"
              to="/reportsView"
              icon={<MenuBookIcon />}
              selected={selected}
              setSelected={setSelected}
              // onClick={()=>{
              //   localStorage.setItem('breadcrumb', JSON.stringify(selected));
              //   navigate('/staff');
              // }}
            /> */}
            <Item
              title="Monthly Reports"
              to="/monthlyReports"
              icon={<SummarizeIcon />}
              selected={selected}
              setSelected={setSelected}
              // onClick={()=>{
              //   localStorage.setItem('breadcrumb', JSON.stringify(selected));
              //   navigate('/staff');
              // }}
            />
            <Item
              title="Library"
              to="/library"
              icon={<CollectionsIcon />}
              selected={selected}
              setSelected={setSelected}
              // onClick={()=>{
              //   localStorage.setItem('breadcrumb', JSON.stringify(selected));
              //   navigate('/staff');
              // }}
            />
             {/* <Item
              title="Payment"
              to="/payment"
              icon={<PaymentIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            {/* <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            {/* <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
