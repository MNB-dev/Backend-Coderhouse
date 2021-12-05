import admin from 'firebase-admin';
import { initializeApp } from "firebase-admin/app";
import config from '../config.js'

initializeApp({
    credential: admin.credential.cert(config.firebase)
  })

const db = admin.firestore();

export { db };