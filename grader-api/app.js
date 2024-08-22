import { serve } from "./deps.js";
import { grade } from "./services/gradingService.js";
import { createClient } from "npm:redis@4.6.4";

const consumer = createClient({
  url: "redis://redis:6379",
  pingInterval: 1000,
  
});

//const producer = consumer.duplicate();

//await producer.connect();


await consumer.connect();
await consumer.on("error", function(error) {
  console.error(error);
});

const handleMessage = async (message, channel) => {
    const submission = JSON.parse(message);
    const code = submission.code;
    const testCode = submission.test_code;
    const subId = submission.id;
    const pasId = submission.id;
    const userUuid = submission.user_uuid

    console.log("start grading....\n");
    console.log(`code: ${code}`);
    console.log(`test_code: ${testCode} \n`);

    const result = await grade(code, testCode);

    console.log("sending results");
    await fetch(`http://nginx:7800/api/submission/${subId}`, {
      method: "PUT",
      body: JSON.stringify({result}),
    });

    /*
    const resultRows = result.split("\n");
    console.log("Test results:\n")
    resultRows.forEach( (row) => console.log(`${row}\n`));
    */
    //console.log(`result: ${JSON.stringify(result)}`);


}

await consumer.subscribe(
  "submissionsToBeGraded", handleMessage);

//consumer.subscribe("submissionsToBeGraded");










let state = -1;

const getCode = () => {
  state = (state + 1) % 5;

  if (state == 0) {
    return `
def hello():
  return "Hello world!"
`;
  } else if (state == 1) {
    return `
def hello():
  return "hello world!"
    `;
  } else if (state == 2) {
    return `
def ohnoes():
  return "Hello world!"
    `;
  } else if (state == 3) {
    return `
:D
      `;
  } else {
    return `
while True:
  print("Hmmhmm...")
    `;
  }
};

const gradingDemo = async () => {
  let code = getCode();

  const testCode = `
import socket
def guard(*args, **kwargs):
  raise Exception("Internet is bad for you :|")
socket.socket = guard

import unittest
from code import *

class TestHello(unittest.TestCase):

  def test_hello(self):
    self.assertEqual(hello(), "Hello world!", "Function should return 'Hello world!'")

if __name__ == '__main__':
  unittest.main()  
`;

  return await grade(code, testCode);
};

const handleRequest = async (request) => {
  // the starting point for the grading api grades code following the
  // gradingDemo function, but does not e.g. use code from the user
  let result;
  try {
    const requestData = await request.json();

    console.log("Request data:");
    console.log(requestData);

    const code = requestData.code;
    const testCode = requestData.testCode;

    result = await grade(code, testCode);
  } catch (e) {
    result = await gradingDemo();
  }

  // in practice, you would either send the code to grade to the grader-api
  // or use e.g. a message queue that the grader api would read and process

  return new Response(JSON.stringify({ result: result }));
};

const portConfig = { port: 7000, hostname: "0.0.0.0" };
serve(handleRequest, portConfig);
