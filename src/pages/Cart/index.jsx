import React, {Component, Fragment} from "react";
import NavTabs from "../../components/common/Nav";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import GDSEButton from "../../components/common/Button";
import Typography from "@mui/material/Typography";
import CartService from "../../services/CartService";

class Cart extends Component{
    constructor(props) {
        super(props);
        this.state={
            userName:[
                { userName:'Nilanga '},

            ],
           productTitle:[]
        }

    }
    componentDidMount() {
        this.loadTittle()
    }

    loadTittle=async ()=>{
        let res=await CartService.fetchTittle();
        if (res.status==200){
            res.data.map((value,index)=>{
                console.log(value.title)
                this.setState({
                    productTitle: {value}
                })
            })
            // console.log(res.data.tittle.map((value) => (row.tittle)))
        }
    }
    render() {
        return(
            <Fragment>
                <NavTabs/>
                <Typography
                    variant='h2'
                    style={{fontWeight:'bold',marginTop:'1%'}}
                >
                    Cart Manage
                </Typography>
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    onError={errors => console.log(errors)}
                >
                    <Grid container spacing={10}>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={this.state.userName}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="User Name" />}
                                getOptionLabel={
                                    (option) => option.userName
                                }
                                onChange={(e, value) => {
                                    /*  console.log(value.label + " " + value.year);*/
                                }}
                                size="small"
                                style={{ width: '100%' }}
                            />

                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                id="outlined-basic"
                                placeHolder="img"
                                variant="outlined"
                                type='date'
                                size="small"
                                style={{
                                    width: '100%',
                                    backgroundColor:'white'}}
                                onChange={(e)=>{

                                }}
                            />

                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={this.state.productTitle}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="product Title" />}

                                onChange={(e, value) => {
                                    /*  console.log(value.label + " " + value.year);*/
                                }}
                                size="small"
                                style={{ width: '100%' }}
                            />

                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>

                            <TextValidator
                                id="outlined-basic"
                                placeHolder="Qty"
                                label="QTY"
                                variant="outlined"
                                size="small"
                                style={{width: '100%'}}
                                onChange={(e)=>{

                                }}
                                validators={['required', 'isPositive']}

                            />
                        </Grid>
                        <Grid item  lg={12} md={12} sm={12} xm={12} style={{display: 'flex',}} justifyContent="flex-end" >
                            <GDSEButton
                                size="large"
                                color='primary'
                                variant="contained"
                                label="clear"
                                type="submit"
                                style={{marginRight:'30px'}}

                            />
                            <GDSEButton
                                size="large"
                                color='success'
                                variant="contained"
                                label="save"
                                type="submit"
                                style={{marginRight:'30px'}}
                            />
                        </Grid>
                    </Grid>

                </ValidatorForm>
            </Fragment>
        )
    }

}
export default Cart