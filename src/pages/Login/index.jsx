import React, {Component} from "react";
import {withStyles} from "@mui/styles";
import {styleSheet} from "./style";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import GDSEButton from "../../components/common/Button";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import UserForm from "../User";
import {useHref} from "react-router-dom";
import DashBoard from "../DashBoard";
import { Link } from 'react-router-dom';


class Login extends Component{
    constructor(props) {
        super(props);

    }
    clickOnAction(){
        <DashBoard/>
    }
    render() {
        let { classes } = this.props
        return(
            <div className={classes.container}>

                <div className={classes.header}>

                    <Typography style={{fontWeight:'bold',color:'white'}}  variant="h2">Login</Typography>

                </div>
                <div className={classes.body}>
                      {/* <div className={classes.bodyText}>

                       </div> */}
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSubmit}
                        onError={errors => console.log(errors)}
                    >

                    <TextValidator
                        id="outlined-basic"
                        placeHolder="userName"
                        label="userName"
                        variant="outlined"
                        size="small"
                        style={{
                            width: '80%',
                            marginTop:'10%',
                            backgroundColor:'white'}}
                        onChange={(e)=>{


                        }}
                    />
                    <TextField
                        id="outlined-basic"
                        placeHolder="password"
                        label="password"
                        variant="outlined"
                        type='password'
                        size="small"
                        style={{
                            width: '80%',
                            marginTop:'10%',
                            backgroundColor:'white',

                        }}
                        onclick={(e)=>{

                        }}
                    />
                    </ValidatorForm>
                </div>
                <div className={classes.btnRow}>
                    <Link to="/dash">
                        <GDSEButton
                            size="large"
                            color={'primary'}
                            variant="contained"
                            label="Login"/>
                    </Link>
                </div>
                <div className={classes.signUp}>
                    <Typography style={{color:'black',marginLeft:'10%'}}  variant="h6">Create new user account ?  </Typography>
                 <Link to="/user">   <Typography style={{color:'blue'}}  variant="h6">click here</Typography></Link>
                </div>

            </div>
        )

    }

}
export default withStyles(styleSheet) (Login)