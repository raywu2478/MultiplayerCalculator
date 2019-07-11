import React from 'react';

const resultScreen = (props) => (
    <div className="result-screen">
        {props.children}
        {/* {props.children.map(message =>
            <tr key={message.key}>
                <td>{message.message}</td>
            </tr>
        )} */}
    </div>
);

export default resultScreen;