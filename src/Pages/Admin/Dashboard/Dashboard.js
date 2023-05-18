import React, { useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Box, Grid } from '@mui/material'
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import BasicCard from '../../../Components/Admin/Dashboard/BasicCard';
import OrderGraph from './OrderGraph';
import SellRequestGraph from './SellRequestGraph';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardDetailsAction } from '../../../Redux/Actions/adminActions/adminDashboardActions';

const Dashboard = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDashboardDetailsAction())
  }, [])

  const details = useSelector((state) => state.getDashboardDetails.dashBoardData)

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component='main' sx={{ flexGrow: 1, p: 3, marginLeft: 8 }}>
          <h1>Dashboard</h1>
          <Box className='d-flex justify-content-start container'>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <BasicCard
                  value={details ? details.totalUsers : ""}
                  title={"Total Users"}
                  desc={"Total Registered Users"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <BasicCard
                  value={details ? details.totalBooks : ""}
                  title={'Total Books'}
                  desc={"Total Books in collection"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <BasicCard
                  value={details ? details.totalOrders : ""}
                  title={"Total Orders"}
                  desc={'Total Orders done'}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <BasicCard
                  value={details ? details.totalAmountCollected : ""}
                  title={"Total Rent Amount"}
                  desc={'Amount received '}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ width: '100%' }} className='mt-5'>
            <MDBContainer>
              <MDBRow>
                <MDBCol size='md'>
                  <OrderGraph
                    placed={details ? details.totalPlacedOrders : "="}
                    shipped={details ? details.totalShippedOrders : "-"}
                    delivered={details ? details.totalDeliveredOrders : "-"}
                    title={'Order Details'}
                  />
                </MDBCol>
                <MDBCol size='md'>
                  <SellRequestGraph
                    pending={details ? details.totalPendingRequests : "-"}
                    accepted={details ? details.totalAcceptedRequests : "-"}
                    rejected={details ? details.totalRejectedRequests : "-"}
                    shipped={details ? details.totalShippedRequests : "-"}
                    received={details ? details.totalReceivedRequests : "-"}
                    title={'Sell Request Details'}
                  />
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Dashboard