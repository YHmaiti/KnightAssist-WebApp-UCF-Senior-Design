import React, { useState } from 'react';
import PageTitle from '../PageTitle';
import {BiMenu, BiHome, BiSearch, BiHistory, BiCog, BiLogOut} from 'react-icons/bi';
import { RiFeedbackLine } from "react-icons/ri";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom'; 
import './OrgEvents.css';
import Logo from '../Logo';
import { CgProfile } from 'react-icons/cg';

function Header()
{
    let user = JSON.parse(sessionStorage.getItem('user-info'));
    const navigate = useNavigate();
    console.warn(user);

    function logOut() {
        // handle logout logic
        // bring user to landing page
        sessionStorage.clear();
        navigate('/'); 
        
    }

    // customizing tooltip appearance
    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: theme.palette.common.white,
          color: 'rgba(0, 0, 0, 0.87)',
          fontSize: 15,
          border: '1px solid #8C8C8C',
        },
    }));

    //customizing big log out button
    const LogOutButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    background: 'linear-gradient(45deg, #00785A 30%, #00785A 90%)',
    '&:hover': {
        background: 'linear-gradient(45deg, #008463 30%, #008463 80%)',
    },
    }));
    //customizing small log out button
    const SmallLogOutButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    background: 'linear-gradient(45deg, #00785A 30%, #00785A 90%)',
    '&:hover': {
        background: 'linear-gradient(45deg, #008463 30%, #008463 90%)',
    },
    }));

    const [isSidebarActive, setSidebarActive] = useState(false);
    const handleToggleSidebar = () => {
    setSidebarActive(!isSidebarActive);
    };

	// For the case that a user is viewing another org profile
	// and then clicks the profile button
	function loadOrgProfile(){
		sessionStorage.removeItem("viewingPageID"); 
		if(window.location.href.substring(window.location.href.lastIndexOf("#")) === "#/orgprofile")
			window.location.reload();
		else		
			window.location.href = "#/orgprofile";
	}

    return(
     <div>
        <div className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
            <div className={`${isSidebarActive ? '' : 'moveLogoContent'} logo_content`}>
                <div className="logo logoBtn">
                    <PageTitle onClick={() => loadOrgProfile()} mainStyle="headerTitleLogo" logoStyle="logoHeader" titleStyle="titleHeader"/>
                </div>
                <Logo theStyle={`menuIcon ${isSidebarActive ? 'logoSidebar' : 'moveLogo logoHeade'}`}/>
                <BiMenu onClick={() => handleToggleSidebar()} className='menuIcon'></BiMenu>
            </div>

            <ul className="nav_list">
                <li>
                    <LightTooltip title={!isSidebarActive ? "Home" : ""} placement="right" className="custom-tooltip">
                        <a href="#/orghome">
                            <BiHome className='homeIcon'></BiHome>
                            <span class="links_name">Home</span>
                        </a>
                    </LightTooltip>
                </li>
				<li>
                    <LightTooltip title={!isSidebarActive ? "Home" : ""} placement="right" className="custom-tooltip">
                        <a className="addHover" onClick={() => loadOrgProfile()}>
                            <CgProfile className='homeIcon'/>
                            <span class="links_name">Profile</span>
                        </a>
                    </LightTooltip>
                </li>
                <li>
                    <LightTooltip title={!isSidebarActive ? "Events" : ""} placement="right" className="custom-tooltip">
                        <a href="#/orgevents"> 
                            <BiSearch className='searchIcon'></BiSearch>
                            <span class="links_name">Events</span>
                        </a>
                    </LightTooltip>
                </li>
				<li>
                    <LightTooltip title={!isSidebarActive ? "Feedback" : ""} placement="right" className="custom-tooltip">
                        <a href="#/orgfeedback">
                            <RiFeedbackLine className='searchIcon'></RiFeedbackLine>
                            <span class="links_name">Feedback</span>
                        </a>
                    </LightTooltip>
                </li>
                <li>
                    <LightTooltip title={!isSidebarActive ? "Settings" : ""} placement="right" className="custom-tooltip">
                        <a href='#/settings'>
                            <BiCog className='settingsIcon'></BiCog>
                            <span class="links_name">Settings</span>
                        </a>
                    </LightTooltip>
                </li>
            </ul>
            <div className="profile_content">
                <div className="profile">
                    <LightTooltip title={!isSidebarActive ? "Log Out" : ""} placement="right" className="custom-tooltip">
                            <LogOutButton className="bigLogOut" endIcon={<BiLogOut />} onClick={logOut} style={{ textTransform: 'none' }}>
                                Sign Out
                            </LogOutButton>
                            <SmallLogOutButton className="smallLogOut" style={{borderRadius: 5}} onClick={logOut}>
                                <BiLogOut className="smallLogOutIcon" />
                            </SmallLogOutButton>
                    </LightTooltip>
                </div>
            </div>
        </div>
     </div>
    );
};

export default Header;