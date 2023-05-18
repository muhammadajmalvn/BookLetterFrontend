import React, { useEffect, useState } from 'react'
import { Box, Tabs, Tab, Typography } from '@mui/material'
import Sidebar from '../Sidebar/Sidebar'
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { getSalesReportDataAction } from '../../../Redux/Actions/adminActions/adminSalesReportAction';
import AllReport from '../../../Components/Admin/Sales-Report/AllReport';
import MonthlyReport from '../../../Components/Admin/Sales-Report/MonthlyReport';
import YearlyReport from '../../../Components/Admin/Sales-Report/YearlyReport';
import WeeklyReport from '../../../Components/Admin/Sales-Report/WeeklyReport'
import DailyReport from '../../../Components/Admin/Sales-Report/DailyReport';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};



const SalesReport = () => {
  const dispatch = useDispatch()
  const [value, setvalue] = useState(0)
  const handleChange = (event, newValue) => {
    setvalue(newValue);
  }
  useEffect(() => {
    dispatch(getSalesReportDataAction())
  }, [])
  const salesData = useSelector((state) => state.getSalesReportDetails.salesReportData)


  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component='main' sx={{ flexGrow: 1, p: 3, marginLeft: 8 }}>
          <h1>Sales Report</h1>
          <Box sx={{ width: '100%' }} className='mt-5'>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                centered
              >
                <Tab label="All" />
                <Tab label="Daily Report" />
                <Tab label="Weekly Report" />
                <Tab label="Monthly Report" />
                <Tab label="Yearly Report" />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>

              <AllReport salesData={salesData} />

            </TabPanel>
            <TabPanel value={value} index={1}>
              <DailyReport salesData={salesData} />
            </TabPanel>
            <TabPanel value={value} index={2}>

              <WeeklyReport salesData={salesData} />

            </TabPanel>
            <TabPanel value={value} index={3}>

              <MonthlyReport salesData={salesData} />

            </TabPanel>
            <TabPanel value={value} index={4}>

              <YearlyReport salesData={salesData} />
            </TabPanel>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default SalesReport