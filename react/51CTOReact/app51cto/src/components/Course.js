import React from 'react';

let Course = (props) => {
    return <p onClick={props.click}>我是{props.title}课程，我有{props.count}节课！{props.children}</p>
};

export default Course;
