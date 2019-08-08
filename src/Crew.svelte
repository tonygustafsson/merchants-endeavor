<script>
    import { crew } from './stores/crew.js';
</script>

<pre>Crew members: {$crew}</pre>

<button on:click={() => crew.addCrewMembers(1)}>Find crew member</button>
<button on:click={() => crew.removeCrewMembers(1)}>Fire crew member</button>
