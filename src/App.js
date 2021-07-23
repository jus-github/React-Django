import React, { Component } from 'react'
import Plan from './Plan'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

const ai =axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
})

class App extends Component {
  state = {
    items: [],
    text: ""
  }
  showplan = ()=>{
    ai.get('/planlist/')
    // axios.get("http://127.0.0.1:8000/planlist/")
    .then((response)=>{
      // console.log(response.data)
      this.setState({items : response.data})
    })
  }

  addplan=(d)=>{
    if (this.state.text !== "") {
      
    ai.post('/create/',d)
    
    // axios.post("http://127.0.0.1:8000/create/",d)
.then((res)=>{
  this.setState({'text' :''})
  this.showplan()
})    }

  }
  handleChange = e => {
    this.setState({ text: e.target.value })
  }
  handleAdd = e => {
    let dta = {item:this.state.text}
    this.addplan(dta)
  }
  handleDelete = id => {
    console.log("Deleted", id);
    // axios.delete(`http://127.0.0.1:8000/delete/${id}`)
    ai.delete(`/delete/${id}`)
  .then((response)=>{this.showplan()})
  }
  componentDidMount()
  {
    this.showplan()
  }
  render() {
    return (
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-sm-6 mx-auto text-white shadow-lg p-3">
            <h2 className="text-center"> Today's Plan </h2>
            <div className="container-fluid">
              <div className="row">
                <div className="col-9">
                  <input type="text" className="form-control" placeholder="Write Plan Here" value={this.state.text} onChange={this.handleChange} />
                </div>
                <div className="col-2">
                  <button className="btn btn-warning px-5 font-weight-bold" onClick={this.handleAdd}>Add</button>
                </div>
              </div>
              <div className="conatiner">
                <ul className="list-unstyled row m-5">
               { console.log("State Item : " +this.state.items)}
              
                  {
                    this.state.items.map((value, i) => {
                       console.log("ID ", value.id, " Item : " +value.item)
               
                      return <Plan key={i} id={value.id} value={value.item} sendData={this.handleDelete} />
                    })
                  }
                </ul>
                {/* <ul className="list-unstyled row m-5">
                  <Plan p={this.state.items} sendData={this.handleDelete} />
                </ul> */}
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
export default App;