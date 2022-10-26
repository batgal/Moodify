import React from 'react';

const Detail = ({album, artists, name}) => {

    return (
        <div className="col-5">
            <div>
                <img className="album-pic"
                    src={album.images[0].url}
                    alt={name}>                    
                </img>
            </div>
            <div>
                <label className="album-name" htmlFor={name}>
                    <b>
                    {name}
                    </b>
                </label>
            </div>
            <div>
                <label htmlFor={artists[0].name}>by {artists[0].name}</label>
            </div>
        </div>
    );
}

export default Detail;