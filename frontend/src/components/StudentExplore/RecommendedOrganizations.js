import {useState, useEffect} from 'react';
import { buildPath } from '../../path';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import '../OrgPortal/OrgPortal.css';

const logo = require("../Login/loginPic.png");


function RecommendedOrganizations(props)
{

    const [orgs, setOrgs] = useState([]);
    const [orgCards, setOrgCards] = useState();
    const [numPages, setNumPages] = useState(0);  
    const [page, setPage] = useState(1);

    function changePage(e, value){
        setPage(value);
        let content = <div className="cards d-flex flex-row cardWhite card-body">{orgs.slice(4 * (value - 1), 4 * (value - 1) + 4)}</div>
        setOrgCards(content);
    }

    // Will open the organization's page
    function openOrgPage(id){
        
    }

    async function getOrgs(){
        const userID = "123456789";

        let url = buildPath(`api/getSuggestedOrganizations_ForUser?userID=${userID}`);

        let response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });

        let res = JSON.parse(await response.text());

        console.log(res);    

	    const orgs = [];

        for(let org of res)
            orgs.push(<Org name={org.name} description={org.description} id={org.organizationID}/>)  

        setNumPages(Math.ceil(orgs.length / 4))
        setOrgs(orgs);

        let extraBack = 0;
        
        // Need to go a page back due to deletion
        if(((page - 1) * 4) >= orgs.length){
            setPage(page - 1);
            extraBack = 1;
        }

        let content = <div className="cards d-flex flex-row cardWhite card-body">{orgs.slice((page - 1 - extraBack) * 4, (page - 1 - extraBack) * 4 + 4)}</div>
        setOrgCards(content);
    }

    function OrgHeader(){
        return <h1 className='upcomingEvents spartan'>Recommended Organizations</h1>
    }

    function Org(props) {      
        return (
            <div className="event spartan">
                <CardActionArea className='test'>
                    <Card className="eventHeight" onClick={() => openOrgPage(props.id)}>
                        <CardMedia
                            component="img"
                            height="150"
                            image={logo}
                        />
                        <CardContent>
                            <Typography className='eventName' clagutterBottom variant="h6" component="div">
                                {props.name}
                            </Typography>
                            <Typography>
                                {(props.description.length >= 80) ? (props.description.substring(0, 80) + "...") : props.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </CardActionArea>
            </div>
        )
    }

    function Orgs(){
        return (
            <div className="eventsCard card">       
                {orgCards}
            </div>
        )
    }

    useEffect(()=>{
        getOrgs();
    },[])
    

    return(
     <div className='upcomingEventsSpace'>
        <OrgHeader/>
        <div>
            <Orgs/>            
            <Pagination className="pagination" page={page} count={numPages} onChange={changePage} color="secondary" />
        </div>
     </div>
    );
};

export default RecommendedOrganizations;