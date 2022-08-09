import React, {Component, Fragment, useState} from "react";
import Typography from "@mui/material/Typography";
import NavTabs from "../../components/common/Nav";
import Grid from "@mui/material/Grid";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import GDSEButton from "../../components/common/Button";
import DashBoardService from "../../services/DashBoardService";
import ProductsServices from "../../services/ProductsServices";

class Product extends Component{
    constructor(props) {
        super(props);
                this.state={
                    categories:[],
                    formData:{
                      tittle:'',
                      price:'',
                      category:'',
                      description:''
                    },
                    file:''


                }
    }
    componentDidMount() {
        this.loadCategories();
    }
    clearField(){
        this.setState({
           forData:{
                   tittle:'',
                   price:'',
                   category:'',
                   description:''
               },
               file:''


           })
    }
    loadCategories=async ()=>{
        let res=await ProductsServices.fetchCategories();
        if (res.status===200){
            this.setState({
                categories:res.data
            })

            console.log(res.data)
        }
    }
    handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];
        const f=URL.createObjectURL(e.target.files[0])
        this.setState({
            file:f
        })
        if (file.size > 1024) {
            console.log(file)
        }
    };
    handlesubmit=async ()=>{
        let pdto={
            "tittle":this.state.formData.tittle,
            "price":this.state.formData.price,
            "description":this.state.formData.description,
            "image":this.state.file,
            "category":this.state.category

        }
        let res=await ProductsServices.postProduct(pdto);
        if (res.status==200){
            alert("success")
        }else {
            alert("error")
        }
    }
    render() {
        return (
            <Fragment>
                <NavTabs/>
                <Typography
                    variant='h2'
                    style={{fontWeight:'bold',marginTop:'1%'}}
                >
                   Products
                </Typography>
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handlesubmit}
                    onError={errors => console.log(errors)}
                >
                <Grid container spacing={10}>
                    <Grid item lg={6} md={6} sm={6} xs={6}>

                        <TextValidator
                            id="outlined-basic"
                            placeHolder="tittle"
                            label="tittle"
                            variant="outlined"
                            size="small"
                            style={{width: '100%'}}
                            value={this.state.formData.tittle}
                            onChange={(e)=>{
                                let formData=this.state.formData
                                formData.tittle=e.target.value
                                this.setState({formData})

                            }}
                            validators={['required', 'isString']}

                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>

                        <TextValidator
                            id="outlined-basic"
                            placeHolder="price"
                            label="price"
                            variant="outlined"
                            size="small"
                            style={{width: '100%'}}
                            value={this.state.formData.price}
                            onChange={(e)=>{
                                let formData=this.state.formData
                                formData.price=e.target.value
                                this.setState({formData})

                            }}
                            validators={['required', 'isPositive']}

                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>

                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={this.state.categories}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Category" />}
                          /*  getOptionLabel={
                                (option) => option.category
                            }*/

                            onChange={(e, value) => {
                                let formData=this.state.formData
                                formData.category=value.label
                                this.setState({formData})

                            }}
                            size="small"
                            style={{ width: '100%' }}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>

                        <textarea
                            id="outlined-basic"
                            placeholder='description'
                            style={{width: '100%',height:'200%'}}
                            value={this.state.formData.description}
                            onChange={(e)=>{
                                let formData=this.state.formData
                                formData.description=e.target.value
                                this.setState({formData})

                            }}
                            validators={['required', 'isString']}

                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <div style={{width:'50%',height:'400%',background:'url('+this.state.file+')'}}>

                        </div>
                        <TextField
                            id="outlined-basic"
                            placeHolder="img"
                            variant="outlined"
                            type='file'
                            size="small"
                           // value={this.selectedFile}
                            style={{
                                width: '80%',
                                marginTop:'1%',
                                backgroundColor:'white'}}
                            onChange={(e)=>{
                                this.handleFileInput(e)
                            }}
                        />

                    </Grid>
                    <Grid item  lg={12} md={12} sm={12} xm={12} style={{display: 'flex',}} justifyContent="flex-end" >
                        <GDSEButton
                            size="large"
                            color='primary'
                            variant="contained"
                            label="clear"
                            onClick={()=>{
                                this.clearField();
                            }}
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
        );
    }


}
export default Product