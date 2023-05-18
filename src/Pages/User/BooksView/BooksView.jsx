import React, { useEffect, useState } from 'react'
import NavBar from '../Navbar/Navbar'
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import AllBooks from '../../../Components/User/Books/AllBooks'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { userBookSearchAction, userGetAllGenreAction } from '../../../Redux/Actions/userActions/bookActions'
import SelfHelpBooks from '../../../Components/User/Books/SelfHelpBooks';
import KidsBooks from '../../../Components/User/Books/KidsBooks';
import NovelBooks from '../../../Components/User/Books/NovelBooks';
import Footer from '../Footer/Footer';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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

const BooksView = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const userGenres = useSelector(state => state.userGenreReducer)
  const { genreLoading, error, genreData } = userGenres

  useEffect(() => {
    dispatch(userGetAllGenreAction())
  }, [])

  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    dispatch(userBookSearchAction(searchTerm))
  }
  const books = useSelector((state) => state.userGetBooks)
  let { loading, booksData, Dataerror } = books

  return (
    <>
      <NavBar />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1>Books Available </h1>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <Box component='form' onSubmit={handleSubmit}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80%' }}
        >
          <TextField
            label="Search"
            name='search'
            value={searchTerm}
            fullWidth

            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSubmit()
            }}
          />
        </Box>
      </Box>


      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs aria-label="basic tabs example" value={value} onChange={handleChange} centered>
            <Tabs aria-label="basic tabs example" value={value} onChange={handleChange} centered>
              <Tab label="All Books" />
              {genreData &&
                genreData.data.filter(genre => !genre.isDeleted).map((data, index) => (
                  <Tab key={index} label={data.name} />
                ))}
            </Tabs>
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AllBooks allBooks={booksData} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SelfHelpBooks />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <KidsBooks />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <NovelBooks />
        </TabPanel>
      </Box>
      <br /><br /><br /><br /><br /><br /><br /><br />
      <Footer />
    </>
  )
}
export default BooksView


