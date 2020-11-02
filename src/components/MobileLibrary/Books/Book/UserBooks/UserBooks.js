import React, {useState, useEffect, Component} from 'react';
import './UserBooks.scss';
import {withFirebase} from "../../../User/Account/Firebase";

class UserBooks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: this.props.firebase.auth.currentUser.uid,
            user: [],
            notRead: [],
            read: [],
        }
    }

    componentDidMount() {
        this.props.firebase.user(this.state.userID).on('value', snapshot => {
            const userObject = snapshot.val();
            this.setState({user: {...userObject}})
        })
        let tempArray = this.state.user.books.filter(book => book.read === false);
        this.setState({notRead: [...tempArray]});

        tempArray = this.state.user.books.filter(book => book.read === true);
        this.setState({read: [...tempArray]});
    }

    componentWillUnmount() {
        this.updateFirebase();
        this.props.firebase.user(this.state.userID).off();
    }

    updateFirebase = () => {
        this.props.firebase.user(this.state.userID).update({
                ...this.state.user
            }
        ).catch(err => console.warn(err))
    }
    deleteBook = (id) => {
        const tempArray = this.state.user.books.map(book => book.id !== id);
        this.setState({user: {...this.state.user,books: [...tempArray]}})
    }
    addToFavorites = (id) => {
        for(let book of this.state.user.books) {
            if(book.id === id){
                book.favorite = true;
            }
        }
    }
    addToQueue = (id) => {
        for(let book of this.state.user.books) {
            if(book.id === id){
                this.setState({user:{...this.state.user,queue:[...this.state.user.queue,book]}})
            }
        }

    }

    render() {


        return (
            <>

            </>
        )
    }
}

export default withFirebase(UserBooks);