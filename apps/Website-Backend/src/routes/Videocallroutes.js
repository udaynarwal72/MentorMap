import Express from "express";
import { HealthCheck, TextToSummary } from "../controllers/VideoCall/TranscriptToSummary.js";

const Videocallroutes = Express.Router();


Videocallroutes.get('/', HealthCheck)
Videocallroutes.post('/llm',TextToSummary)

export default Videocallroutes;