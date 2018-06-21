import React, { Component } from "react";
import { getRequests } from "./Api";
import Filter from "./filter";
import Table from "./table";
class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      search: "",
      status: ""
    };
    this.filterData = this.filterData.bind(this);
    this.delete = this.delete.bind(this);
    this.showStatus = this.showStatus.bind(this);
  }
  componentWillMount() {
    getRequests().then(resp =>
      this.setState({
        userData: resp
      })
    );
  }

  showStatus(event, obj, id) {
    let temp = this.state.userData;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].title === obj.title) {
        temp[i].status = event.target.value;
        temp[i].updated_at = new Date();
        this.setState({
          userData: temp
        });
        document.getElementById(
          "select_status" + id
        ).hidden = !document.getElementById("select_status" + id).hidden;
      }
    }
  }

  delete(event, id) {
    var update = this.state.userData;
    for (let i = 0; i < update.length; i++) {
      if (update[i].id === id) {
        update.splice(i, 1);
      }
    }
    this.setState({
      userData: update
    });
  }

  filterData(event) {
    if (event.target.value === "All") {
      this.setState({
        search: ""
      });
    } else {
      this.setState({
        search: event.target.value
      });
    }
  }

  checkStatus(event, id, status) {
    if (status === "Pending") {
      document.getElementById(
        "select_status" + id
      ).hidden = !document.getElementById("select_status" + id).hidden;
    }
  }
  render() {
    let contacts = this.state.userData;
    contacts = contacts.filter(resp => {
      return resp.status.indexOf(this.state.search) !== -1;
    });
    contacts = contacts.sort((resp1, resp2) => {
      let temp1 = new Date(resp1.updated_at);
      let temp2 = new Date(resp2.updated_at);

      return temp2 - temp1;
    });
    function sortByDate(date) {
      let temp = new Date(date);
      return (
        temp.getFullYear() +
        "-" +
        ("0" + (temp.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + temp.getDate()).slice(-2)
      );
    }
    function color(status) {
      if (status === "Approved") {
        return { backgroundColor: "rgba(99, 255, 71, 0.4)" };
      } else if (status === "Denied") {
        return { backgroundColor: "rgba(255, 99, 71, 0.5)" };
      }
    }
    return (
      <div>
        <h2>Requests</h2>
        <Filter change={this.filterData} />

        <Table
          contacts={contacts}
          color={color}
          sortByDate={sortByDate}
          checkStatus={this.checkStatus}
          delete={this.delete}
          showStatus={this.showStatus}
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
          integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
          crossOrigin="anonymous"
        />
      </div>
    );
  }
}

export default Requests;
