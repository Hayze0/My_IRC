import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from "@material-ui/core/Fab";
import NavigationIcon from '@material-ui/icons/Navigation';
import axios from 'axios';
import classNames from 'classnames';
import Api from '../api/Api';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    textField: {
        flexBasis: 200,
    },
});

class Register extends React.Component {


    constructor(props){
        super(props);
       
        this.state = {
            username: '',
            password: '',
            email: '',
            phone: '',
            showPassword: false,
            isNewUser: false
        };

        this.handleOnchange = this.handleOnchange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
     handleOnchange = async(event) => {
        await this.setState({  [event.target.name] : event.target.value
         });

};


 handleSubmit = async event =>{
        event.preventDefault();
    const  user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            phone: this.state.phone,
        };
    console.log(user);

     await axios.post(Api.RegisterUri,user)
         .then(res => {
             console.log(res);
         });
 };



    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };


    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <div className='container'>
                    <div className='row'>
                    <div className='col-md-5 form-register'>
                        <form onSubmit={this.handleSubmit}>

                        <div className="form-group">
                            <h3>Subscribe to GhostWritter</h3>
                <TextField
                    id="outlined-username-input"
                    label="Username"
                    className={classes.textField}
                    type="username"
                    name="username"
                    defaultValue={this.state.username}
                    onChange={this.handleOnchange}
                    autoComplete="username"
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    id="outlined-email-input"
                    label="Email"
                    className={classes.textField}
                    type="email"
                    defaultValue={this.state.email}
                    onChange={this.handleOnchange}
                    margin="normal"
                    variant="outlined"
                    name='email'
                />
                <TextField
                    id="outlined-simple-start-adornment"
                    className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    label="Number"
                    type="tel"
                    defaultValue={this.state.phone}
                    onChange={this.handleOnchange}
                    name='password'
                    InputProps={{
                        startAdornment: <InputAdornment position="start">+33</InputAdornment>,
                    }}
                />

                <TextField
                    id="outlined-adornment-password"
                    className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    type={this.state.showPassword ? 'text' : 'password'}
                    label="Password"
                    name="password"
                    defaultValue={this.state.password}
                    onChange={this.handleOnchange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                >{this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                                    ),
                                }}
                            />



                </div>
                        <Fab variant="extended" value='Submit' type='submit' aria-label="Delete" className={classes.fab}>
                            Register

                            <NavigationIcon className={classes.extendedIcon} />
                        </Fab>
                        </form>
                </div>


            </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
