import React from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import Api from '../api/Api';
import Home from './Home';


const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};



class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            roomName: '',
            open: false,
            left: false,

        };
        this.handleOnchange = this.handleOnchange.bind(this);
        this.handleOnsubmit = this.handleOnsubmit.bind(this);
    }



    handleClose = () => {
        this.setState({open: false});
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    handleOnchange = async (event) => {
        await this.setState({
            roomName: event.target.value
        });
        console.log(this.state.roomName)

    };

    componentDidMount() {

    }


    handleOnsubmit = async (event) => {
        event.preventDefault();
        let headersParam = {
            headers: {
                Accept: 'application/json',
                authorization: 'Bearer ' + Api.userToken ,
                'Content-type': 'application/json'
            }
        };

        let requestOptions = {
            creator: Api.userName,
            room_name: this.state.roomName,

        };

        await axios.post(Api.createChannelUri,
            requestOptions,
            headersParam)
            .then(res => {
            console.log(res)
            }).catch((error) => console.log(error));

        this.handleClose();

    };


        render()
        {
            const {classes} = this.props;
            const sideList = (
                <div className={classes.list}>

                    <List>
                        {['Create Channel', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button onClick={this.handleClickOpen} key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))}
                    </List>
                </div>
            );

            return (
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton onClick={this.toggleDrawer('left', true)} className={classes.menuButton}
                                        color="inherit" aria-label="Menu">
                                <MenuIcon/>

                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                GhostWritter
                            </Typography>
                            <Link to={{pathname: `/register`}}>
                                <Button> Register </Button>
                            </Link>
                            <Link to={{pathname: `/`}}>
                                <Button> Home</Button>
                            </Link>

                            <Link to={{pathname: `/login`}}>
                                <Button> Login</Button>
                            </Link>

                        </Toolbar>
                    </AppBar>

                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Create new Channel</DialogTitle>
                        <form onSubmit={this.handleOnsubmit}>
                        <DialogContent>

                            <DialogContentText>
                                To Create a channel enter de the of the channel
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Name of the channel"
                                type="text"
                                fullWidth
                                name='roomName'
                                onChange={this.handleOnchange}
                                defaultValue={this.state.roomName}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleClose}   color="primary">
                                Subscribe
                            </Button>
                        </DialogActions>
                        </form>
                    </Dialog>
                    <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                        <div
                            tabIndex={0}
                            role="button"
                            onClick={this.toggleDrawer('left', false)}
                            onKeyDown={this.toggleDrawer('left', false)}
                        >
                            {sideList}
                        </div>
                    </Drawer>

                </div>
            );
    }



}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Navbar);
