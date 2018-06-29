import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import TimePicker from 'material-ui-pickers/TimePicker';
import DatePicker from 'material-ui-pickers/DatePicker';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';
import { IconButton, Icon, InputAdornment } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    innerGrid: {
      paddingBottom: '0 !important'
    },
    newScheduleForm: {
      position: 'absolute',
      width: '100%',
      bottom: '-60%',
      minHeight: '500px',
      background: '#fff',
      zIndex: '99',
      left: '11px',
      transition: 'bottom .5s cubic-bezier(.175,.885,.335,1.05)',
      boxShadow: '0px 0px 24px #c1c1c1'
    }
});

const assignees = [{
    value: 'justin',
    label: 'Justin',
  },
  {
    value: 'stevejr',
    label: 'SteveJR',
  },
  {
    value: 'eddy',
    label: 'Eddy',
  }
];

class NewScheduleForm extends React.Component {
    state = {
        title: 'New Schedule In state',
        startDate: new Date(),
        endDate: new Date(),
        selectedEvent: this.props.selectedEvent ? this.props.selectedEvent.toJSON() : null
    };

    componentWillReceiveProps = (nextProps) => {
      console.log(nextProps);
      if (nextProps.selectedDays) {
        this.setState({
          selectedEvent: null,
          startDate: nextProps.selectedDays[0],
          endDate:  nextProps.selectedDays.length > 1 ? nextProps.selectedDays[nextProps.selectedDays.length - 1] : nextProps.selectedDays[0]
        });
      }
      if (nextProps.selectedEvent) {
        this.setState({
          selectedEvent: nextProps.selectedEvent
        });
      }
    }

    handleDateChange = (name, date) => {
      this.setState({
          [name]: new Date(date),
      });
      console.log(this.state);
    };

    handleChange = name => event => {
      // const selectedEvent = this.state.selectedEvent;
      // selectedEvent.updateField(name, event.target.value);
      // console.log(selectedEvent)

      // // update state
      // this.setState({
      //   selectedEvent
      // });


      if (!this.state.selectedEvent) {
        this.setState({
          [name]: event.target.value,
        });
      } else {
        this.state.selectedEvent.updateField(name, event.target.value)
        this.setState({
          selectedEvent: this.state.selectedEvent
        })
      }
    };

    handleSubmit = () => {
      console.log(this.props);
      console.log(this.state);
      // this.props.stores['schedules'].addSchedule(schedule);
    }

    render() {
        const { classes } = this.props;

        return (
          <Grid container spacing={24} id="newScheduleForm" className={classes.newScheduleForm}>
            <Grid item xs={12} className={classes.innerGrid}>
              <Paper className={classes.paper}>
                <IconButton className="pull-right" onClick={() => {document.getElementById('newScheduleForm').classList.remove('openForm')}}><Icon className="pull-right">close</Icon></IconButton>
                <form className={classes.container} noValidate autoComplete="off" style={{background: '#fff'}}>
                  <TextField
                    id="title"
                    label="Title"
                    className={classes.textField}
                    value={this.props.selectedEvent ? this.props.selectedEvent.title : this.state.title}
                    onChange={this.handleChange('title')}
                    margin="normal"
                  />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                      id="startDate"
                      label="Start Date and Time:"
                      value={this.state.startDate}
                      onChange={(date) => this.handleDateChange("startDate", date)}
                      style={{marginTop: '16px'}}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <IconButton>
                              <Icon>calendar_today</Icon>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <DateTimePicker
                      id="endDate"
                      label="End Date and Time:"
                      value={this.state.endDate}
                      onChange={(date) => this.handleDateChange("endDate", date)}
                      style={{marginTop: '16px'}}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <IconButton>
                              <Icon>calendar_today</Icon>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <TextField
                      id="select-assignee"
                      select
                      label="Select"
                      className={classes.textField}
                      value={this.state.assignee}
                      onChange={this.handleChange('assignee')}
                      SelectProps={{
                          MenuProps: {
                              className: classes.menu,
                          },
                      }}
                      helperText="Select Assignee"
                      margin="normal"
                  >
                      {assignees.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                              {option.label}
                          </MenuItem>
                      ))}
                  </TextField>
                  <TextField
                    id="description"
                    label="Description"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    placeholder="Enter Description"
                    fullWidth
                    margin="normal"
                  />
                  <Button onClick={() => this.handleSubmit()} variant="contained" color="primary">
                    Add Schedule
                  </Button>
                </form>
              </Paper>
            </Grid>
          </Grid>
        );
    }
}

NewScheduleForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewScheduleForm);


