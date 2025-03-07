import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export default function Button(){
    return React.createElement('button', {className: "button_filter"}, "Отфильтровать")
    
}