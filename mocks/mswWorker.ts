import { handlers } from "./handlers";
import { setupWorker } from "msw";

export const mswWorker = setupWorker(...handlers);
