import _ from 'lodash';
import React, { PureComponent } from "react";
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

const menu = [
    {
        'id': '1',
        'description': 'One Day'
    },
    {
        'id': '2',
        'description': 'Two Day'       
    },
    {
        'id': '3',
        'description': 'Three Day'       
    },
    {
        'id': '4',
        'description': 'Four Day'       
    },
    {
        'id': '5',
        'description': 'Five Day'       
    },
]

class Forecast extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            count: '1',
            error: '',
            forecast: 'One Day'
         };
    }


    
    /**
     *  Called whenever location is changed
     */
    handleChange = (e) => {
        console.log('Forecats:', e.target.value)
        this.setState({
            forecast: e.target.value,
            count:  e.currentTarget.id
        })
    }

    render() {
        const { classes, forecasts, description } = this.props;

        console.log('Count:', this.state.count)
        console.log('forecasts:', forecasts)
        let filteredForecast = [];
        if (forecasts) {
            console.log('test')
            filteredForecast = forecasts.filter((forecast, i) => {
                return i < this.state.count;
            });
        }    

        console.log(filteredForecast);

        return (
            <div>
                <div className="App">
                    <div>
                        {description &&
                            <FormControl className={classes.formControl}>
                                <InputLabel id="select-label">Forecast</InputLabel>
                                <Select className={classes.selectBox}
                                    labelId="select-label"
                                    margin="dense"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    defaultValue='Forecast'
                                    value={this.state.forecast}
                                >
                                {_.map(menu, option => (
                                    <MenuItem
                                        id={option.id}
                                        value={option.description}
                                    >
                                        {option.description}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>  
                        }  
                    </div> 
                    <Grid container 
                        spacing={1} 
                        justify="center"
                        alignItems="center"
                        >
                        {_.map(filteredForecast, (forecast, index) => (
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

export default withStyles(styles)(Forecast);