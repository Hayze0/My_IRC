import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from '@material-ui/core/styles';



const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        height: 100,
        marginTop:'4%',
        border: "solid black 1px",
        backgroundColor: theme.palette.background.paper,

    },
    inline: {
        display: 'block',
    },
    gridList: {
        width:"100%",
        height: 450,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    },
});

export class Message extends Component {

    constructor(props){
        super(props);
        this.state = {
        }

    }

    render() {

        const { classes } = this.props;

        const  listOfmessages = this.props.messageLoad.map((item)=>(

            <div className="list--message">


                <ListItem classeName="" alignItems="flex-start">
                    <div>
                        <Avatar alt="Remy Sharp" src="https://onewayuk.com/wp-content/uploads/PropPuppets-Quintin-300x300.jpg" className={classes.bigAvatar} />
                    </div>
                    <ListItemText
                        primary={item.username}
                        secondary={
                            <React.Fragment>
                                <div className="text-message">
                                    <hr/>
                                <Typography component="span" className={classes.inline} color="textPrimary">
                                    <p>Message:</p>
                                    <p className="text-message"> {item.message}</p>
                                </Typography>
                                </div>
                                <hr/>

                                <div>
                                <Typography component="span" className={classes.inline} color="textPrimary">
                                    <p> Envoyer le   {item.created_at}</p>
                                </Typography>
                                </div>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </div>
        ));
        {
        return (
            <div className="message-box">
                        {listOfmessages}
            </div>
        );
        }
    }
}

Message.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Message);
