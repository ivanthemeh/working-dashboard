import React, { Component } from 'react';
// import Calendar from '../components/Calendar';
import scheduleStore from '../store/scheduleStore';
import IconCalendar from '../components/BigCalendar/BigCalendar';

type Props = {};

class CalendarPage extends Component<Props> {
  props: Props;

  render() {
    return (
      <div style={{position: 'relative'}}>
        <IconCalendar scheduleStore={scheduleStore} />
      </div>
    );
  }
}

export default CalendarPage;