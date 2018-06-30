// @flow
import * as React from 'react';
import Navigation from '../components/Navigation/Navigation';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';

const theme = createMuiTheme();
// This is where I can change the theme
theme.palette.primary.main = '#000';
theme.shape = {};
theme.shape.borderRadius = '0px';
console.log(theme);


type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <div>
            <Navigation />
            {this.props.children}
          </div>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}
