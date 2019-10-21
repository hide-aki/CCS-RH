import { Component } from 'react';
//import Rect, { Component } from 'react';
import withAuth from '../services/withAuth';



class Dashboard extends Component {



  render() {



    return (

        this.props.user.campania  === 2 || this.props.user.su === 1
          ? null
          : null

    )};
  
}

export default withAuth(Dashboard);