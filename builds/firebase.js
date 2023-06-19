"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
initializeApp();
exports.db = getFirestore();
