import React from 'react';

const Dropdown = props => {    

    const dropdownChanged = e => {
        props.changed(e.target.value);
    }


    // let happy = ['rock', 'pop', 'country'];    
    // let energized = ['techno', 'electronica'];
    // let moods = [];

    // if (happy.indexOf(props.options.name) < 0) {
    //     moods.push('happy'); 
    // }
    // else if (energized.indexOf(props.options.name) < 0) {
    //     if (moods.indexOf('energized') < 0) {
    //         moods.push('energized');
    //     }
    // }


    return (
        <div className="col-sm-6 form-group row px-0">     
            <label className="form-label col-sm-2">{props.label}</label>       
            <select value={props.selectedValue} onChange={dropdownChanged} className="form-control form-control-sm col-sm-10">
                <option key={0}>Select...</option>
                {props.options.map((item, idx) => <option key={idx + 1} value={item.id}>{item.name}</option>)}
                                                                     {/* genre instead of id */}
            </select>            
        </div>
    );
}

export default Dropdown