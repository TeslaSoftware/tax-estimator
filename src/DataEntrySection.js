import React from 'react';

function DataEntrySection(props){
    return(
        <div className="data-entry-section">
            <div className="data-entry-section-header">{props.sectionName}</div>
              <div className="data-entry-section-content">
                {props.sectionContent}
            </div>
        </div>
    );
}



export default DataEntrySection;