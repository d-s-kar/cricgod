import React, { useEffect , useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, ButtonBase, ButtonGroup, Dialog, Grid } from '@material-ui/core';
import Navbar from './components/Navbar';
import Mycard from './components/MyCard';
import { getLocalMatchList, getMatches, getScore } from './components/api/Api';
import { Pagination } from '@material-ui/lab';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
function App() {
  const[tempmatches,setTempmatches]=useState([]);
  const[matches,setMatches]=useState([]);
  const[currentPage,setCurrentPage]= useState(1);
  const[matchesPerPage, setMatchesPerPage]= useState(10);
  const[date,setDate]=useState(new Date().toLocaleTimeString());

useEffect(() => {
  console.log(new Date().toLocaleDateString());
  console.log(process.env);
  setInterval(  
    () => setDate(new Date().toLocaleTimeString()),  
    1000  
  );
  
  getMatches()
  .then((data)=>{
    console.log(data);
    const Squadmatches=[];
    for(let i=0;i<data.matches.length;i++){
      if( data.matches[i].matchStarted===true){
        Squadmatches.push(data.matches[i]);
      }
    }
    console.log(Squadmatches);
    setMatches(data.matches);
    setTempmatches(data.matches);
  }
  )
  
  .catch((error)=>console.log(error)); 
}, []);

   const indexOfLastMatch=currentPage * matchesPerPage;
   const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
   const currentMatches = matches.slice(indexOfFirstMatch,indexOfLastMatch);
   

  const handleChange=(e,v)=>{
   console.log(v);
      setCurrentPage(v);
  }

  const formatDate=(s)=>{
         console.log(new Date().getUTCDate());
          }

  const handleMatches=(event)=>{
    const todaymatches=[];
    const pastmatches=[];
    const upcomingmatches=[];
   if(event.value==='Today'){
     for(let i=0;i<tempmatches.length;i++){
          if(new Date().toDateString()===new Date(tempmatches[i].date).toDateString()){
            console.log(new Date(tempmatches[i].date).toDateString());
            console.log(new Date().toDateString());
            todaymatches.push(tempmatches[i]);
          }
     }
     setMatches(todaymatches);
   }

   else if(event.value==='Past'){
    console.log(new Date(tempmatches[0].date).toLocaleDateString());
    console.log(formatDate(new Date().toLocaleDateString()));
    for(let i=0;i<tempmatches.length;i++){
         if(new Date().toLocaleDateString()>new Date(tempmatches[i].date).toLocaleDateString()){
          console.log(new Date(tempmatches[i].date).toLocaleDateString());
          console.log(new Date().toLocaleDateString());
           pastmatches.push(tempmatches[i]);
         }
    }
    setMatches(pastmatches);
  }

  else if(event.value==='Upcoming'){
    for(let i=0;i<tempmatches.length;i++){
         if(new Date().toDateString().substring(4)<new Date(tempmatches[i].date).toDateString().substring(4)){
           upcomingmatches.push(tempmatches[i]);
         }
    }
    setMatches(upcomingmatches);
  }

  }

  const getLocalMatchData=()=>{
        getLocalMatchList().then((data)=>{
          console.log(data[0].matches);
          setMatches(data[0].matches);
        }).catch((error)=>console.log(error));

  }
const handleSelect=()=>{

}

  const options = [
    'Today', 'Past' ,'Upcoming'
  ];

  return (
    <div className="App">
      {/* <Navbar/> */}
      <Grid container>
      {/* <Grid sm="3">
        <Button onClick={getLocalMatchData} style={{marginTop:50,textDecoration:'underline'}} >
          Click here for Local Match List
        </Button>
        <img  style={{width:700,height:500,marginLeft:-200}}src={require('./images/ms.png').default}/>
      </Grid>
      <Grid sm="6">
     {
       currentMatches.map((match)=>
         <Mycard match={match} key={match.unique_id}/>
       )
     }
     </Grid> */}
     <Grid>
     {/* <div style={{marginRight:20,marginLeft:30,marginTop:30}}>
        <Dropdown onChange={handleMatches} options={options} value="Matches"/>
        </div> */}
        
        <div>
          Clock
          <div>
            {date}
          </div>
          <div>
            More divs
          </div>
        </div>
        {/* <img  style={{width:320,height:420}}src={require('./images/abd.png').default}/> */}
        </Grid>
    </Grid>
    <div style={{marginTop:30,marginBottom:30, marginLeft:450}} >
    {/* <Pagination  showFirstButton={true} showLastButton ={true} count={Math.ceil(matches.length/matchesPerPage)}
     float="right" color="primary" variant="outlined" onChange={handleChange}>

     </Pagination> */}
    </div>
    </div>
    
  );
}

export default App;
