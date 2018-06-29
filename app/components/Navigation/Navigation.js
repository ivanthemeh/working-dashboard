import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import NavMenu from './NavMenu';
import { inject , observer } from 'mobx-react';

class ButtonAppBar extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }
    displayUser = () => {
        return <span><br/>Current User Email</span>;
        // return <span><br/>{ this.props.stores['users'].currentUser ? this.props.stores['users'].currentUser.email : "Not Logged in" }</span>;
    }
    render() {
        return (
            <div style={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Link to="/"><img src={logo} alt="logo" width="125px" /></Link>
                        <Typography variant="title" color="inherit" style={{flex: 1}}>
                            IconCS { this.displayUser() }
                        </Typography>
                        <NavMenu/>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default ButtonAppBar;


// {
//     this.props.stores['users'].currentUser ? <NavMenu /> : null
//   }