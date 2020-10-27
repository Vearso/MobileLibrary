import React from "react";
import './About.scss'
import Button from "../Button/Button";
const About = () => {
    return(
        <section className="page__about">
            <h2 className="about__title">Mobile Library</h2>
            <p className="about__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non obcaecati quidem sit. A accusantium cum dolorum eius in praesentium quibusdam quis, voluptatem! Fuga ipsum laborum minus, necessitatibus nihil officia perferendis! Aliquam, cum cumque deleniti deserunt dolore ducimus exercitationem illum laudantium maxime modi nesciunt nulla odio quae quibusdam, quisquam quod tempora temporibus tenetur ullam veritatis! Accusantium, aperiam consequuntur deserunt eius enim ex explicabo facilis impedit ipsam iusto minus molestiae non odit possimus praesentium quaerat quam quia quibusdam repellat reprehenderit sint suscipit tempora vero voluptate voluptates! Accusantium culpa eaque explicabo facilis id, inventore iure magnam modi quas quia velit, veniam. Aspernatur, incidunt!</p>
            <Button className="btn about__button">Get Started</Button>
        </section>
    )
}

export default About