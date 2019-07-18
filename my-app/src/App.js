import React ,{Component} from 'react'
import {Route} from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import './index.css';
import * as ContactsAPI from './ContactsAPI'

class App extends Component{
  state={
    contacts : []
  }
  componentDidMount(){
    ContactsAPI.getAll().then((contacts)=>{
      this.setState({contacts})
    })
  }
  removeContact =(contact)=>{
    this.setState((state)=>({
      contacts:state.contacts.filter((c)=>c.id !== contact.id)

    }))
    ContactsAPI.remove(contact)
  }
  CreateContact (contact){
    ContactsAPI.create(contact).then(contact=>{
      this.setState(state=>({
      contacts:state.contacts.concat([contact])
      }))
    })
  }
    render(){
        return (
            <div>
              <Route path  ="/" exact render={()=>(
               <ListContacts 
                 onDeleteContact={this.removeContact} 
                contacts={this.state.contacts}
                     /> 
              )}/>
              <Route path="/create" render={({history})=>(
                      <CreateContact 
                     onCreateContact={(contact)=>{
                     this.CreateContact(contact)
                     history.push('/')
                     }} 
                     />
              )}/>
                 
            </div>
        )
    }
}
export default App;