import { Button, Card, CardActions, CardContent, Typography ,Grid ,Dialog ,DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import React, { Fragment } from "react";
import { getScore, getSquad } from "./api/Api";
import { useState} from 'react';

const Mycard=({match})=>{
    
    const[teamData,setTeamData]=useState({});
    const[details,setDetails]= useState({});
    const [open, setOpen]=useState(false);
    const[open2,setOpen2]=useState(false);

    const handleClick=()=>{
         getScore(match.unique_id).then((data)=>{
             console.log(data);
             setDetails(data);
             handleOpen();
          }).catch((error)=>console.log(error));
    }
    
    const handleTeamPlayers=()=>{
         getSquad(match.unique_id).then((data)=>{
             console.log(data);
             setTeamData(data);
             handleOpen2();
         }).catch((error)=>console.log(error));
    }
    const handleClose=()=>{
           setOpen(false);
    }
    const handleClose2=()=>{
        setOpen2(false);
 }

    const handleOpen=()=>{
            setOpen(true)
    }
    const handleOpen2=()=>{
        setOpen2(true)
}

    const getDialog2=()=>{
        
        return <Dialog open ={open2} onClose={handleClose2}>
           <DialogTitle id="alert-dialog-title">
            Team Players
           </DialogTitle>
           <DialogContent>
               <DialogContentText>
           <Grid container spacing={4}>
           <Grid item>
           <div>{
                   teamData.data? (<div style={{color:'black',marginBottom:6}}>{teamData.data.team[0].name}</div>):(<div>Loading</div>)
                   }</div>
                   
                   <div>
                   {
                   teamData.data? (<div>{teamData.data.team[0].players.map(value => 
                     <li style={{color:'blue'}}>{value.name}</li>
                  )}</div>)
                  :
                  (<div>Loading</div>)
                   }</div>
           </Grid>
           <Grid item>
               <div>{
                   teamData.data? (<div style={{color:'black',marginBottom:6}}>{teamData.data.team[1].name}</div>):(<div>Loading</div>)
                   }</div>
                 <div>
                   {
                   teamData.data? (<div>{teamData.data.team[1].players.map(value => 
                     <li style={{color:'blue'}}>{value.name}</li>
                  )}</div>)
                  :
                  (<div>Loading</div>)
                   }</div>
           </Grid>
           </Grid>
           </DialogContentText>
           </DialogContent>
           
           <DialogActions>
               <Button onClick={handleClose2} color="secondary">Close</Button>
           </DialogActions>
        </Dialog>
    };


    const getDialog=()=>{
       
        return <Dialog open ={open} onClose={handleClose}>
           <DialogTitle id="alert-dialog-title">
             Score Board
           </DialogTitle>
           <DialogContent>
               <DialogContentText id="alert-dialog-description">
                     <div>
                         {
                            details.score ? (<div>{details.score}</div>):(<div>Sorry Match has Not Started yet or score is not avaailable</div>)
                         }
                         </div>
               </DialogContentText>
           </DialogContent>
           <DialogActions>
               <Button onClick={handleClose} color="secondary">Close</Button>
           </DialogActions>
        </Dialog>
    };
    

    const getMatchCart=()=>{    
          return <Card style={{marginTop:10}}>
                <CardContent>
                    <Grid container justify="center" alignItems="center" >
                     <Grid item>
                         <Typography>{match['team-1']}</Typography>
                     </Grid>
                     <Grid item>
                         <img  style={{width:100}}src={require('../images/a.png').default}/>
                     </Grid>
                     <Grid item>
                          <Typography>{match['team-2']}</Typography>
                     </Grid>
                     
                    </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container justify="center" spacing={1}>
                        <Grid item>
                        <Button onClick={handleClick} variant="contained" color="primary">Show Details</Button>
                        </Grid>
                        <Grid item>
                        <Button variant="contained" color="primary">
                            Date & Time {new Date(match.date).toLocaleString()}</Button>
                        </Grid>
                        <Grid item>
                        <Button onClick={handleTeamPlayers} variant="contained" color="primary">
                            Team Players</Button> 
                            </Grid>
                        </Grid>
                    </CardActions>
              </Card>
    }
    return(
        <Fragment>
        {getMatchCart()}
        {getDialog()}
        {getDialog2()}
       </Fragment>
    );
}

export default Mycard