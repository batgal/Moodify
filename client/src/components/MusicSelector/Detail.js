import React from 'react';

const Detail = ({album, artists, name}) => {

    return (
        <div className= "col-sm-4" >
            <div className="row col-sm-12 px-0">
                <img 
                    src={album.images[0].url}
                    alt={name}>                    
                </img>
            </div>
            <div className>
                <label htmlFor={name}>
                    {name}
                </label>
            </div>
            <div>
                <label htmlFor={artists[0].name} className="form-label col-sm-12">
                    {artists[0].name}
                </label>
            </div>
        </div>
    );
}

export default Detail;