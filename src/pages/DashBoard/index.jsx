import React, {Component, Fragment} from "react";
import NavTabs from "../../components/common/Nav";
import Grid from "@mui/material/Grid";
import GDSEButton from "../../components/common/Button";
import {ValidatorForm} from "react-material-ui-form-validator";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {withStyles} from "@mui/styles";
import {styleSheet} from "./style";
import DashBoardService from "../../services/DashBoardService";

class  DashBoard extends Component{
    constructor(props) {
        super(props);
        this.state={
            cartCount:12,
            productCount:80,
            userCount:33
        }

    }
    componentDidMount() {
        this.loadCart();
        this.loadProducts();
        this.loadUsers();
    }

    loadUsers=async ()=>{
        let res=await DashBoardService.fetchDashBoardUser();
        if (res.status===200){
            this.setState({
                userCount:res.data.length
            })
            console.log(res.data.length)
        }
    }
    loadCart=async ()=>{
        let res=await DashBoardService.fetchDashBoardCart();
        if (res.status===200){
            this.setState({
                cartCount:res.data.length
            })
            console.log(res.data.length)
        }
    }
    loadProducts=async ()=>{
        let res=await DashBoardService.fetchDashBoardProduct();
        if (res.status===200){
            this.setState({
                productCount:res.data.length
            })
            console.log(res.data.length)
        }
    }
    render() {
        let {classes}=this.props
        return(
            <div className={classes.container}>
                <NavTabs/>
                <div className={classes.bodyOne}>
                    <div className={classes.card1}>
                        <div className={classes.text1}>
                            <Typography
                                variant='h3'
                                style={{fontWeight:'bold'}}
                            >
                              Products
                            </Typography>
                            <Typography
                                variant='h1'
                                style={{fontWeight:'bold',marginTop:'8%'}}
                            >
                                {this.state.productCount}
                            </Typography>
                        </div>

                    </div>
                    <div className={classes.card2}>
                        <div className={classes.text1}>
                            <Typography
                                variant='h3'
                                style={{fontWeight:'bold'}}
                            >
                                Cart
                            </Typography>
                            <Typography
                                variant='h1'
                                style={{fontWeight:'bold',marginTop:'8%'}}
                            >
                                {this.state.cartCount}
                            </Typography>
                        </div>

                    </div>

                </div>
                <div className={classes.bodyOne}>
                    <div className={classes.card1}>
                        <div className={classes.text1}>
                            <Typography
                                variant='h3'
                                style={{fontWeight:'bold'}}
                            >
                                Users
                            </Typography>
                            <Typography
                                variant='h1'
                                style={{fontWeight:'bold',marginTop:'8%'}}
                            >
                                {this.state.userCount}
                            </Typography>
                        </div>

                    </div>


                </div>

            </div>
        )
    }

}
export default withStyles(styleSheet) (DashBoard)
