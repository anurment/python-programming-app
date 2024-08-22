<script>
    import { userUuid } from "../stores/stores.js";

    let code = "";
    let gradingStatus = null;
    let gradedSub = null;

    const getPas = async () => {
      const response = await fetch(`/api/programming-assingment/user/${$userUuid}`);
      return await response.json();

    };
  
    let pasPromise = getPas();

    const addPasSubmission = async (pasId) => {
        if (code.length == 0) {
            return;
        }

        const newSubmission = { code };

        console.log("sending post request...");

        const response = await fetch(`/api/programming-assingment/${pasId}/user/${$userUuid}`, {
            method: "POST",
            body: JSON.stringify(newSubmission),
        });


        gradingStatus = "Grading in progress...";

        

        const sub = await response.json();

        const subId = sub.id;

        console.log(`subId from post request:${subId}\n`);

        await startPolling(subId);

    };

    const nextAssignment = () => {
        code = "";
        gradingStatus = null;
        gradedSub = null;
        pasPromise = getPas();
        

    } 

    const startPolling = async (subId) => {
        console.log("starting polling...\n\n\n\n\n");
        console.log(`subId to be polled: ${subId}\n`);
        let n = 0;
        while (n < 20) {
            n++;
            let response = await fetch(`/api/submission/${subId}`);
            let subInGrading = await response.json();
            console.log(`sub in grading status: ${subInGrading.status}`)
            let processed = subInGrading.status === 'processed' ? true : false;
            
            //console.log(`sub in grading status: ${subInGrading.status}`)

            if (processed) {
                gradingStatus = 'Grading Complete!';
                gradedSub = subInGrading;
                break;
            }

            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    };

    /*

    const remove = async (id) => {
        await fetch(`/api/todos/${id}`, {
            method: "DELETE",
        });
        todosPromise = getTodos();
    };
    */

</script>


<h3 class="text-md font-bold text-black mb-6">Hello {$userUuid}!</h3>
<h1 class="text-2xl font-bold text-white mb-6">Python Programming Assignment</h1>

{#await pasPromise}
    <p>Loading programming assigment</p>
    {:then pas}
        {#if pas.length == 0}
            <p>No programming assigments available</p>
        {:else}
        <div class="bg-gray-800 shadow-lg p-8 w-full mx-auto">
            <h1 class="text-2xl font-bold text-white mb-6">{pas[0].title}</h1>
    
            <div class="mb-4 p-4 border border-gray-600 ">
                <h2 class="text-xl font-semibold text-gray-300">Assignment Handout</h2>
                <p class="text-gray-400 mt-2">
                    {pas[0].handout}
                </p>
            </div>
    
            <div class="mb-6">
                <label for="codeSubmission" class="block text-gray-400 font-semibold mb-2">Your Solution</label>
                <div class="flex">
                    <textarea id="codeSubmission" bind:value={code} rows="15" class="w-full px-3 py-2 text-sm text-gray-100 bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 font-mono placeholder-gray-500" placeholder="Type your Python code here..."></textarea>
                </div>
            </div>
    
            <div class="text-left">
                <button class="bg-yellow-300 text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                        on:click={() => addPasSubmission(pas[0].id)}>
                    Submit for grading
                </button>
            </div>
            {#if gradingStatus}
                <div class="mb-6 py-4">
                    <p class="text-white">
                        {gradingStatus}
                    </p>
                </div>
                {#if gradedSub}
                    {#if gradedSub.correct}
                        <div class="text-center">
                            <button class="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                on:click={() => nextAssignment()}>
                                Correct! Continue to the next assignment
                            </button>
                        </div>
                    {:else}
                    <div class="mb-6 py-4">
                        <div class="w-full px-3 py-4 text-sm text-gray-100 bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 font-mono placeholder-gray-500">
                            <p class="text-white py-4">
                                Some tests did not pass, try again!
                            </p>

                            <p class="text-white py-4">
                                {gradedSub.grader_feedback}
                            </p>

                        </div>
                    </div>
                        
                {/if}
                    {/if}

            {/if}
        </div>
        {/if}
{/await}
