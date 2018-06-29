// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Calendar.css';
import { observer } from 'mobx-react';

type Props = {};

class Calendar extends Component<Props> {
  props: Props;

  render() {
    console.log(this.props)
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Calendar</h2>
          {this.props.scheduleStore.schedules ? this.props.scheduleStore.schedules : ''}
          <Link to="/">to Home</Link>
        </div>
      </div>
    );
  }
}

export default observer(Calendar);