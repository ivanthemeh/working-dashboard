import React, { Component } from "react";
import DateTimePicker from 'material-ui-pickers/DateTimePicker';
import { IconButton, Icon, Grid, Paper } from 'material-ui';
import { SchemaForm } from 'material-ui-schema-form';
import { withStyles } from "material-ui";
import PropTypes from 'proptypes';


const form = [
  "name",
  "email",
  "textWithDefault",
  "textNoDefault",
  "staticDropdown",
  {
    "key": "textArea",
    "type": "textarea",
    "placeholder": "Make a comment"
  },
  {
    "key": "helpMessage",
    "type": "help"
  },
  {
    "key": "checkbox",
    "type": "toggleswitch"
  },
  {
    "key": "date",
    "type": "date"
  },
  {
    "key": "radios",
    "type": "radios",
    "titleMap": [{
        "value": "c",
        "name": "C"
      },
      {
        "value": "b",
        "name": "B"
      },
      {
        "value": "a",
        "name": "A"
      }
    ]
  }
]

const schema = {
  "type": "object",
  "title": "Kitchen Sink test Schema Form",
  "properties": {
    "textWithDefault": {
      "title": "Text with default",
      "type": "string",
      "default": "Default Value"
    },
    "textNoDefault": {
      "title": "Text no default",
      "type": "string"
    },
    "email": {
      "title": "Email - Text With Regex and Description",
      "type": "string",
      "pattern": "^\\\\S+@\\\\S+$",
      "description": "General regex for email."
    },
    "staticDropdown": {
      "type": "string",
      "title": "Static Dropdown",
      "enum": [
        "LOCAL",
        "SIT1",
        "SIT2",
        "SIT3",
        "UAT1",
        "UAT2"
      ]
    },
    "textArea": {
      "title": "Text Area with Validation Message",
      "type": "string",
      "maxLength": 20,
      "validationMessage": "Don't be greedy!",
      "description": "Please write your comment here."
    },
    "helpMessage": {
      "title": "Help Message",
      "type": "string",
      "description": "This is the help value"
    },
    "checkbox": {
      "title": "Checkbox",
      "type": "boolean"
    },
    "date": {
      "title": "Date",
      "type": "date"
    },
    "name": {
      "title": "Name",
      "type": "string",
      "minLength": 3
    },
    "radios": {
      "title": "Basic radio button example",
      "type": "string",
      "enum": [
        "a",
        "b",
        "c"
      ]
    }
  },
  "required": [
    "name",
    "email"
  ]
}

const model = {
  "checkbox": true
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
});

class ScheduleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedDate: new Date(),
        }
    }
    handleDateChange = (date) => {
      this.setState({
        selectedDate: date
      });
    }
    render() {
      const { classes } = this.props;
        return (
            <div className={classes.root}>
              <Grid container spacing={12}>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <DateTimePicker
                        label="Start Date/Time"
                        value={this.state.selectedDate}
                        onChange={this.handleDateChange}
                      />
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <DateTimePicker
                      label="End Date/Time"
                      value={this.state.selectedDate}
                      onChange={this.handleDateChange}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <SchemaForm schema={schema} form={form} model={model} onModelChange={this.props.onModelChange}></SchemaForm>
                  </Paper>
                </Grid>
              </Grid>
            </div>
        );
    }
  }

ScheduleForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScheduleForm);
