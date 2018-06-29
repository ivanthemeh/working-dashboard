import React, { Component } from "react";
import DateTimePicker from 'material-ui-pickers/DateTimePicker';
import { IconButton, Icon, InputAdornment } from '@material-ui/core';

const form = [
    "textWithDefault",
    "textNoDefault",
    "textWithRegex",
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
    "type": "checkbox"
    },
    {
    "key": "date",
    "type": "date"
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
    "textWithRegex": {
      "title": "Text With Regex and Description",
      "type": "string",
      "pattern": "^\\S+@\\S+$",
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
    }
  },
  "required": [
    "name",
    "email",
    "comment"
  ]
}

const model = {
  "staticDropdown": "SIT2",
  "checkbox": true,
  "textWithDefault": "testies ",
  "textNoDefault": "testies",
  "textWithRegex": "me@me.com"
}

export default class ScheduleForm extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //   title: 'New Schedule In state',
        //   startDate: new Date(),
        //   endDate: new Date(),
        //   selectedEvent: this.props.selectedEvent ? this.props.selectedEvent.toJSON() : null
        // };
        this.state = {
          selectedDate: new Date(),
        }
    }
    handleDateChange = (date) => {
      this.setState({
        selectedDate: date
      });
    }
    // handleDateChange = (name, date) => {
    //     this.setState({
    //     [name]: new Date(date),
    //     });
    //     console.log(this.state);
    // };
    // onChange = (name, value) => {
    //     console.log(...name);    
    //     console.log(value)
    // }
    render() {
        return (
            <div>
                <DateTimePicker
                    value={this.state.selectedDate}
                    onChange={this.handleDateChange} />
            </div>
        );
    }
}


{/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                <SchemaForm schema={schema} form={form} model={model} onModelChange={(name,value) => this.onChange(name,value)}></SchemaForm> */}