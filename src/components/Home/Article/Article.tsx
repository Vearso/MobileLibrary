import React from 'react';

import './Article.scss'

const Article = (props :any) => {
    return (
        <article className="page__article">
            <img alt='About app' src={props.src} className="article__img"/>
            <h3 className="article__title">{props.title}</h3>
            <p className="article__text">{props.children}</p>
        </article>
    )
}

export default Article;