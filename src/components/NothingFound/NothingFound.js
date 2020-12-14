import React from "react"

function NothingFound(props){
    return (
        <section className="nothing-found section">
            <div className="nothing-found__image"></div>
            <h2 className="nothing-found__title">Nothing found</h2>
            <p className="nothing-found__text">Sorry, but nothing matched your search terms.</p>
        </section>
    )
}

export default NothingFound;