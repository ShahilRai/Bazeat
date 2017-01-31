import React from 'react';
import { render } from 'react-dom';
import ShowProductsSearch from './ShowProductsSearch';
import ShowBazeatersSearch from './ShowBazeatersSearch';
import ShowLocationSearch from './ShowLocationSearch';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PubSub from 'pubsub-js';

export default class DisplaySearch extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedTab: 0
    }
    this._handleSelect = this._handleSelect.bind(this)
  }

  _handleSelect = (index) => {
    this.setState({
      selectedTab: index
    });
  }

  render() {
    PubSub.publish( 'selectedTab', this.state.selectedTab );
    var pName = this.props.location ? this.props.location.query.search : '';
    return (
      <div className="full_width_container">
        <Tabs onSelect={this._handleSelect} className ="custom_tab">
          <TabList>
            <Tab>Products</Tab>
            <Tab>Bazeaters</Tab>
            <Tab>Location</Tab>
          </TabList>
          <TabPanel>
            <ShowProductsSearch pName={pName}/>
          </TabPanel>
          <TabPanel>
            <ShowBazeatersSearch />
          </TabPanel>
          <TabPanel>
            <ShowLocationSearch />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
