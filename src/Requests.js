import React, { Component } from "react";
import { getRequests } from "./Api";

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      search: "",
      show_it: false,
      status: ""
    };
    // console.log(this.state.userData);
    this.change = this.change.bind(this);
    this.delete = this.delete.bind(this);
    this.changestatus = this.changestatus.bind(this);
    this.show_status = this.show_status.bind(this);
  }
  componentWillMount() {
    getRequests().then(resp => {
      this.setState({
        userData: resp
      });
      // console.log(this.state.userData);
    });
  }
  show_status(e, obj, num) {
    //console.log(e.target.value,obj.title);
    var temp = this.state.userData;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].title == obj.title) {
        temp[i].status = e.target.value;
        temp[i].updated_at = new Date();
        this.setState({
          userData: temp
        });
        document.getElementById(
          "select_status" + num
        ).hidden = !document.getElementById("select_status" + num).hidden;
      }
    }
  }
  delete(e, num) {
    var update = this.state.userData;
    for (let i = 0; i < update.length; i++) {
      if (update[i].id == num) {
        update.splice(i, 1);
      }
    }
    this.setState({
      userData: update
    });
  }
  change(e) {
    if (e.target.value == "All") {
      this.setState({
        search: ""
      });
    } else {
      this.setState({
        search: e.target.value
      });
    }
  }
  changestatus(event, index) {
    // if ())
    if (event.target.className.slice(-1) == index) {
      this.setState({ status: index });
    }

    //event.target = "<h1>hello</h1>";
  }
  checkStatus(e, num, status) {
    // let statusData = e.target.className;
    if (status == "Pending") {
      document.getElementById(
        "select_status" + num
      ).hidden = !document.getElementById("select_status" + num).hidden;
    }
    // console.log('select_status' + num);
  }
  render() {
    let search = "";
    let contacts = this.state.userData;
    contacts = contacts.filter(resp => {
      return resp.status.indexOf(this.state.search) !== -1;
    });
    contacts = contacts.sort((resp1, resp2) => {
      var temp1 = new Date(resp1.updated_at);
      var temp2 = new Date(resp2.updated_at);

      return temp2 - temp1;
    });
    function sort_created(dt) {
      var temp = new Date(dt);
      return (
        temp.getFullYear() +
        "-" +
        ("0" + (temp.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + temp.getDate()).slice(-2)
      );
    }
    function color(status) {
      if (status == "Approved") {
        return { backgroundColor: "lightgreen" };
      } else if (status == "Denied") {
        return { backgroundColor: "red" };
      }
    }
    function demo(e) {
      return { display: "none" };
    }
    // var show_it=false;
    return (
      <div>
        <h1 className="form-control">
          Filter By Status:<select
            className="form-control"
            onChange={this.change}
          >
            <option value="All">All</option>
            <option value="Approved">Approved</option>
            <option value="Denied">Denied</option>
            <option value="Pending">Pending</option>
          </select>
        </h1>

        <table className="table hover">
          <th>Title</th>
          <th>Status</th>
          <th>Created</th>
          <th>Updated</th>

          <th>Delete</th>
          {contacts.map((obj, index) => {
            return (
              <tbody key={index}>
                <tr style={color(obj.status)}>
                  <td>{obj.title}</td>
                  <td className="hello">
                    <p onClick={e => this.checkStatus(e, index, obj.status)}>
                      {" "}
                      {obj.status}
                    </p>
                    <select
                      onChange={e => this.show_status(e, obj, index)}
                      id={"select_status" + index}
                      hidden
                    >
                      <option value="" />
                      <option value="Approved">Approved</option>
                      <option value="Denied">Denied</option>
                    </select>
                  </td>

                  <td>{sort_created(obj.created_at)}</td>
                  <td>{sort_created(obj.updated_at)}</td>
                  <td>
                    <a onClick={e => this.delete(e, obj.id)}>Delete</a>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
          integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
          crossorigin="anonymous"
        />
      </div>
    );
  }
}

export default Requests;
