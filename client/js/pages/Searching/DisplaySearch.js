import React from 'react';
import { render } from 'react-dom';
import ShowProductsSearch from './ShowProductsSearch';
import ShowBazeatersSearch from './ShowBazeatersSearch';
import ShowLocationSearch from './ShowLocationSearch';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class DisplaySearch extends React.Component {

  render() {
    var pName = this.props.location ? this.props.location.query.search : '';
    return (
      <div className="full_width_container">
        <Tabs selectedIndex={0}>
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
