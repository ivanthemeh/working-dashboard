import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import swal from 'sweetAlert2';
import { observer } from 'mobx-react';
// import NewScheduleForm from './NewScheduleForm';
import ScheduleForm from './ScheduleForm';

import logo from "./logo.svg";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

const DnDCalendar = withDragAndDrop(Calendar);

class IconCalendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: []
    }
    this.moveEvent = this.moveEvent.bind(this);
  }

  moveEvent = ({ event, start, end }) => {
    // const events = this.props.scheduleStore.allSchedules;
    // const idx = events.indexOf(event);
    // const updatedEvent = { ...event, start, end };
    // const nextEvents = [...events];
    // nextEvents.splice(idx, 1, updatedEvent);
    // // console.log(`${event.title} was dropped onto ${event.start}`);
    // swal({
    //   type: 'warning',
    //   title: 'Moving Event..',
    //   html: `${event.title} was dropped onto ${event.start}`,
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, move it!',
    // }).then((result) => {
    //   if (result.value) {
    //     swal({
    //       title: 'Moved!',
    //       text: 'Your event has been updated.',
    //       type:'success',
    //       showConfirmButton: false,
    //       timer: 2000
    //     })
    //     this.setState({
    //       events: nextEvents,
    //     })
    //   }
    // });
  }

  onEventResize = (type, { event, start, end, allDay }) => {
    this.setState(state => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
  };

  onEventDrop = ({ event, start, end, allDay }) => {
  };

  handleEventClick = (event) => {
    console.log(event);
    swal({
      type: 'success',
      title: 'Schedule Event Selected',
      html: `<div style='text-align: left;margin: 20px 0;padding: 40px;background: #f5f5f5;'>
      ID: ${event.id}<br/>
      TITLE: ${event.title}<br/>
      START: ${moment(event.start).format('LLL')}<br/>
      END: ${moment(event.end).format('LLL')}<br/>
      ASSIGNED TO: ${event.assignee}<br/>
      DONE: ${event.done}</div>`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Edit',
    }).then((result) => {
      if (result.value) {
        this.setState({
          selectedEvent: event
        })
        document.getElementById('newScheduleForm').classList.add("openForm");
      }
    });
  }

  handleDayClick = (day) => {
    this.setState({
      selectedDays: day.slots
    })
    let clicked = day.action === 'click';
    swal({
      type: 'success',
      title: 'Create an Event..',
      html: `Fill in the form fields to create an event ${clicked ? "on<br/> <strong>" + moment(day.start).format('LL') + "</strong>" : "from<br/> <strong>" +
        moment(day.start).format('LL') + "</strong> to <strong>" + moment(day.end).format('LL') + "</strong>" }`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Create!',
    }).then((result) => {
      if (result.value) {
        document.getElementById('newScheduleForm').classList.add("openForm");
        console.log('clicked ok');
      }
    });
  }

  onView = () => {
    console.log("clicked");
  }

  render() {
    return (
      <div style={{height: '100vh', background: '#fff', color: '#000', position: 'relative', overflow: 'hidden'}}>
        {
          this.props.scheduleStore.allSchedules && (
            <div>
              <ScheduleForm/>
            </div>
          )
        }
      </div>
    );
  }
}


// TODO: work on changing material ui version and fix bugs 
{/*
  <NewScheduleForm/>
  <DnDCalendar
  selectable
  defaultDate={new Date()}
  defaultView="month"
  events={this.props.scheduleStore.allSchedules}
  onEventDrop={this.moveEvent}
  onEventResize={this.onEventResize}
  onSelectSlot={(day) => { this.handleDayClick(day) }}
  onSelectEvent={(event) => { this.handleEventClick(event) }}
  resizable
  popup events={this.props.scheduleStore.allSchedules}
  style={{ height: "100vh" }}
  components={{ toolbar: CustomToolbar }}
/> */}

class CustomToolbar extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div className='rbc-toolbar'>
        <span className="rbc-btn-group">
          <button type="button" onClick={() => this.navigate('TODAY')} >today</button>
          <button type="button" onClick={() => this.navigate('PREV')}>back</button>
          <button type="button" onClick={() => this.navigate('NEXT')}>next</button>
        </span>
        <span className="rbc-toolbar-label">{this.props.label}</span>
        <div className="pull-right">
          <button type="button" onClick={(e) => this.changeView('month')}>Month</button>
          <button type="button" onClick={(e) => this.changeView('week')}>Week</button>
          <button type="button" onClick={(e) => this.changeView('day')}>Day</button>
          <button type="button" onClick={(e) => this.changeView('agenda')}>Agenda</button>
        </div>
      </div>
    );
  }

  navigate = action => {
    console.log(action);
    this.props.onNavigate(action)
  }

  changeView = view => {
    console.log(view);
    this.props.onViewChange(view)
  }
}

export default observer(IconCalendar);
