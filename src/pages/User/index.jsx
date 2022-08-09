import React, {Component, Fragment} from "react";
import {withStyles} from "@mui/styles";
import {styleSheet} from "./style";
import Typography from "@mui/material/Typography";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Grid from "@mui/material/Grid";
import GDSEButton from "../../components/common/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GDSESnackBar from "../../components/common/SnackBar";
import UserService from "../../services/UserService";


class UserForm extends Component{
    constructor(props) {
        super(props);
        this.state={
            formData:{
                id:'',
                firstName:'',
                lastName:'',
                email:'',
                userName:'',
                password:'',
                city:'',
                street:'',
                streetNo:'',
                zipCode:'',
                latValue:'',
                longValue:'',
                mobileNo:''
            },
            /*formData:{
                email:'',
                userName:'',
                password:'',
                name:{
                    firstName:'',
                    lastName:''
                },
                address:{
                    city:'',
                    street:'',
                    streetNo:'',
                    zipCode:'',
                    latValue:'',
                    longValue:''
                },
                phone:''


            }*/
            data:[],
            alert: false,
            message: '',
            severity: '',
            btnLabel: 'save',
            btnColor: 'primary'
        }

    }
    handleSubmit= async () => {
     let formData = new FormData();
     let data={
            "email":this.state.formData.email,
            "userName":this.state.formData.userName,
            "password":this.state.formData.password,
            "name":{
                "firstName":this.state.formData.firstName,
                "lastName":this.state.formData.lastName
            },
            "address":{
                "city":this.state.formData.city,
                "street":this.state.formData.street,
                "streetNo":this.state.formData.streetNo,
                "zipCode":this.state.formData.zipCode,
                "geoLocation":{
                    "lat":this.state.formData.latValue,
                    "long":this.state.formData.longValue
                }
            },
            "phone":this.state.formData.mobileNo
     }
        let dto={
            "id":this.state.formData.id,
            "email":this.state.formData.email,
            "userName":this.state.formData.userName,
            "password":this.state.formData.password,
            "name":{
                "firstName":this.state.formData.firstName,
                "lastName":this.state.formData.lastName
            },
            "address":{
                "city":this.state.formData.city,
                "street":this.state.formData.street,
                "streetNo":this.state.formData.streetNo,
                "zipCode":this.state.formData.zipCode,
                "geoLocation":{
                    "lat":this.state.formData.latValue,
                    "long":this.state.formData.longValue
                }
            },
            "phone":this.state.formData.mobileNo
        }


        formData.append("dto", new Blob([JSON.stringify(data)], {
            type: "application/json"
        }));
     let response = await UserService.createPost(data);
        if(this.state.btnLabel === "save") {
            let res = await UserService.createPost(data);

            console.log(res)    //print the promise

            if (res.status === 201) {
                this.setState({
                    alert: true,
                    message: res.data.message,
                    severity: 'success'
                });
                this.clearField()
                this.loadData();
            } else {
                this.setState({
                    alert: true,
                    message: res.response.data.message,
                    severity: 'error'
                });
            }
        } else {
            let res = await UserService.putCustomer(dto);
            if (res.status === 200) {
                this.setState({
                    alert: true,
                    message: res.data.message,
                    severity: 'success',
                    btnLabel: 'save',
                    btnColor: 'primary'
                });
                this.clearField()
                this.loadData();
            } else {
                this.setState({
                    alert: true,
                    message: res.response.data.message,
                    severity: 'error'
                });
            }
        }
        // console.log(JSON.stringify(data))
        // alert(JSON.stringify(data))

    }
    componentDidMount() {
       this.loadData();
        console.log(this.state.data)
    }

    loadData=async ()=>{
        let res =await UserService.fetchUser();
        if (res.status===200){

            this.setState({
                data:res.data

            });
        }
        console.log(this.state.data)
    }
    clearField(){
        this.setState({
            firstName:'',
            lastName:'',
            email:'',
            userName:'',
            password:'',
            city:'',
            street:'',
            streetNo:'',
            zipCode:'',
            latValue:'',
            longValue:'',
            mobileNo:''
        })
    }
    deleteCustomer=async (id)=>{

        let res=await UserService.deleteCustomer(id)
        if(res.status === 200) {
            this.setState({
                alert: true,
                message: res.data.message,
                severity: 'success'
            });
            this.loadData();
        } else {
            this.setState({
                alert: true,
                message: res.data.message,
                severity: 'error'
            });
        }
    }
    updateCustomer =async (data) => {
        console.log(data)

        this.setState({
            btnLabel: 'update',
            btnColor: 'secondary',
            formData: {
                id:data.id,
                firstName:data.name.firstname,
                lastName:data.name.lastname,
                email:data.email,
                userName:data.username,
                password:data.password,
                city:data.address.city,
                street:data.address.street,
                streetNo:data.address.number,
                zipCode:data.address.zipcode,
                latValue:data.address.geolocation.lat,
                longValue:data.address.geolocation.long,
                mobileNo:data.phone
            }
        });



    };
    render() {
        let { classes }=this.props
        return(
          <Fragment>
              <Typography
                  variant='h3'
                  style={{fontWeight:'bold'}}
              >
                  User Registration
              </Typography>
              <ValidatorForm
                  ref="form"
                  onSubmit={this.handleSubmit}
                  onError={errors => console.log(errors)}
              >
                  <Grid container spacing={0.5}>
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                          <TextValidator
                              id="outlined-basic"
                              placeHolder="firstName"
                              label="First Name"
                              variant="outlined"
                              size="small"
                              style={{width: '100%'}}
                              value={this.state.formData.firstName}
                              onChange={(e)=>{
                                    let formData=this.state.formData
                                    formData.firstName=e.target.value
                                    this.setState({formData})

                              }}
                              validators={['required', 'matchRegexp:^([A-z]*)$']}
                          />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                          <TextValidator
                              id="outlined-basic"
                              placeHolder="lastName"
                              label="Last Name"
                              variant="outlined"
                              size="small"
                              style={{width: '100%'}}
                              value={this.state.formData.lastName}
                              onChange={(e)=>{
                                  let formData=this.state.formData
                                  formData.lastName=e.target.value
                                  this.setState({formData})

                              }}
                              validators={['required',  'matchRegexp:^([A-z]*)$']}
                          />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                          <TextValidator
                              id="outlined-basic"
                              placeHolder="email"
                              label="Email"
                              variant="outlined"
                              size="small"
                              style={{width: '100%'}}
                              value={this.state.formData.email}
                              onChange={(e)=>{
                                  let formData=this.state.formData
                                  formData.email=e.target.value
                                  this.setState({formData})
                              }}
                              validators={['required', 'isEmail']}

                          />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                          <TextValidator
                              id="outlined-basic"
                              placeHolder="userName"
                              label="User Name"
                              variant="outlined"
                              size="small"
                              style={{width: '100%'}}
                              value={this.state.formData.userName}
                              onChange={(e)=>{
                                  let formData=this.state.formData
                                  formData.userName=e.target.value
                                  this.setState({formData})
                              }}
                              validators={['required', 'matchRegexp:^([A-z]*[0-9]*)$']}

                          />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                          <TextValidator
                              id="outlined-basic"
                              placeHolder="password"
                              label="Password"
                              variant="outlined"
                              size="small"
                              style={{width: '100%'}}
                              type='password'
                              value={this.state.formData.password}
                              onChange={(e)=>{
                                  let formData=this.state.formData
                                  formData.password=e.target.value
                                  this.setState({formData})
                              }}
                              validators={['required', 'matchRegexp:^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$']}

                          />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                          <TextValidator
                              id="outlined-basic"
                              placeHolder="city"
                              label="City"
                              variant="outlined"
                              size="small"
                              style={{width: '100%'}}
                              value={this.state.formData.city}
                              onChange={(e)=>{
                                  let formData=this.state.formData
                                  formData.city=e.target.value
                                  this.setState({formData})
                              }}
                              validators={['required', 'isString']}

                          />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                          <TextValidator
                              id="outlined-basic"
                              placeHolder="street"
                              label="Street"
                              variant="outlined"
                              size="small"
                              style={{width: '100%'}}
                              value={this.state.formData.street}
                              onChange={(e)=>{
                                  let formData=this.state.formData
                                  formData.street=e.target.value
                                  this.setState({formData})
                              }}
                              validators={['required', 'isString']}
                          />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                          <TextValidator
                              id="outlined-basic"
                              placeHolder="streetNo"
                              label="Street No"
                              variant="outlined"
                              size="small"
                              style={{width: '100%'}}
                              value={this.state.formData.streetNo}
                              onChange={(e)=>{
                                  let formData=this.state.formData
                                  formData.streetNo=e.target.value
                                  this.setState({formData})
                              }}
                              validators={['required', 'isString']}

                          />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                          <TextValidator
                              id="outlined-basic"
                              placeHolder="zipCode"
                              label="Zip Code"
                              variant="outlined"
                              size="small"
                              style={{width: '100%'}}
                              value={this.state.formData.zipCode}
                              onChange={(e)=>{
                                  let formData=this.state.formData
                                  formData.zipCode=e.target.value
                                  this.setState({formData})
                              }}
                              validators={['required', 'matchRegexp:^([0-9]{5})$']}

                          />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                          <TextValidator
                              id="outlined-basic"
                              placeHolder="latValue"
                              label="lat Value"
                              variant="outlined"
                              size="small"
                              style={{width: '100%'}}
                              value={this.state.formData.latValue}
                              onChange={(e)=>{
                                  let formData=this.state.formData
                                  formData.latValue=e.target.value
                                  this.setState({formData})
                              }}
                              validators={['required', 'isPositive']}

                          />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                          <TextValidator
                              id="outlined-basic"
                              placeHolder="longValue"
                              label="Long Value"
                              variant="outlined"
                              size="small"
                              style={{width: '100%'}}
                              value={this.state.formData.longValue}
                              onChange={(e)=>{
                                  let formData=this.state.formData
                                  formData.longValue=e.target.value
                                  this.setState({formData})
                              }}
                              validators={['required', 'isPositive']}

                          />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                          <TextValidator
                              id="outlined-basic"
                              placeHolder="mobileNo"
                              label="Mobile No"
                              variant="outlined"
                              size="small"
                              style={{width: '100%'}}
                              value={this.state.formData.mobileNo}
                              onChange={(e)=>{
                                  let formData=this.state.formData
                                  formData.mobileNo=e.target.value
                                  this.setState({formData})
                              }}
                              validators={['required', 'matchRegexp:^([0-9]{10})$']}

                          />
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xm={12} style={{display: 'flex'}} justifyContent="flex-end" >
                          <GDSEButton
                              size="large"
                              variant="contained"
                              style={{color:'white',marginRight:'10px',backgroundColor:'red',fontWeight:'bold'}}
                              label="clear"
                              onClick={()=>{
                                  this.clearField();
                              }}
                          />
                          <GDSEButton
                              size="large"
                              variant="contained"
                              label={this.state.btnLabel}
                              olor={this.state.btnColor}
                              type="submit"
                          />
                      </Grid>
                  </Grid>

              </ValidatorForm>
              <Grid contaner style={{ marginTop: '15px' }}>
                  <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="customer table">
                          <TableHead>
                              <TableRow>
                                  <TableCell align="left">Id</TableCell>
                                  <TableCell align="left">First Name</TableCell>
                                  <TableCell align="left">Last Name</TableCell>
                                  <TableCell align="left">Email</TableCell>
                                  <TableCell align="left">User Name</TableCell>
                                  <TableCell align="left">Password</TableCell>
                                  <TableCell align="left">City</TableCell>
                                  <TableCell align="left">Street</TableCell>
                                  <TableCell align="left">Street No</TableCell>
                                  <TableCell align="left">Zip Code</TableCell>
                                  <TableCell align="left">Lat Value</TableCell>
                                  <TableCell align="left">Long Value</TableCell>
                                  <TableCell align="left">Mobile No</TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                           {this.state.data.map((row)=>(
                                  <TableRow>
                                      <TableCell align="left">{row.id}</TableCell>
                                      <TableCell align="left">{row.name.firstname}</TableCell>
                                      <TableCell align="left">{row.name.lastname}</TableCell>
                                      <TableCell align="left">{row.email}</TableCell>
                                      <TableCell align="left">{row.username}</TableCell>
                                      <TableCell align="left">{row.password}</TableCell>
                                      <TableCell align="left">{row.address.city}</TableCell>
                                      <TableCell align="left">{row.address.street}</TableCell>
                                      <TableCell align="left">{row.address.number}</TableCell>
                                      <TableCell align="left">{row.address.zipcode}</TableCell>
                                      <TableCell align="left">{row.address.geolocation.lat}</TableCell>
                                      <TableCell align="left">{row.address.geolocation.long}</TableCell>
                                      <TableCell align="left">{row.phone}</TableCell>
                                      <TableCell align="left">
                                          <Tooltip title="Edit">
                                              <IconButton
                                                  onClick={() => {
                                                      console.log("edit icon clicked!")
                                                      this.updateCustomer(row)

                                                  }}
                                              >
                                                  <EditIcon color="primary"/>
                                              </IconButton>
                                          </Tooltip>
                                          <Tooltip title="Delete">
                                              <IconButton
                                                  onClick={() => {
                                                        this.deleteCustomer(row.id)
                                                  }}
                                              >
                                                  <DeleteIcon color="error"/>
                                              </IconButton>
                                          </Tooltip>
                                      </TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
              </Grid>

              <GDSESnackBar
                  open={this.state.alert}
                  onClose={() => {
                      this.setState({ alert: false })
                  }}
                  message={this.state.message}
                  autoHideDuration={3000}
                  severity={this.state.severity}
                  variant="filled"
              />

          </Fragment>

        )
    }


}
export default withStyles(styleSheet) (UserForm)