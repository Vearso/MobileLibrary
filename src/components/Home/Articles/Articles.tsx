import React from "react";
import ReactSwipe from 'react-swipe';
import Article from "./Article/Article";
import './Articles.scss'

const Articles = () => {
    return (
        <section className="page__articles">
            <ReactSwipe className="carousel" swipeOptions={{continuous: true}}>
                <div><Article title='First Article'/></div>
                <div><Article title="Second Article"/></div>
                <div><Article title="Third Article"/></div>
            </ReactSwipe>
        </section>
    )
}
export default Articles;