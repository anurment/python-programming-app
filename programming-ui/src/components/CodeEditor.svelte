<script>
    import { code, gradingStatus, gradedSub, userUuid } from "../stores/assignmentStore";

    export let pas;

    const addPasSubmission = async (pasId) => {
        if ($code.length === 0) return;

        const newSubmission = { code: $code };

        gradingStatus.set("Grading in progress...");

        const response = await fetch(`/api/programming-assingment/${pasId}/user/${$userUuid}`, {
            method: "POST",
            body: JSON.stringify(newSubmission),
        });

        const sub = await response.json();
        await startPolling(sub.id);
    };

    const startPolling = async (subId) => {
        let n = 0;
        while (n < 200) {
            n++;
            let response = await fetch(`/api/submission/${subId}`);
            let subInGrading = await response.json();
            if (subInGrading.status === 'processed') {
                gradingStatus.set('Grading Complete!');
                gradedSub.set(subInGrading);
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    };
</script>

<div class="mb-6">
    <label for="codeSubmission" class="block text-gray-400 font-semibold mb-2">Your Solution</label>
    <div class="flex">
        <textarea id="codeSubmission" bind:value={$code} rows="15" class="w-full px-3 py-2 text-sm text-gray-100 bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 font-mono placeholder-gray-500" placeholder="Type your Python code here..."></textarea>
    </div>
</div>

<div class="text-left">
    <button class="bg-yellow-300 text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
        on:click={() => addPasSubmission(pas[0].id)}>
        Submit for grading
    </button>
</div>