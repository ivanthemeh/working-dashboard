// @flow
import React, { Component } from 'react';
import Home from '../components/Home';
import { ENOTCONN } from 'constants';

// TODO: work on this later setup an ad on home to test etc....
// import ActiveDirectory from 'activedirectory';

// import LdapStrategy from 'passport-ldapauth';
// import passport from 'passport';
// var OPTS = {
//   server: {
//     url: 'ldap://localhost:389',
//     bindDN: 'cn=root',
//     bindCredentials: 'secret',
//     searchBase: 'ou=passport-ldapauth',
//     searchFilter: '(uid={{username}})'
//   }
// };
// passport.use(new LdapStrategy(OPTS));


// let config = { 
//   url: 'ldap://192.168.5.2:389',
//   baseDN: 'CN=IconCS Application,CN=Users,DC=ICONCS,DC=local',
//   username: 'Test',
//   password: 'T3st.2018' 
// }

// let ad = new ActiveDirectory(config);

// let username = 'IMarik';
// let password = '2018.M@rik';

// setTimeout(() => {
//   ad.authenticate(username, password, function(err, auth) {
//     if (err) {
//       console.log('ERROR: '+JSON.stringify(err, null, 2));
//       return;
//     }
    
//     if (auth) {
//       console.log('Authenticated!');
//     }
//     else {
//       console.log('Authentication failed!');
//     }
//   });
// },5000)

// console.log(ad);





type Props = {};

export default class HomePage extends Component<Props> {
  props: Props;

  render() {
    return <Home />;
  }
} 
 
