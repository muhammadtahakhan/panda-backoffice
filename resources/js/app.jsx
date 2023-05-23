import './bootstrap';
import '../css/app.css';

import AppBase from './AppBase';
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'primeicons/primeicons.css';

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<AppBase />)
