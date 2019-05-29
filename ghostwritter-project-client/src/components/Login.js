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
import jwtDecode from 'jwt-decode';
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

class Login extends React.Component  {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            showPassword: false,
            isNewUser: false,
            loggedIn: false
        };

        this.handleOnchange = this.handleOnchange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }


handleSubmit = async event =>{
    event.preventDefault();
    const user  = {
        email: this.state.email,
      password: this.state.password,
        loggedIn: false
  };

  await axios.post(Api.LoginUri, user).then(res =>{
      console.log(res);
        let token = res.data.token;
        let username = res.data.username;

      if (token) {
          let decoded = jwtDecode(token);
          const userId = {
              _id: decoded.user._id,
          };
          localStorage.setItem('token', token);
          localStorage.setItem('_id', userId._id);
          localStorage.setItem('username', username);
         this.props.history.push('/');
      }


  });

};

    handleOnchange = async(event) => {
        await this.setState({  [event.target.name] : event.target.value
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
                                        id="outlined-adornment-password"
                                        className={classNames(classes.margin, classes.textField)}
                                        variant="outlined"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        label="Password"
                                        name='password'
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
                                <Fab  variant="extended" value='Submit' type='submit' aria-label="Delete" className={classes.fab}>
                                    Login
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

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
