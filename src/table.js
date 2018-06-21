import React, { Component } from "react";
class Table extends Component {
  render() {
    let { contacts } = this.props;
    return (
      <div>
        <table className="table hover">
          <tbody>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Delete</th>
            </tr>
            {contacts.map((obj, index) => {
              return (
                <tr key={index} style={this.props.color(obj.status)}>
                  <td>{obj.title}</td>
                  <td className="hello">
                    <p
                      onClick={event =>
                        this.props.checkStatus(event, index, obj.status)
                      }
                    >
                      {obj.status}
                    </p>
                    <select
                      onChange={event =>
                        this.props.showStatus(event, obj, index)
                      }
                      id={"select_status" + index}
                      hidden
                    >
                      <option value="" />
                      <option value="Approved">Approved</option>
                      <option value="Denied">Denied</option>
                    </select>
                  </td>

                  <td>{this.props.sortByDate(obj.created_at)}</td>
                  <td>{this.props.sortByDate(obj.updated_at)}</td>
                  <td>
                    <a onClick={event => this.props.delete(event, obj.id)}>
                      Delete
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Table;
