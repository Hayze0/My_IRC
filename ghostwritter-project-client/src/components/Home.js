import React, {Component} from 'react';
import axios from 'axios';
import Api from '../api/Api';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import openSocket from 'socket.io-client';
import socketUrl from '../api/Api';
import {Link} from "react-router-dom";
const socket = openSocket(socketUrl.socketUri);

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
};



class Home extends Component {

constructor(props){
    super(props);
    this.state = {
        chats: [],
        newChat: false,
        roomJoin:''
    };
    this.token = localStorage.getItem('token');
}

getChats = async ()=> {
    await axios.get(Api.chatListUri,
        {headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + this.token}}).
    then( res => {

        this.setState({chats: res.data});
    })
};
socketConnect = () =>{
    socket.on('connect', () =>{
        console.log('user connected')
    });
};
componentWillMount() {
    this.socketConnect()
}


    componentDidMount = async()  =>{
       this.getChats();
    };





    render() {
        const { classes } =this.props;

        if(this.state.chats) {

            return (
            <div>
                <div className="container">
                    <h1>available Channels</h1>
                    <div className='row'>
                                       {
                            this.state.chats.map((item, key) =>
                                <div  className='col-sm-3 chat-box'>
                                    <div className='chat-list'>

                                    <Card   className={classes.card}>
                                        <CardActionArea>
                                            <CardMedia
                                                className={classes.media}
                                                image="https://www.ladenise.com/wp-content/uploads/bestofchaticone.png"
                                                title="Contemplative Reptile"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {item.room_name}
                                                </Typography>
                                                <Typography component="p">
                                                    Created By:<br/> {item.creator}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                            <Link   to={`/chat/${item._id}`} variant="outlined" className={classes.button}>
                                                join Channel
                                            </Link>
                                    </Card>
                                </div>
                                </div>


                            )

                                       }
                </div>
                </div>
                </div>

        );
    }
}
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);

