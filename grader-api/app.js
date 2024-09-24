import { serve } from "./deps.js";
import { grade } from "./services/gradingService.js";

let queue = [];
let isProcessing = false;

const processQueue = async () => {
  if (queue.length === 0 || isProcessing) return; // If queue is empty or already processing, exit

  const requestData = queue.shift(); // Take the first request from the queue
  isProcessing = true;

  const code = requestData.code;
  const testCode = requestData.test_code;
  const subId = requestData.id;

  const result = await grade(code, testCode);
  //console.log(`result: ${result}`);


  //console.log("sending results");
  fetch(`http://nginx:7800/api/submission/${subId}`, {
    method: "PUT",
    body: JSON.stringify({result}),
  });

  //response.send('Grading done');

  isProcessing = false;

  processQueue();

};

const handleRequest = async (request) => {

  let requestData;

  try {
    requestData = await request.json();

    //console.log("Request data:");
    //console.log(requestData);

    
  } catch (e) {
    //result = await gradingDemo();
    console.log(e);
  }

  if(requestData){
    queue.push(requestData);
    processQueue();
    return new Response("OK", { status: 200});
  } else {
    return new Response("Bad request", { status: 400});
  }


};

const portConfig = { port: 7000, hostname: "0.0.0.0" };
serve(handleRequest, portConfig);


