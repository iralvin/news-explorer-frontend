import React from "react"

function NothingFound(props){
    return (
        <section className="nothing-found section">
            <div className="nothing-found__image"></div>
            <h2 className="nothing-found__title">{props.title}</h2>
            <p className="nothing-found__text">{props.text}</p>
        </section>
    )
}

export default NothingFound;