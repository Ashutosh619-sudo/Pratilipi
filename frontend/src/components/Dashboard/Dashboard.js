import { useEffect, useState } from "react";
import "./dashboard.css";
import "../UI/ui.css";
import "./modal.css";
import {
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Typography,
  formControlLabelClasses,
} from "@mui/material";
import Modal from "react-modal";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import { getContent, likeContent } from "./services/getContent";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Dashboard = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  
  const [list, setList] = useState([]);
  const [specificItem, setSpecificItem] = useState({});


  const user_id = parseInt(localStorage.getItem("user_id"))

  function openModal(story) {
    setSpecificItem(story)
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function like(item){
    const res = await likeContent(user_id,item.id)
    }
  

  useEffect(()=>{
    getContent().then(items=>{
        setList(items)
    })
  },[list])

  return (
    <div>
      <Box sx={{ flexGrow: 1 }} textAlign="left">
        <Grid
          container
          justifyContent="center"
          direction="column"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            
          <CardContent>
              <div>
                <h1 className="dashboard-heading">Books List</h1>
                <hr></hr>
              </div>
            </CardContent>
            <Card className="card-customize" sx={{ minWidth: 350 }}>
              { list.map(item=>
              <CardContent key={item.id} className="card-content-customize">
                <div>
                  <h3>
                    Title :{" "}
                    <span className="title-color">
                      {item.title}
                    </span>
                  </h3>
                  <Button
                    id="button-customize"
                    variant="outlined"
                    color="secondary"
                    onClick={()=>{openModal(item)}}
                  >
                    View Details
                  </Button>
                  
                  {"\u00A0"}
                  {item.liked_by.includes(user_id)?(<Button onClick={ 
                    ()=>{
                      like(item)
                    }
                    
                   } style={{backgroundColor:"pink"}}
                   variant="outlined">
                    <ThumbUpRoundedIcon />
                    {"\u00A0"}
                    <span className="like-icon-customize">{item.likes}</span>
                  </Button>):<Button  onClick={ 
                    ()=>{
                      like(item)
                    }
                   } variant="outlined">
                    <ThumbUpRoundedIcon />
                    {"\u00A0"}
                    <span className="like-icon-customize">{item.likes}</span>
                  </Button>}
                  
                </div>
              </CardContent>)}
              <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    style={customStyles}
    ariaHideApp={false}
  >
    <CardContent>
      <Typography component={"span"}>
        <div>
          <h3>
            Title :{" "}
            <span className="title-color">
            {specificItem.title}
            </span>
          </h3>
        </div>
        <div>
          <h3>
            Description :{"\u00A0"}
            <span className="desciption-customize">
              {specificItem.story}
            </span>
          </h3>
        </div>
        <div>
          <h3>
            Likes :{" "}
            <span className="likes-customize"> {specificItem.likes}</span>
          </h3>
        </div>
        <div>
          <h3>
            Published Date :{" "}
            <span className="published-date-customize">
            {specificItem.date_published}
            </span>
          </h3>
        </div>
      </Typography>
    </CardContent>
  </Modal>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
              }
export default Dashboard;
