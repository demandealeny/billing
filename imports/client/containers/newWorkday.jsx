import React from 'react';
import { connect } from 'react-redux';
import { $ } from 'meteor/jquery';
import { moment } from 'meteor/momentjs:moment';

import {
  addWorkday,
  changeWorkload,
  changeDate,
  resetNewWorkday
} from '../actions';

import Workday from '../components/workday';

class NewWorkdayContainer extends React.Component {

  events() {
    return {
      addWorkday: (evt) => {
        this.props.dispatch(addWorkday(this.props));
        this.props.dispatch(resetNewWorkday());
      },
      chooseDate: (evt) => {
        const $panel = $(evt.currentTarget);

        $panel.find('.js-input').datepicker({
          orientation: "bottom left",
          autoclose: true
        }).on('changeDate', (e) => {
          this.props.dispatch(changeDate(e.date.getTime()));
        });
        $panel.find('.js-input').focus();
      },
      upWorkload: () => {
        const workload = this.props.workload + 0.1;

        this.props.dispatch(changeWorkload(workload));
      },
      downWorkload: () => {
        const workload = this.props.workload - 0.1;

        this.props.dispatch(changeWorkload(workload));
      }
    };
  }

  render() {
    return <Workday
      {...this.props}
      style='new-workday'
      workdate={this.props.readable_workdate}
      {...this.events()}
      />
  }
};

export default connect()(NewWorkdayContainer);
