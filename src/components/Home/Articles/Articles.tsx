import React from "react";
import ReactSwipe from 'react-swipe';
import Article from "../Article/Article";
import './Articles.scss'

const Articles = () => {
    const theme = window.localStorage.getItem('theme')
    return (
        <section className={theme === 'dark' ? "page__articles articles--dark":"page__articles"}>
            <h2 className="articles__title">More about app</h2>
            <ReactSwipe className="carousel" swipeOptions={{continuous: true}}>
                <div><Article src='bannerS1.jpg' title='First Article'>Some text</Article></div>
                <div><Article src='bannerS2.jpg' title="Second Article">Some text</Article></div>
                <div><Article src='bannerS3.jpg' title="Third Article">Some text</Article></div>
            </ReactSwipe>
        </section>
    )
}
export default Articles;