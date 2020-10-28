import React from "react";
import './Preview.scss';
import ReactSwipe from "react-swipe";
import Article from "../Article/Article";

const Preview = () => {
    return (
        <section id='examples' className="page__preview">
            <h2 className="preview__title">Preview of application</h2>
            <ReactSwipe swipeOptions={{continuous: true}}>
                <div><Article src='bannerS1.jpg' title='First example'>Some text</Article></div>
                <div><Article src='bannerS2.jpg' title='2 example'>Some text</Article></div>
                <div><Article src='bannerS3.jpg' title='3 example'>Some text</Article></div>
                <div><Article src='bannerS4.jpg' title='4 example'>Some text</Article></div>
                <div><Article src='bannerM1.jpg' title='5 example'>Some text</Article></div>
            </ReactSwipe>
        </section>
    )
}
export default Preview;