import * as programmingAssignmentService from "./services/programmingAssignmentService.js";
import { serve } from "./deps.js";
import { cacheMethodCalls } from "./util/cacheUtil.js";
import { createClient } from "npm:redis@4.6.4";


const client = createClient({
  url: "redis://redis:6379",
  pingInterval: 1000,
});

await client.connect();


const cachedPasService = cacheMethodCalls(programmingAssignmentService, ["addSubmission", "findSubById"]);

const handleGetRoot = async (request) => {
  return new Response("Hello world at root!");
};


const handleGetAllPas = async (request) => {
  console.log("handleGetAllPas")
  const allAssingments = await cachedPasService.findAllPass();
  //console.log(allAssingments);
  return Response.json(allAssingments);
};

const handleGetAllSubs = async (request) => {
  console.log("handleGetAllSubs")
  const allSubs = await cachedPasService.findAllSubmissions();
  //console.log(allSubs);
  return Response.json(allSubs);
};

const handleGetPas = async (request, urlPatternResult) => {
  const uuid = urlPatternResult.pathname.groups.uuid;
  const pas = await cachedPasService.findNextPas(uuid)
  return Response.json(pas); 
}

const handlePostPas = async (request, urlPatternResult) => {
  console.log("starting post handle")
  const uuid = urlPatternResult.pathname.groups.uuid;
  const pasId = urlPatternResult.pathname.groups.pasid
  let pas;
  try {
      pas = await request.json();
  } catch (error) {
      console.log(error);
      return new Response("Bad request", { status: 400});
  }
  if(pas && pas.code){
      console.log("pas && pas.code")
      const oldSubmission = cachedPasService.findSameCode(pasId, pas.code, uuid);
      if(oldSubmission.length > 0){
        console.log("found old submission")
        return Response.json({oldSubmission});
      } else {
        const newSubmission = await cachedPasService.addSubmission(pasId, pas.code, uuid);
        console.log(`added submission ${pasId}`);
        const testCode = await cachedPasService.findTestCode(pasId)
        console.log(`test_code: ${testCode}`)
        const dataToQueue = {...newSubmission, ...testCode};
        client.publish("submissionsToBeGraded", JSON.stringify(dataToQueue));

        //TODO GRADING API CALL
        
        console.log(`returning id to post request: ${newSubmission.id}`);

        return new Response(JSON.stringify({id: newSubmission.id}), {
          status: 200,
          headers: { "Content-Type": "application/json",
                      "Access-Control-Allow-Origin": "*",
                    },
        });

        
        //console.log(`returning response to post request`);
        //return Response.json({id: newSubmission.id});
      }
  }
  console.log('something went wrong')
  return new Response("Bad request", { status: 400});
};

const handlePutSub = async (request, urlPatternResult) => {
  console.log("starting put handle");
  const uuid = urlPatternResult.pathname.groups.uuid;
  const subId = urlPatternResult.pathname.groups.subid;
  let grading;
  try {
    grading = await request.json();
  } catch (error) {
    console.log(error);
    return new Response("Bad request", { status: 400});
  }

  if (grading && grading.result) {
    console.log(grading.result);
    await cachedPasService.updateSubmission(subId, grading.result);
    return new Response("OK", { status: 200});
    
  }
  //console.log(request.json())
  
  /*
  const uuid = urlPatternResult.pathname.groups.uuid;
  const pasId = urlPatternResult.pathname.groups.pasid
  let pas;
  try {
      pas = await request.json();
  } catch (error) {
      console.log(error);
      return new Response("Bad request", { status: 400});
  }
  if(pas && pas.code){
      console.log("pas && pas.code")
      const oldSubmission = cachedPasService.findSameCode(pasId, pas.code, uuid);
      if(oldSubmission.length > 0){
        console.log("found old submission")
        return Response.json({oldSubmission});
      } else {
        const newSubmission = await cachedPasService.addSubmission(pasId, pas.code, uuid);
        console.log(`added submission ${newSubmission.id}`);
        const testCode = await cachedPasService.findTestCode(pasId)
        newSubmission.test_code = testCode;
        client.publish("submissionsToBeGraded", JSON.stringify(newSubmission));

        //TODO GRADING API CALL

        return new Response("OK", { status: 200});
      }
  }
  */
  console.log('something went wrong')
  return new Response("Bad request", { status: 400});
  
};

const handleGetSub = async (request, urlPatternResult) => {
  console.log("starting getSub handle...")
  const subId = urlPatternResult.pathname.groups.subid;
  console.log(`subId for getSub handle: ${subId}`);
  const sub = await cachedPasService.findSubById(subId);
  //console.log(pas.length)

  if(sub) {
      //console.log(`pas: \n pas.title: ${pas.title} \n`)
      return Response.json(sub);
  }
  return new Response("Not found", { status: 404});    
}



const urlMapping = [
  {
      method: "GET",
      pattern: new URLPattern({ pathname: "/"}),
      fn: handleGetRoot,

  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/allpass"}),
    fn: handleGetAllPas,

  },

  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/allsubs"}),
    fn: handleGetAllSubs,

  },
  
  {
      method: "GET",
      pattern: new URLPattern({ pathname: "/programming-assingment/user/:uuid"}),
      fn: handleGetPas,
  },
  {
      method: "POST",
      pattern: new URLPattern({ pathname: "/programming-assingment/:pasid/user/:uuid"}),
      fn: handlePostPas,
  },
  {
    method: "PUT",
    pattern: new URLPattern({ pathname: "/submission/:subid"}),
    fn: handlePutSub,

  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/submission/:subid"}),
    fn: handleGetSub,
  },
  /*
  {
      method: "GET",
      pattern: new URLPattern({ pathname: "/todos/:id"}),
      fn: handleGetTodo,
  },
  
  {
      method: "DELETE",
      pattern: new URLPattern({ pathname: "/todos/:id"}),
      fn: handleDeleteTodos,
  },
  */
 
];

const handleRequest = async (request) => {
  const mapping = urlMapping.find(
      (um) => um.method === request.method && um.pattern.test(request.url)
  );

  if (!mapping) {
      return new Response("Not found", { status: 404 });
  }

  const mappingResult = mapping.pattern.exec(request.url);
  try {
      return await mapping.fn(request, mappingResult);
    } catch (e) {
      console.log(e);
      return new Response(e.stack, { status: 500 })
    }
};

/*
const handleRequest = async (request) => {
  const programmingAssignments = await programmingAssignmentService.findAll();

  const requestData = await request.json();
  const testCode = programmingAssignments[0]["test_code"];
  const data = {
    testCode: testCode,
    code: requestData.code,
  };

  const response = await fetch("http://grader-api:7000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};

*/

const portConfig = { port: 7777, hostname: "0.0.0.0" };
serve(handleRequest, portConfig);
