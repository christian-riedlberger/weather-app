import _ from 'lodash';
import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import { Select } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Header from './Header'
import "../App.css";
import {
    fetchCities,
    fetchForecast
} from '../actions/ActionTravel';

const styles = {
    formControl: {
      margin: '1em',
      minWidth: 120,
    },
    selectBox: {
      textAlign: 'center' 
    },
    textArea: {
        width: '70%',
        height: '30%'
    },
    paper: {
        padding: '2em',
        textAlign: 'center',
        color: 'grey'
    },
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '', 
            forecasts: '',
            description: '',
            cities: [],
            error: ''
         };
    }


    
    /**
     *  Called whenever location is changed
     */
    handleChange = (e) => {
        const location = {
            id: e.currentTarget.id,
            name: e.target.value,
        };

        fetchForecast(location)
        .then(res => {
            if (res.data.error) {
                this.setState({ 
                    forecast: res.data.error 
                })
            }
            else {
                this.setState({
                    location: location.name, 
                    forecast: res.data.forecast[1].day,
                    forecasts: res.data.forecast,
                    description: res.data.city.description 
                })
            }
          
        })
        .catch(error => {
            this.setState({ forecast: error })
        })

    }

    componentDidMount() {
    /**
     *  Fetches all cities for dropdown menu
     */
       fetchCities()
       .then(res => {
            if (res.data.error) {
                this.setState({ 
                    error: res.data.error
                })
            }
            else {
                this.setState({ 
                    cities: res.data.cities
                })
            }
        })
        .catch(error => {
            this.setState({ error })
        })
    }


    render() {
        const { classes } = this.props;


        return (
                <div>
                    <div>
                        <Header />
                    </div>
                    <div className="App">
                        <div>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="select-label">Location</InputLabel>
                                <Select className={classes.selectBox}
                                    labelId="select-label"
                                    margin="dense"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    defaultValue='Location'
                                    value={this.state.location}
                                >
                                {_.map(this.state.cities, option => (
                                    <MenuItem
                                        id={option.id}
                                        value={option.label}
                                    >
                                        {option.label}
                                    </MenuItem>
                                 ))}
                                </Select>
                            </FormControl>    
                        </div> 
                        <Grid container 
                            spacing={3} 
                            justify="center"
                            alignItems="center"
                        >
                            {this.state.description &&
                                <Grid item xs={10}>
                                    <Paper className={classes.paper}>{this.state.description}</Paper>
                                </Grid>
                            }    
                        </Grid>   
                        <Grid container 
                            spacing={3} 
                            justify="center"
                            alignItems="center"
                            >
                            {_.map(this.state.forecasts, forecast => (
                                <Grid item xs={2}>
                                    <Paper className={classes.paper}>
                                        <div>{forecast.dayOfWeek}</div>
                                        <div>{forecast.date}</div>
                                        <img src={forecast.condition.icon} alt=""/>
                                        <div>
                                            <div>{forecast.condition.text}</div>
                                            <div>{forecast.maxTemp}</div>
                                            <div>{forecast.minTemp}</div>
                                        </div>
                                    </Paper>
                                </Grid>
                            ))}     
                         </Grid>     
                    </div>
                </div>                        
        );
    }
}

export default withStyles(styles)(App);
