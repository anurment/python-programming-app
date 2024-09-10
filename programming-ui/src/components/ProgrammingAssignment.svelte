<script>
    import { pasPromise, getPas, userUuid} from "../stores/assignmentStore";
    import CodeEditor from './CodeEditor.svelte';
    import SubmissionStatus from './SubmissionStatus.svelte';

    $pasPromise = getPas();

</script>

<h3 class="text-md font-bold text-black mb-6">Hello {$userUuid}!</h3>
<h1 class="text-2xl font-bold text-white mb-6">Python Programming Assignment</h1>

{#await $pasPromise}
    <p>Loading programming assignment...</p>
    {:then pas}
        {#if pas.length == 0}
            <p>No programming assignments available</p>
        {:else}
        <div class="bg-gray-800 shadow-lg p-8 w-full mx-auto">
            <h1 class="text-2xl font-bold text-white mb-6">{pas[0].title}</h1>
            <div class="mb-4 p-4 border border-gray-600">
                <h2 class="text-xl font-semibold text-gray-300">Assignment Handout</h2>
                <p class="text-gray-400 mt-2">{pas[0].handout}</p>
            </div>
            <CodeEditor {pas} />
            <SubmissionStatus />
        </div>
        {/if}
{/await}