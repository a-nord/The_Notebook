const express = require("express");
const path = require('path');
const api = require('./routes/index.js');
const app = express();
const PORT = process.env.PORT || 3001;