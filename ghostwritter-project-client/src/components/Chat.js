import { css } from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom';
import 'bootstrap/dist/css/bootstrap.css';
import React, {Component} from 'react';
import openSocket from 'socket.io-client';
import socketUrl from '../api/Api';
import TextField from "@material-ui/core/TextField";
import Api from '../api/Api';
import axios from 'axios';
import List from '@material-ui/core/List';
import withStyles from "@material-ui/core/es/styles/withStyles";
import  Message from "./Message";
const socket = openSocket(socketUrl.socketUri);


const ROOT_CSS = css({
    height: 500,
    width: "100%",
});

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        height: 100,
        marginTop:'4%',

    },
    inline: {
        display: 'inline',
        color: 'white',
        fontFamily: 'Changa, sans-serif',
        fontSize: 18

},
    gridList: {
        width:"100%",
        height: 450,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    },
    textField:{
width:"100%",
        backgroundColor:"white",
    }
});
class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
                content:'',
                messages: [],
                infoRoom:[]
        };
        this.userToken = localStorage.getItem('token');
        this.setMessage = this.setMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }




    handleSubmit = async (event) =>{
        const form = event.target;
        const message = {
            message:
                {
                    username: Api.userName,
                    user: Api.user_Id,
                    content: this.state.content,
                }
        };
        event.preventDefault();
        console.log(message);
        await socket.emit('message',JSON.stringify(message));

        this.setState({content: null});
        form.reset();

    };


    getUniqueChat = async () => {

        const {match} = this.props;
        const id = match.params.chatId;
               socket.emit('room', id);
        const headerConfig = {
          headers:{
              'Content-type': 'Application/json',
              Authorization: 'Bearer ' + this.userToken,
              _id: id

          }

        };

       await axios.get(Api.uniqueChannel,
           headerConfig)
           .then(res =>{
           const data = res.data;
            const arrayZero = res.data[0];
            const arrayOne = res.data[1];
            this.setState({infoRoom: arrayZero})
            this.setState({messages: arrayOne});
           });

    };

    componentDidMount() {
        this.getUniqueChat();
        socket.on('serverMessage',async (messages)=>{
            let joinedData = this.state.messages.concat(messages);
            await this.setState( ({
                messages: joinedData
            }));
            console.log(messages);
        });

    }


    setMessage = async (event) =>{
    await this.setState({[event.target.name]: event.target.value, username: Api.userName});
};


    render() {
        console.log(this.state.messages);

        const {classes} = this.props;
        const messageLoad = this.state.messages;
        const infoChannel = this.state.infoRoom;
        return (
            <div className="container-fluid container--chat">
                <h3 className="title-chat">Name of the room: {infoChannel.room_name}</h3>
                <h3 className="title-chat">Creator of the room: {infoChannel.creator}</h3>
                <div className="row">
                    <div className="container integral-chat">
                    <div className=" container col-md-7">
                        <div className="row">
                        <div  className="message-box chat--box">

                            <List className={classes.root}>
                                <ScrollToBottom className={ ROOT_CSS }>
                                    <Message messageLoad={messageLoad}/>
                                </ScrollToBottom>
                            </List>

                        </div>
                        <div className="col-md-2">

                        </div>
                </div>

                <div className='input--message'>
                    <form  onSubmit={this.handleSubmit}>
                        <TextField
                            name="content"
                            id="standard-textarea"
                            onChange={this.setMessage}
                            label="Label"
                            placeholder="Placeholder"
                            className={classes.textField}
                            margin="normal"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={this.state.content}
                            ref="form"
                        />
                    </form>
                </div>
                </div>
                </div>
                </div>
            </div>


        );
    }
}


export default withStyles(styles)(Chat);
