import React ,{Component}from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
class ListContacts extends Component{
    static propTypes={
        contacts:PropTypes.array.isRequired,
        onDeleteContact:PropTypes.func.isRequired
    }
   state={
    query:''
   }
   updateQuery =(query)=>{
    this.setState({query:query.trim()})
   }
   clearQuery  =()=>{
      this.setState({query:''})
   }
   
render(){
    const{contacts,onDeleteContact}=this.props
    const{query}=this.state
    let showingContacts
    if(query){
     const match= new RegExp(escapeRegExp(this.state.query),'i')
     showingContacts =contacts.filter((contact)=>match.test(contact.name))
    }
    else{
        showingContacts =this.props.contacts
    }
    showingContacts.sort(sortBy('name'))
    //console.log('props',this.props);
    return(
        <div className='list-contacts'>
            <div className='list-contacts-top'>
                <input className='search-contacts'
                type='text'
                placeholder='search  contacts'
                value={this.state.query}
                onChange={(event)=> this.updateQuery(event.target.value)}></input>
                <Link
                to="/create"
               // onClick={this.props.onNavigate}
                className="add-contact">Add Contact</Link>
            </div>

            {showingContacts.length !== contacts.length && (
                <div className='showing-contacts'>
                    <span>Now showing{showingContacts.length} of {contacts.length} total</span>
                    <button onClick= {this.clearQuery}>Show all</button>
                </div>
            )}
         <ol className='contact-list'>
              {
              showingContacts.map((contact) =>(
              <li key ={contact.id} className='contact-list-item'>
               <div className='contact-avatar' style={{
                backgroundImage:`url(${contact.avatarURL})`
               }} />
               <div className="contact-details">
                   <p>{contact.name}</p>
                   <p>{contact.email}</p>
               </div>
               <button onClick={()=>this.props.onDeleteContacts(contact)} className='contact-remove'>Remove</button>
           </li>
            ))}
        </ol>

     </div>
       
    )
}

}

export default ListContacts


