// Sidebar.js
import './css/sidebar.css'; // Import your CSS file for styling
import '../index.css'

import SearchBar from './search';
import { CircularProgress, List, Pagination, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import Paper from '@mui/material/Paper';

import moment from "moment"
import { getImage } from '../utils/imagePath';

const getAvgRating = (ratingsList) => {
  if (!ratingsList) return 0;

  if (ratingsList.length === 0) return 0;

  let sum = 0
  ratingsList.forEach(rating_data => {
    sum += rating_data.rating
  });

  // console.log(sum)

  return sum / ratingsList.length
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  width: 370,
  maxWidth: 500,
  borderRadius: 0,

}));

const ItemOrganizer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e2e2e2',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  width: 370,
  maxWidth: 500,
  borderRadius: 0,
}));

const Sidebar = ({ isOpen, onSearch, toggleSidebar, onSelectEvent, events, pages, requestPageChange }) => {
  return (
    <div className={isOpen ? 'sidebar open' : 'sidebar'}>

      <SearchBar onToggle={toggleSidebar} onSearch={onSearch} ></SearchBar>

      {
        events.length > 0 ?
        <List sx={{
          // width: '400px',
          // maxWidth: 390,
          bgcolor: 'background.paper',
          position: 'relative',
          overflowY: 'auto',
  
          width: "100%",
  
          scrollbarWidth: "none", // Hide the scrollbar for firefox
          '&::-webkit-scrollbar': {
            display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
          },
          '&-ms-overflow-style:': {
            display: 'none', // Hide the scrollbar for IE
          },
  
          '& ul': { padding: 0 },
        }}
          subheader={<li />}
        >
          {events.map((event, index) => {
            const imagePath = getImage(event)
  
            const momentConvert = moment(event.startsOn).utcOffset("-06:00")
            const dayName = momentConvert.format('dddd, MMM Do h:mmA')
  
            const organizerPfpLink = `https://se-images.campuslabs.com/clink/images/${event.organizationProfilePicture}?preset=small-sq`
  
            let mainOrgInfo
            for (let index = 0; index < event.organizerInfos.length; index++) {
              const element = event.organizerInfos[index];
              if (element.id === event.organizationId) {
                mainOrgInfo = element;
                break;
              }
            }
  
            return (
              <li key={index} className='stack-item'>
                <button onClick={() => {
                  onSelectEvent(event)
                }}>
                  <Item sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                    <div>
                      <h3>{event.name}</h3>
  
                      <div className='item-info'><CalendarMonthIcon /><span>{dayName}</span></div>
                      <div className='item-info'><LocationOnIcon />
                        <span>{event.location}</span>
                      </div>
                    </div>
  
                    <img alt="event" height={"90px"} style={{ borderRadius: "10px" }} src={imagePath}></img>
  
                  </Item>
  
                  <ItemOrganizer className='organizerInfo'>
                    <img src={organizerPfpLink} alt="" className="orgPfp" />
                    <div>
                      <div style={{ marginTop: 4, fontWeight: "bold" }}>{event.organizationName}</div>
                      <Rating className='orgRating' name="read-only" value={getAvgRating(mainOrgInfo?.ratings)} precision={0.1} readOnly />
                    </div>
                  </ItemOrganizer>
                </button>
              </li >
            )
          })}
  
  
  
        </List>
        :
        <div style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <CircularProgress></CircularProgress>
        </div>
      }

      

      <Pagination onChange={(event, value) => {requestPageChange(value)}} count={pages}></Pagination>
    </div>
  );
};

export default Sidebar;
