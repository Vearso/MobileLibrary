import React from 'react';

import './Article.scss'

const Article = (props :any) => {
    return (
        <article className="page__article">
            <img alt='About app' src='bannerS1.jpg' className="article__img"/>
            <h3 className="article__title">{props.title}</h3>
            <p className="article__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias fugit mollitia quas quibusdam sit! Alias fugit id libero quo velit? Cumque delectus dolorem doloremque dolorum in ipsum laboriosam laborum necessitatibus, nobis odio odit officiis optio perferendis porro quae quibusdam recusandae repudiandae vero voluptate voluptatibus. Accusamus aliquam aliquid atque consequuntur cupiditate deleniti distinctio dolor doloribus eaque error esse exercitationem harum id ipsum iste iusto laudantium magni minima, mollitia, nisi numquam perferendis quasi quos sit soluta totam ullam vel voluptate voluptatibus voluptatum! Amet aspernatur distinctio enim excepturi explicabo, facilis in nihil nobis nulla officia omnis, quos reprehenderit repudiandae sunt ut velit vitae.</p>
        </article>
    )
}

export default Article;