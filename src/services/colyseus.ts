

import * as Colyseus from "colyseus.js"; // not necessary if included via <script> tag.

export const client = new Colyseus.Client('ws://localhost:2567');