import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import IconButton from '@mui/material/IconButton';

import './css/searchbar.css'

export default function ListBar({ onClick }) {
    return (
        <div>
            <IconButton onClick={onClick} className='search-bar'
                sx={{position: 'absolute', backgroundColor: 'white' }}
            >
                <FormatListBulletedIcon className='search-bar-icon' />
            </IconButton>
        </div>
    )
}