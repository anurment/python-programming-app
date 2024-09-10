<script>
    import { code, gradingStatus, gradedSub, pasPromise, getPas, userUuid } from "../stores/assignmentStore";

    const nextAssignment = () => {
        $code = "";
        $gradingStatus = null;
        $gradedSub = null;
        $pasPromise = getPas();
    };

</script>

{#if $gradingStatus}
    <div class="mb-6 py-4">
        <p class="text-white">{$gradingStatus}</p>
    </div>
    {#if $gradedSub}
        {#if $gradedSub.correct}
            <div class="text-center">
                <button class="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    on:click={() => nextAssignment()}>
                    Correct! Continue to the next assignment
                </button>
            </div>
        {:else}
            <div class="mb-6 py-4">
                <div class="w-full px-3 py-4 text-sm text-gray-100 bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 font-mono placeholder-gray-500">
                    <p class="text-white py-4">Some tests did not pass, try again!</p>
                    <p class="text-white py-4">{$gradedSub.grader_feedback}</p>
                </div>
            </div>
        {/if}
    {/if}
{/if}