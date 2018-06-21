import React, { Component } from "react";
class Filter extends Component {
  render() {
    this.change = this.props.change;
    return (
      <div style={{ padding: "30px", backgroundColor: "lightGrey" }}>
        <span>Filter By Status: </span>
        <select
          style={{ width: "200px", marginLeft: "20px" }}
          onChange={this.change}
        >
          <option value="All">All</option>
          <option value="Approved">Approved</option>
          <option value="Denied">Denied</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
    );
  }
}
export default Filter;
